import {Version2Client, Version3Client} from 'jira.js'

type MakeClient = {
  client2: Version2Client
  client3: Version3Client
}

export function makeClient(
  host = 'https://andreani.atlassian.net',
  jiraEmail: string,
  jiraApiToken: string,
  logger?: (message: string) => void
): MakeClient {
  const client2 = new Version2Client({
    host,
    authentication: {
      basic: {
        email: jiraEmail,
        apiToken: jiraApiToken
      }
    }
  })

  const client3 = new Version3Client({
    host,
    authentication: {
      basic: {
        email: jiraEmail,
        apiToken: jiraApiToken
      }
    },
    middlewares: {
      onError: (error: any) => {
        logger?.('--Error--')
        logger?.('Jira Client Error:')
        logger?.(JSON.stringify(error, null, 2))
        logger?.('----')
      },
      onResponse: (response: any) => {
        logger?.('--Response--')
        // You can log responses here if needed for debugging
        logger?.('Jira Client Response:')
        logger?.(JSON.stringify(response, null, 2))
        logger?.('----')
      }
    }
  })

  return {
    client2,
    client3
  }
}
