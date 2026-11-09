const path = require('path');
const crypto = require('crypto');
// SQLite is built into Node 22.5+, so there is nothing extra to install
const { DatabaseSync } = require('node:sqlite');

// Everything the public is allowed to see. edit_token is deliberately NOT in this list.
const PUBLIC_COLUMNS = 'id, type, title, description, category, location, date, status, created_at';

// Makes a store (a thin layer over one SQLite file). Tests pass ':memory:' for a throwaway database.
function createStore(file) {
  const db = new DatabaseSync(file);
  // If another process is using the file for a moment, wait up to 3 seconds instead of failing
  db.exec('PRAGMA busy_timeout = 3000');

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

  // Saves a validated post. Returns the new id plus the private edit token,
  // which the poster needs to edit, resolve, or delete the post later.
  function createPost(post) {
    const edit_token = crypto.randomUUID();
    const info = insertPost.run({
      ...post,
      edit_token,
      created_at: new Date().toISOString(),
    });
    return { id: Number(info.lastInsertRowid), edit_token };
  }

  // Active posts, newest first
  function listPosts() {
    return db
      .prepare(`SELECT ${PUBLIC_COLUMNS} FROM posts WHERE status = 'active' ORDER BY created_at DESC, id DESC`)
      .all();
  }

  return { createPost, listPosts };
}

// The store the running app uses. It is only opened when something asks for it, so simply
// loading this file (for example in a test) never touches the real database file.
// DB_PATH lets you point it at a different file.
let appStore;
function getStore() {
  if (!appStore) {
    appStore = createStore(process.env.DB_PATH || path.join(__dirname, 'lostfound.db'));
  }
  return appStore;
}

module.exports = { getStore, createStore };
