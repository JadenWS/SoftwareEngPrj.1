// The app's logic, kept apart from Express so it is easy to test.
// Each function returns { status, body } and server.js just sends it.

const { validatePost, CATEGORIES, TYPES } = require('./validation');

function makeHandlers(store) {
  return {
    categories() {
      return { status: 200, body: CATEGORIES };
    },

    // Story 2: browse. Returns every post, newest first.
    list() {
      return { status: 200, body: store.listPosts() };
    },

    // Story 1: post something lost or found.
    create(body) {
      const { valid, errors, post } = validatePost(body);
      if (!valid) return { status: 400, body: { errors } };
      const saved = store.createPost(post);
      return { status: 201, body: { id: saved.id, message: 'Your post was created.' } };
    },
  };
}

module.exports = { makeHandlers };
