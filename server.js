const path = require('path');
const express = require('express');
const { getStore } = require('./db');
const { makeHandlers } = require('./handlers');

const app = express();
const PORT = process.env.PORT || 3000;
const h = makeHandlers(getStore());

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

function send(res, result) {
  if (result.body === null) return res.status(result.status).end();
  res.status(result.status).json(result.body);
}

app.get('/api/categories', (req, res) => send(res, h.categories()));

// Public: browse and post listings
app.get('/api/listings', (req, res) => send(res, h.list(req.query)));
app.post('/api/listings', (req, res) => send(res, h.create(req.body)));

// Last-resort error handling so bad JSON gets a clean message instead of a stack trace
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ errors: ['Request body is not valid JSON.'] });
  }
  console.error(err);
  res.status(500).json({ errors: ['Something went wrong. Please try again.'] });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Lost & Found running at http://localhost:${PORT}`));
}

module.exports = app;
