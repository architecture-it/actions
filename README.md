# actions | React base CI


> ### Requirements 
> **Needs a lock file**. You can use `npm`, `pnpm` or `yarn`. We recommend use pnpm in web and yarn on Mobile. You can [see more on](https://architecture-it.github.io/docs/Platform/Front/#manejo-de-dependencias)



Example of use:


```yaml
name: React CI

on:
  pull_request:
    branches: [ main, cicd ] #can change to run on development or cicd branch
  push:
    branches: [ main, cicd ] #should be default branch
env:
  SKIP_TEST: 'false'
  CI: true
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x] #lts
    steps:
    - uses: actions/checkout@v3
    - uses: architecture-it/actions@react-stable
      with:
        matrix_version: ${{ matrix.node-version }}
        skip_test: ${{ env.SKIP_TEST }}
        # secrets enabled in all organizations
        packages_token: ${{ secrets.ARQUITECTURA_DEPLOY }}
        fontawesome_token: ${{ secrets.NPM_FONTAWESOME_KEY }}
```