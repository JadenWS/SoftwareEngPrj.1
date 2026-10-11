const test = require('node:test');
const assert = require('node:assert');
const { validatePost } = require('../validation');

const good = { type: 'lost', title: 'Black water bottle', category: 'Other' };

test('accepts a post with only the required fields', () => {
  const result = validatePost(good);
  assert.strictEqual(result.valid, true);
  assert.deepStrictEqual(result.errors, []);
});

test('accepts optional fields when provided', () => {
  const result = validatePost({ ...good, description: 'Dented', location: 'Library', date: '2026-10-01' });
  assert.strictEqual(result.valid, true);
});

test('rejects a missing title', () => {
  const result = validatePost({ ...good, title: '   ' });
  assert.strictEqual(result.valid, false);
  assert.ok(result.errors.includes('Title is required.'));
});

test('rejects a missing or unknown category', () => {
  assert.strictEqual(validatePost({ ...good, category: '' }).valid, false);
  assert.strictEqual(validatePost({ ...good, category: 'Spaceships' }).valid, false);
});

test('rejects a type that is not lost or found', () => {
  assert.strictEqual(validatePost({ ...good, type: 'stolen' }).valid, false);
  assert.strictEqual(validatePost({ title: 'x', category: 'Other' }).valid, false);
});

test('rejects a bad date', () => {
  assert.strictEqual(validatePost({ ...good, date: 'yesterday' }).valid, false);
  assert.strictEqual(validatePost({ ...good, date: '2026-13-45' }).valid, false);
});

test('handles an empty body', () => {
  assert.strictEqual(validatePost(undefined).valid, false);
});
