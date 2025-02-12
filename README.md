# Release basico

Es un release basico que solo se encarga de generar el tag y subir los archivos definidos ejemplo:


```yaml
name: Release

on:
  push:
    branches:
      - main
      - beta

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

        # basic example of prepare of files

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22.x'
      
      - name: Install dependencies
        run: npm install]
        shell: bash

      - name: Build
        run: npm run build # this will ouput in dist folder
        shell: bash


      - name: Use Release Basic Action
        uses: architecture-it/actions@release-basic
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          branches: '["main", { "name": "beta", "prerelease": "beta" }]'
          github_username: ${{ secrets.GITHUB_USERNAME }}
          release_assets: '["dist/**"]' # this will upload all files in dist folder in the release

```