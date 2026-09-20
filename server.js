const express = require('express');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const PASSWORD_FILE = path.join(__dirname, 'sai-2007');
const AUTH_NUMBERS = new Set(['7659951392', '6304305587', '8008597539']);
const sessions = new Map();

app.use(express.json({ limit: '50kb' }));
app.use(express.static(__dirname));

function normalizePhone(value) {
  return String(value || '').replace(/\D/g, '').slice(-10);
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(String(password)).digest('hex');
}

function readPasswordHash() {
  try {
    const value = fs.readFileSync(PASSWORD_FILE, 'utf8').trim();
    if (/^[a-f0-9]{64}$/i.test(value)) return value.toLowerCase();
  } catch (_) {}
  const initial = hashPassword('180227');
  fs.writeFileSync(PASSWORD_FILE, initial + '\n', { mode: 0o600 });
  return initial;
}

function savePasswordHash(hash) {
  fs.writeFileSync(PASSWORD_FILE, hash + '\n', { mode: 0o600 });
}

function getSession(req) {
  const token = String(req.headers['x-admin-session'] || '');
  if (!token) return null;
  const session = sessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }
  return session;
}

app.post('/api/admin/login', (req, res) => {
  const phone = normalizePhone(req.body.phone);
  const password = String(req.body.password || '');
  if (!AUTH_NUMBERS.has(phone)) return res.status(403).json({ error: 'This mobile number is not authorized.' });
  const storedHash = readPasswordHash();
  const suppliedHash = hashPassword(password);
  if (suppliedHash !== storedHash) return res.status(401).json({ error: 'Incorrect password.' });

  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, { phone, expiresAt: Date.now() + 8 * 60 * 60 * 1000 });
  res.json({ ok: true, token });
});

app.post('/api/admin/change-password', (req, res) => {
  const session = getSession(req);
  if (!session) return res.status(401).json({ error: 'Admin session expired. Please log in again.' });

  const currentPassword = String(req.body.currentPassword || '');
  const currentHashCode = String(req.body.currentHashCode || '').trim().toLowerCase();
  const newPassword = String(req.body.newPassword || '');
  const confirmPassword = String(req.body.confirmPassword || '');
  const storedHash = readPasswordHash();

  if (!currentPassword || !currentHashCode || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: 'Fill in all password-change fields.' });
  }
  if (currentHashCode !== storedHash) {
    return res.status(400).json({ error: 'The entered hash code does not match sai-2007.' });
  }
  if (hashPassword(currentPassword) !== storedHash) {
    return res.status(400).json({ error: 'The original password is incorrect.' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must contain at least 6 characters.' });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'New password and confirmation do not match.' });
  }

  const newHash = hashPassword(newPassword);
  savePasswordHash(newHash);
  res.json({ ok: true, message: 'Password changed. The new password hash is saved in sai-2007.' });
});

app.post('/api/admin/logout', (req, res) => {
  const token = String(req.headers['x-admin-session'] || '');
  sessions.delete(token);
  res.json({ ok: true });
});

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'uma-tailors-admin-password' }));

app.listen(PORT, '0.0.0.0', () => console.log(`Uma Tailors website running on port ${PORT}`));
