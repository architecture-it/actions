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
