process.env.DB_PATH = ':memory:';

const test = require('node:test');
const assert = require('node:assert');
const { db, createPost } = require('../db');

test('createPost saves a row and returns its id', () => {
  const { id } = createPost({
    type: 'lost', title: 'Black water bottle', description: '',
    category: 'Other', location: 'Library', date: '2026-10-01',
  });
  const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
  assert.strictEqual(row.title, 'Black water bottle');
  assert.strictEqual(row.status, 'active');
  assert.ok(row.edit_token.length > 20);
});

test('every post gets a different edit token', () => {
  const base = { type: 'found', title: 'Keys', description: '', category: 'Keys', location: '', date: '' };
  const a = createPost(base);
  const b = createPost(base);
  const tokens = db.prepare('SELECT edit_token FROM posts WHERE id IN (?, ?)').all(a.id, b.id);
  assert.notStrictEqual(tokens[0].edit_token, tokens[1].edit_token);
});
