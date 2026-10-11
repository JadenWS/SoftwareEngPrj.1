// Validation for new posts. Kept separate from the route so it's easy to test.

const CATEGORIES = ['Electronics', 'Clothing', 'ID/Cards', 'Keys', 'Bags', 'Other'];
const TYPES = ['lost', 'found'];

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validatePost(body) {
  const errors = [];
  const input = body || {};

  const post = {
    type: clean(input.type).toLowerCase(),
    title: clean(input.title),
    description: clean(input.description),
    category: clean(input.category),
    location: clean(input.location),
    date: clean(input.date),
  };

  if (!TYPES.includes(post.type)) {
    errors.push('Please choose whether the item was lost or found.');
  }
  if (!post.title) {
    errors.push('Title is required.');
  } else if (post.title.length > 100) {
    errors.push('Title must be 100 characters or less.');
  }
  if (!CATEGORIES.includes(post.category)) {
    errors.push('Please choose a category.');
  }
  if (post.description.length > 500) {
    errors.push('Description must be 500 characters or less.');
  }
  if (post.location.length > 100) {
    errors.push('Location must be 100 characters or less.');
  }
  if (post.date && (!/^\d{4}-\d{2}-\d{2}$/.test(post.date) || Number.isNaN(Date.parse(post.date)))) {
    errors.push('Date must be a valid date.');
  }

  return { valid: errors.length === 0, errors, post };
}

module.exports = { validatePost, CATEGORIES, TYPES };
