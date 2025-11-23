// lib/kv.js
// Simulasi database menggunakan file JSON.

import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data.json');

// memastikan file data.json ada
async function ensureDB() {
  try {
    await fs.access(dbPath);
  } catch {
    await fs.writeFile(dbPath, JSON.stringify({
      classes: [],
      schedules: [],
      barcodes: []
    }, null, 2));
  }
}

export async function readDB() {
  await ensureDB();
  const data = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(data);
}

export async function writeDB(data) {
  await ensureDB();
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}
