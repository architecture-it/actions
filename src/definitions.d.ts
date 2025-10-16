declare module '@architecture-it/semantic-release-jira' {
  import {Version3Client} from 'jira.js'

  interface Config {
    jiraHost: string
  }

  interface Context {
    logger: any
  }

  export function makeClient(config: Config, context: Context, validConfig: boolean): Version3Client
}
