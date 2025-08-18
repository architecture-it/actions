# actions

This action will create a release and a tag on the repository.

If contains the following inputs will be create a publication on JIRA:

- `jira_email`: The email of the user that will be used to create the publication on JIRA. (Secret of organization)
- `jira_api_token`: The api token of the user that will be used to create the publication on JIRA. (Secret of organization)
- `jira_project_id`: The project id of the JIRA project. eg: "PE20" With this id we will be able to find tickets with the same prefix.
- `jira_release_template`: The template name of the publication in Jira. eg: "ui-gitops v${version}". Must be contain `v${version}` to replace with the version of the release.
