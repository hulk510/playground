/**
 * @type {import ("stylelint").Config}
 */
module.exports = {
  root: true,
  ignorePatterns: ['apps/**', 'packages/**'],
  extends: ['@repo/stylelint-config/.stylelintrc.js'],
};
