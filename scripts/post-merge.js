const { spawnSync } = require('child_process');

const args = [
  'diff-tree',
  '-r',
  '--name-only',
  '--no-commit-id',
  'ORIG_HEAD',
  'HEAD',
];

const gitDiff = spawnSync('git', args);

if (/package\.json|yarn\.lock/.test(gitDiff.stdout)) {
  console.warn('Seems like some dependencies changed, consider running `yarn`');
}
