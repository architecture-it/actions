# Validate Jira Integration

This is a simple script to validate the Jira integration with the Jira API.

Validate the format for CICD, adding a comment to the PR if the format is or not correct.

## How to use

1. Add the steps to your CICD pipeline to run the script.

```yml
- name: Validate Jira Integration
  uses: architecture-it/actions@validate-jira-integration
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
```
