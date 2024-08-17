// commit.cjs
const commit = require('@changesets/cli/commit');

module.exports = {
  getAddMessage(changeset, options) {
    return `docs(changeset): ${changeset.summary} [skip ci]`;
  },
  getVersionMessage: commit.default.getVersionMessage,
};
