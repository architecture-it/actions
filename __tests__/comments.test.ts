import {determineReleaseType} from '../src/comment'

const data = [
  {input: 'feat: add new feature', expected: 'minor'},
  {input: 'FEAT: add new feature', expected: 'minor'},
  {input: 'fix: fix a bug', expected: 'patch'},
  {input: 'BUGFIX: fix a bug', expected: 'patch'},
  {input: 'Fix: fix a bug', expected: 'patch'},
  {input: 'SECURITY: fix a security issue', expected: 'patch'},
  {input: 'refactor: improve code', expected: 'patch'},
  {input: 'styles: update styles', expected: 'patch'},
  {input: 'perf: improve performance', expected: 'patch'},
  {input: 'FIX: fix a bug', expected: 'patch'},
  {input: 'chore: update dependencies', expected: null},
  {input: 'docs: update documentation', expected: null},
  {input: 'test: add tests', expected: null},
  {input: 'BREAKING CHANGE: change API', expected: 'major'},
  {input: 'feat: add new feature\n\nBREAKING CHANGE: change API', expected: 'major'},

  // with scope
  {input: 'feat(scope): add new feature', expected: 'minor'},
  {input: 'fix(scope): fix a bug', expected: 'patch'},
  {input: 'chore(scope): update dependencies', expected: null},
  {input: 'docs(scope): update documentation', expected: null},
  {input: 'test(scope): add tests', expected: null},
  {input: 'feat(scope): add new feature\n\nBREAKING CHANGE: change API', expected: 'major'},
  {input: 'fix(scope): fix a bug\n\nbreaking: true', expected: 'major'},
  {input: 'chore(scope): update dependencies\n\nbreaking: true', expected: 'major'},
  {input: 'docs(scope): update documentation\n\nbreaking: true', expected: 'major'},
  {input: 'test(scope): add tests\n\nbreaking: true', expected: 'major'}
]

describe('determineReleaseType()', () => {
  test.each(data)('given $input as input, returns $expected', ({input, expected}) => {
    expect(determineReleaseType(input)).toBe(expected)
  })
})
