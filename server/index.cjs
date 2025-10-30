const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'data.sqlite');
const db = new Database(dbPath);

// Initialize users table
db.prepare(
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    organization TEXT,
    wcagTarget TEXT,
    iso9241_compliance TEXT,
    needs TEXT
  )`
).run();

app.post('/api/register', async (req, res) => {
  try {
    const { id, name, email, password, organization, wcagTarget, iso9241_compliance, needs } = req.body;
    if (!email || !password || !name) return res.status(400).json({ error: 'missing_fields' });
    const hashed = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (id,name,email,password,organization,wcagTarget,iso9241_compliance,needs) VALUES (?,?,?,?,?,?,?,?)');
    const useId = id || String(Date.now());
    stmt.run(useId, name, email, hashed, organization || null, wcagTarget || null, iso9241_compliance || null, needs || null);
    const user = { id: useId, name, email, organization, wcagTarget, iso9241_compliance, needs };
    return res.json({ ok: true, user });
  } catch (err) {
    if (err && err.code === 'SQLITE_CONSTRAINT_UNIQUE') return res.status(409).json({ error: 'exists' });
    console.error(err);
    return res.status(500).json({ error: 'server_error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'missing_fields' });
    const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!row) return res.status(401).json({ error: 'invalid' });
    const ok = await bcrypt.compare(password, row.password);
    if (!ok) return res.status(401).json({ error: 'invalid' });
    const { password: _p, ...safe } = row;
    return res.json({ ok: true, user: safe });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error' });
  }
});

app.get('/api/users', (req, res) => {
  const rows = db.prepare('SELECT id,name,email,organization,wcagTarget,iso9241_compliance,needs FROM users').all();
  res.json({ users: rows });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Local API server listening on http://localhost:${port}`));
