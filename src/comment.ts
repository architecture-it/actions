import * as github from '@actions/github'
import {Octokit} from '@octokit/core'
import {PaginateInterface} from '@octokit/plugin-paginate-rest'
import {Api} from '@octokit/plugin-rest-endpoint-methods/dist-types/types'

export interface OctokitWithPlugins extends Octokit, Api {
  paginate: PaginateInterface
}

export async function commentWithValidation(
  pr_name: string,
  branch_name: string,
  octokit: OctokitWithPlugins
): Promise<void> {
  const context = github.context

  // Fetch commits from the pull request
  const {data: commits} = await octokit.rest.pulls.listCommits({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number
  })

  const commitMessages = commits.map(commit => commit.commit.message)
  const commitMessagesForInfo = commits.map(commit => `> - \`${commit.commit.message}\``).join('\n')

  // Regex patterns
  const regexOfIssue = /\b[A-Z0-9]+-\d+\b/g // Matches Jira issue keys
  const regexConventionCommit = /^(feat|fix|perf|ref|styles|BREAKING CHANGE).*\:\s.*$/i // Matches conventional commits

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const regexEmoji = /(:racehorse:|:bug:|:penguin:|:apple:|:checkered_flag:)/g // Matches emojis

  const branchName = branch_name.replace(/refs\/heads\//, '')

  // Determine if any commit will trigger a new version
  const someCommitWillTriggerNewVersion = commitMessages.some(message => message.match(regexConventionCommit))

  // Jira validations
  const isValidTitleOfPRForJira = pr_name.match(/^(feat|fix)\([A-Z0-9-]+\)\:\s.*$/)
  const isValidBranchNameForJira = branchName.match(regexOfIssue)
  const someCommitValidForJira = commitMessages.some(message => message.match(regexOfIssue))

  const titleWillTriggerNewVersion = pr_name.match(regexConventionCommit)

  const willTriggerNewVersion = titleWillTriggerNewVersion || someCommitWillTriggerNewVersion

  const couldUseMergePullRequestJIRA = isValidBranchNameForJira || someCommitValidForJira
  const anyJiraIntegrationValid = isValidTitleOfPRForJira || couldUseMergePullRequestJIRA

  // Determine the highest release type
  const releaseTypes = commitMessages.map(determineReleaseType).filter(Boolean)
  const highestReleaseType = releaseTypes.includes('major')
    ? 'major'
    : releaseTypes.includes('minor')
    ? 'minor'
    : releaseTypes.includes('patch')
    ? 'patch'
    : null

  const unifiedMessageForCICD =
    highestReleaseType === 'major'
      ? '> 🚀 **Este Pull Request lanzará una nueva versión **`major`** debido a cambios importantes.**'
      : highestReleaseType === 'minor'
      ? '> 🚀 **Este Pull Request lanzará una nueva versión **`minor`** debido a nuevas funcionalidades.**'
      : highestReleaseType === 'patch'
      ? '> 🚀 **Este Pull Request lanzará una nueva versión **`patch`** debido a correcciones o mejoras menores.**'
      : '> ⚠️ **Este Pull Request no lanzará una nueva versión.**'

  const unifiedMessageForJIRA =
    isValidTitleOfPRForJira && couldUseMergePullRequestJIRA
      ? '> Podes usar [Squash and merge][1] (**Recomendado**) o [Merge pull request][2].'
      : isValidTitleOfPRForJira
      ? '> Podes usar [Squash and merge][1] (**Recomendado**).'
      : couldUseMergePullRequestJIRA
      ? '> Podes usar [Merge pull request][2].'
      : ''

  // Date and time in dd/mm/yyyy hh:mm:ss format
  const dateTime = new Date()
    .toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
    .replace(',', '')

  const body = `
# ✨ Validación de Integración con JIRA y CI/CD ✨

<!-- issue-validator -->

## Resumen de Validación
${unifiedMessageForCICD}

${
  anyJiraIntegrationValid
    ? '🔗 **Este Pull Request cumple con la integración de JIRA**'
    : '❌ **Este Pull Request no cumple con la integración de JIRA**'
}
${unifiedMessageForJIRA}

---

### 🛠️ **Validación de Convención de Commits**
${
  willTriggerNewVersion
    ? ':white_check_mark: **Cumple con la convención de commits para CI/CD**'
    : ':x: **No cumple con la convención de commits para CI/CD**'
}

- **Título del Pull Request**: ${titleWillTriggerNewVersion ? ':heavy_check_mark: Válido' : ':x: **Revisar**'}
- **Commits que disparan una nueva versión**: ${someCommitWillTriggerNewVersion ? ':heavy_check_mark: Sí' : ':x: No'}

---

### 🔗 **Validación de Integración con JIRA**
${
  anyJiraIntegrationValid
    ? ':white_check_mark: **Cumple con la integración de JIRA**'
    : ':x: **No cumple con la integración de JIRA**'
}

- **Título del Pull Request**: ${isValidTitleOfPRForJira ? ':heavy_check_mark: Válido' : ':x: **Revisar**'}
- **Nombre del Branch**: ${isValidBranchNameForJira ? ':heavy_check_mark: Válido' : ':x: **Revisar**'}
- **Commits con claves de JIRA**: ${someCommitValidForJira ? ':heavy_check_mark: Sí' : ':x: No'}

---

### 📋 **Detalles de Validación**
- **Título del Pull Request**: '${pr_name}'
- **Nombre del Branch**: '${branchName}'
- **Mensajes de los Commits**:
${commitMessagesForInfo}

⏰ **Horario de Ejecución**: ${dateTime}

---

### 📖 **Instrucciones**
> 👮‍♀️ **Es necesario cumplir con el formato de título y commits para garantizar que el proceso de CI/CD y JIRA se ejecute correctamente.**
> 
> - Usa [Squash and merge][1] (**Recomendado**) si el título del Pull Request es válido.
> - Usa [Merge pull request][2] si los commits cumplen con la convención.

Para más información, consulta la [Documentación][3].

---

[1]: https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-commits
[2]: https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#merge-your-commits
[3]: https://docs-architecture-it-prod.apps.andreani.com.ar/Onboarding/jira/
`

  // Create or update the comment
  const {data: comments} = await octokit.rest.issues.listComments({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo
  })

  const botComment = comments.find(
    comment => comment.user?.login === 'CybersecurityGLA' && comment.body?.includes('<!-- issue-validator -->')
  )

  if (botComment) {
    // Update the existing comment
    await octokit.rest.issues.updateComment({
      comment_id: botComment.id,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body
    })
  } else {
    // Create a new comment
    await octokit.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body
    })
  }
}

// Helper function to determine release type
export function determineReleaseType(commitMessage: string): string | null {
  if (commitMessage.includes('BREAKING CHANGE') || commitMessage.match(/breaking: true/i)) {
    return 'major'
  }
  if (commitMessage.match(/^feat/) || commitMessage.match(/^FEAT/)) {
    return 'minor'
  }
  if (
    commitMessage.match(/^fix/) ||
    commitMessage.match(/(BUGFIX|Fix|SECURITY)/) ||
    commitMessage.match(/(:racehorse:|:bug:|:penguin:|:apple:|:checkered_flag:)/g) ||
    commitMessage.match(/^ref/) ||
    commitMessage.match(/^styles/) ||
    commitMessage.match(/^perf/) ||
    commitMessage.match(/^FIX/)
  ) {
    return 'patch'
  }
  return null // No release triggered
}
