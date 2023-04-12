# action | Generate npmrc

1. Generates or appends config from organization necesary for frontend packages
2. Add flags necesary to pnpm

## How to use

```yml
    #previous steps
    - name: Generate .npmrc file
      uses: architecture-it/actions@generate-npmrc
      with:
        npm_token: ${{ secrets.ARQUITECTURA_DEPLOY }}
        font_awesome_key: ${{ secrets.NPM_FONTAWESOME_KEY }}
```

## Recommended use

We use this action internally but its useful when we create libraries

```yml
name: Release
on:
  workflow_dispatch: # For run manually
  push:
    branches: [ beta, main ]

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          token: ${{ secrets.ARQUITECTURA_DEPLOY }}
      - name: Generate .npmrc file
        uses: architecture-it/actions@generate-npmrc
        with:
          npm_token: ${{ secrets.ARQUITECTURA_DEPLOY }}
          font_awesome_key: ${{ secrets.NPM_FONTAWESOME_KEY }}
      - name: Use pnpm Setup
        uses: pnpm/action-setup@v2
        with:
          version: 8
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 'lts/*'
          cache: 'pnpm'
      - name: Install
        run: pnpm install --frozen-lockfile
      - name: Build
        run: pnpm run build
      - name: Release Library
        uses: architecture-it/actions@release-npm-library
        with:
          github_token: ${{ secrets.ARQUITECTURA_DEPLOY }}

```