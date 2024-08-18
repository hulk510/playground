// commit.cjs
const commit = require('@changesets/cli/commit');

module.exports = {
  getAddMessage(changeset, options) {
    return `docs(changeset): ${changeset.summary}`;
  },
  getVersionMessage: commit.default.getVersionMessage,
};