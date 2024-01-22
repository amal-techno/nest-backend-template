export default {
    branches: ['development'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/npm',
        '@semantic-release/github',
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
            },
        ],
        [
            '@semantic-release/git',
            {
                assets: ['dist/**/*.{js,css}', 'docs', 'package.json'],
                message: 'chore(release): ${nextRelease.version} [skip ci]',
            },
        ],
    ],
};
