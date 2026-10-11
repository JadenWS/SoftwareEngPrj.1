const path = require('path');
const express = require('express');
const { validatePost, CATEGORIES } = require('./validation');
const { createPost } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Category list for the form dropdown
app.get('/api/categories', (req, res) => {
  res.json(CATEGORIES);
});

// User story 1: post something lost or found
app.post('/api/listings', (req, res) => {
  const { valid, errors, post } = validatePost(req.body);
  if (!valid) {
    return res.status(400).json({ errors });
  }
  const saved = createPost(post);
  res.status(201).json({ id: saved.id, message: 'Your post was created.' });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Lost & Found running at http://localhost:${PORT}`));
}

module.exports = app;
