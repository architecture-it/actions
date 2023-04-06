# action | Release Npm library

Use semantic release configuration about libraries. Take a dist folder like root (to empower threeshaking like material ui), updat ethe package.json and commit to branch.



1. Take care about package manager based on lock file. IF not exist throwns an error and show link to Architecture documentation.

2. Generates a semantic relase config
3. Setup Node
4. Install dependencies required for the release (not install any package)
5. And execute semantic release

```js
module.exports = { 
    pkgRoot: "dist", 
    plugins: [
        "@semantic-release/commit-analyzer", 
        "@semantic-release/release-notes-generator", 
        [
            "@semantic-release/changelog", 
            { 
                changelogFile: "CHANGELOG.md" 
            }
        ], 
        [
            "@semantic-release/npm",
            {  
                "npmPublish": ${{ inputs.publish }},
            }
        ],
        "@semantic-release/github",
        [
            "@semantic-release/exec",
            {  
                prepareCmd: "npx rjp package.json version ${nextRelease.version}",
            },
        ],
        [
            "@semantic-release/git",
            {  
                message: "Release <%= nextRelease.version %> [skip ci]",
                assets: [
                    "package.json", 
                    "CHANGELOG.md"
                ],
            },
        ]
    ],
    branches: ${{ inputs.branches }} 
};
```

## How to use

```yml
    #previous steps
    - name: Release Library
      uses: architecture-it/actions@release-npm-library
      with:
        github_token: ${{ secrets.ARQUITECTURA_DEPLOY }}
```

## Recommended use

We recommend always test a clean build to revalidate if builds

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
        run: |
          echo '@architecture-it:registry=https://npm.pkg.github.com/' >> .npmrc
          echo '//npm.pkg.github.com/:_authToken=${{ secrets.ARQUITECTURA_DEPLOY }}' >> .npmrc
          echo '@fortawesome:registry=https://npm.fontawesome.com/' >> .npmrc
          echo '//npm.fontawesome.com/:_authToken=${{ secrets.NPM_FONTAWESOME_KEY }}' >> .npmrc
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