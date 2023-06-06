# actions | React Base Library

Run all the general steps required for the different workflows you can have in a React library. These workflows are: release, test, visual test.

> ### Requirements 
> **Needs a lock file**. You can use `npm`, `pnpm` or `yarn`. We recommend use pnpm in web and yarn on Mobile. You can [see more here](https://architecture-it.github.io/docs/Platform/Front/#manejo-de-dependencias).

---

Example of use:

```yaml
name: Library Test

on:
  workflow_dispatch: # For run manually
  pull_request:
    branches: [ development, main ]

env:
  SKIP_TEST: 'false'
  CI: true

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x]
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - uses: architecture-it/actions@react-base-library
      with:
        matrix_version: ${{ matrix.node-version }}
        skip_test: ${{ env.SKIP_TEST }}
        # secrets enabled in all organizations
        packages_token: ${{ secrets.ARQUITECTURA_DEPLOY }}
        fontawesome_token: ${{ secrets.NPM_FONTAWESOME_KEY }}
    # Next specific workflow steps
```