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