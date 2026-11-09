# Campus Lost & Found Board

A simple web app where anyone on campus can post something they lost or found,
and search what others have posted.

## Run it

Needs Node.js 22.5 or newer.

```bash
npm install
npm start
```

Then open http://localhost:3000.

## Tests

```bash
npm test
```

## Features (user stories)

- [x] Post something lost or found
- [x] Browse posts
- [ ] Search posts by keyword (title and description)
- [ ] Filter posts by category and lost/found
- [ ] Get a private edit link when you post
- [ ] Mark a post resolved (hidden from the main list; tick "Include resolved" to see it)
- [ ] Posts are saved in a database and survive restarts

## How it works

| Method | Path | What it does |
|---|---|---|
| GET | `/api/listings` | Browse posts |
| POST | `/api/listings` | Create a post |

Files:

- `server.js` - Express routes (thin)
- `handlers.js` - the app logic and validation of search/filter input
- `validation.js` - rules for new and edited posts
- `db.js` - SQLite database access
- `public/` - the web pages (`index.html` + `app.js`, shared `common.js`)
- `test/` - automated tests

## Design notes

- **Cross-site scripting:** the pages build cards with `textContent`, so post text can't run as code.
- **Stack:** Node.js, Express, SQLite (built into Node), plain HTML/CSS/JavaScript.

## Known limits

- No spam protection or rate limiting.
