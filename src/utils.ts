export function extractIssueKeys(messages: string[]): Set<string> {
  const issueKeyRegex = /\b[A-Z][A-Z0-9]*-\d+\b/g
  const issues = new Set<string>()

  for (const message of messages) {
    const matches = message.match(issueKeyRegex)
    if (matches) {
      matches.forEach(issue => issues.add(issue))
    }
  }

  return issues
}

export function getTitleValid(commitMessages: string[], pr_name: string, highestReleaseType: string | null): string {
  const commitMessagesCustom = [...commitMessages, pr_name]
  const issues = extractIssueKeys(commitMessagesCustom)
  let issuesForTitle = [...issues].join(',')

  const type = getMajorTypeOfCommit(highestReleaseType)

  const prNameCleaned = pr_name
    .replace(/\b[A-Z][A-Z0-9]*-\d+\b/g, '')
    .replace(/\[\]/g, '')
    .trim()

  issuesForTitle = issuesForTitle.length > 0 ? `(${issuesForTitle})` : ''

  return `${type}${issuesForTitle}: ${prNameCleaned}`
}

const typesFromHighestReleaseType: Record<string, string> = {
  major: 'feat',
  minor: 'feat',
  patch: 'fix'
}

export function getMajorTypeOfCommit(highestReleaseType: string | null): string {
  if (highestReleaseType && typesFromHighestReleaseType[highestReleaseType]) {
    return typesFromHighestReleaseType[highestReleaseType]
  }
  return 'chore'
}
