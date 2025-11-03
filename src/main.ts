import * as core from '@actions/core'
import * as github from '@actions/github'

import {makeClient} from './jira'
import {extractIssueKeys} from './utils'
import {commentWithValidation, type CommitData, OctokitWithPlugins} from './comment'

async function run(): Promise<void> {
  const token = core.getInput('token', {required: true})
  const jiraHost = core.getInput('jira_host', {required: false}) || 'https://andreani.atlassian.net'
  const jiraEmail = core.getInput('jira_email', {required: false})
  const jiraApiToken = core.getInput('jira_api_token', {required: false})
  const fixTitleIfNotValid = core.getInput('fix_title_if_not_valid', {required: false, trimWhitespace: true}) === 'true'
  const octokit = github.getOctokit(token)

  if (github.context.eventName !== 'pull_request') {
    // ends gracefully if not a PR event
    core.warning('This action is only applicable for pull request events.')
    return
  }

  const sha = github.context.sha // Commit SHA for the status check
  const repo = github.context.repo
  const branchName = github.context.payload.pull_request?.head?.ref

  await setStatus(octokit, repo, sha, 'pending', 'Analyzing pull request for Jira issues')

  try {
    const prTitle = github.context.payload.pull_request?.title
    const prNumber = github.context.payload.pull_request?.number
    const baseSha = github.context.payload.pull_request?.base?.sha || 'HEAD~1'
    const headSha = 'HEAD'

    core.info(`PR #${prNumber}: ${prTitle}`)

    if (!baseSha || !headSha) {
      const errorMessage = 'No se pudo obtener la información del Pull Request.'
      core.warning('Base or Head SHA is missing in the pull request payload.')
      await setStatus(octokit, repo, sha, 'failure', errorMessage)
      return
    }

    const {data: commits} = await octokit.rest.pulls.listCommits({
      owner: repo.owner,
      repo: repo.repo,
      pull_number: prNumber || 0,
      per_page: 100
    })

    const commitMessages = commits.map(commit => commit.commit.message)

    if (prTitle) {
      commitMessages.push(prTitle)
    }
    if (branchName) {
      commitMessages.push(branchName)
    }
    const issues = extractIssueKeys(commitMessages)

    core.info(`Found issues: ${Array.from(issues).join(', ')}`)

    if (issues.size === 0) {
      const errorMessage = 'No se encontraron claves de incidencia de JIRA en los commits o el título del PR.'
      await setStatus(octokit, repo, sha, 'failure', errorMessage)

      core.setFailed(errorMessage)
    }

    const {client2: jiraClient, client3: jiraClient3} = makeClient(jiraHost, jiraEmail, jiraApiToken, core.debug)

    if (!jiraClient) {
      const errorMessage = 'No se pudo crear el cliente de Jira. Por favor, verifica tu configuración.'
      core.error(errorMessage)
      await setStatus(octokit, repo, sha, 'failure', errorMessage)
      return
    }

    let count = 0

    try {
      const data = await jiraClient3.issueSearch.countIssues({
        jql: `issue in (${Array.from(issues).join(', ')})`
      })
      count = data?.count || 0
    } catch (error) {
      const errorMessage = 'Error al llamar a la API de Jira.'
      await setStatus(octokit, repo, sha, 'failure', errorMessage)
      console.error('Error fetching issues from Jira:', getErrorMessage(error))
      return
    }

    if (count === 0) {
      const errorMessage = 'No se encontraron incidencias de JIRA que coincidan con las claves proporcionadas.'
      await setStatus(octokit, repo, sha, 'failure', errorMessage)
      core.setFailed(errorMessage)
    } else {
      const successMessage = `Se encontraron ${count} incidencias de JIRA que coinciden con las claves proporcionadas.`
      core.info(successMessage)
      await setStatus(octokit, repo, sha, 'success', successMessage)
    }

    await commentWithValidation(
      prTitle || '',
      branchName || '',
      octokit as unknown as OctokitWithPlugins,
      commits as CommitData,
      fixTitleIfNotValid
    )
  } catch (error) {
    core.setFailed(getErrorMessage(error))
    await setStatus(octokit, repo, sha, 'failure', 'An error occurred while validating Jira issues.')
  }
}

async function setStatus(
  octokit: ReturnType<typeof github.getOctokit>,
  repo: {owner: string; repo: string},
  sha: string,
  state: 'success' | 'failure' | 'pending',
  description: string
): Promise<void> {
  await octokit.rest.repos.createCommitStatus({
    owner: repo.owner,
    repo: repo.repo,
    sha: sha,
    state: state,
    description: description,
    context: 'Jira Issue Validation' // This is the name of the status check
  })
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

run()
