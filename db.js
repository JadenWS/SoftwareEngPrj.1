const path = require('path');
const crypto = require('crypto');
// SQLite is built into Node 22.5+, so there is nothing extra to install
const { DatabaseSync } = require('node:sqlite');

// DB_PATH lets tests use a throwaway database
const db = new DatabaseSync(process.env.DB_PATH || path.join(__dirname, 'lostfound.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    type        TEXT NOT NULL,
    title       TEXT NOT NULL,
    description TEXT,
    category    TEXT NOT NULL,
    location    TEXT,
    date        TEXT,
    edit_token  TEXT NOT NULL UNIQUE,
    status      TEXT NOT NULL DEFAULT 'active',
    created_at  TEXT NOT NULL
  )
`);

const insertPost = db.prepare(`
  INSERT INTO posts (type, title, description, category, location, date, edit_token, status, created_at)
  VALUES (@type, @title, @description, @category, @location, @date, @edit_token, 'active', @created_at)
`);

// Saves a validated post. The edit token is generated here so every post gets one;
// it isn't shown to the user yet (that comes with the edit-link story).
function createPost(post) {
  const info = insertPost.run({
    ...post,
    edit_token: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  });
  return { id: Number(info.lastInsertRowid) };
}

module.exports = { db, createPost };
