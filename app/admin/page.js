'use client'
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [kelas, setKelas] = useState('');
  const [mapel, setMapel] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [token, setToken] = useState('');
  const [file, setFile] = useState(null);
  const [schedules, setSchedules] = useState([]);

  useEffect(()=>{ fetchSchedules(); }, []);

  async function fetchSchedules() {
    const r = await fetch('/api/schedules');
    const j = await r.json();
    setSchedules(j.items || []);
  }

  async function save(e) {
    e.preventDefault();
    if (!kelas || !mapel || !tanggal || !token) return alert('Lengkapi semua field');

    let barcodeUrl = '';
    if (file) {
      const fd = new FormData();
      fd.append('file', file);
      const up = await fetch('/api/upload', { method: 'POST', body: fd });
      const uj = await up.json();
      if (!uj.ok) return alert('Upload gagal: ' + (uj.message || ''));
      barcodeUrl = uj.url;
    }

    const res = await fetch('/api/schedules', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kelas, mataPelajaran: mapel, tanggal, token, barcodeUrl }) });
    const j = await res.json();
    if (j.ok) {
      alert('Tersimpan');
      setKelas(''); setMapel(''); setTanggal(''); setToken(''); setFile(null);
      fetchSchedules();
    }
  }

  async function remove(id) {
    if (!confirm('Hapus jadwal ini?')) return;
    await fetch('/api/schedules?id='+id, { method: 'DELETE' });
    fetchSchedules();
  }

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin — Input Jadwal Ujian</h2>
      <form onSubmit={save} className="grid gap-3 max-w-xl card p-4 rounded-lg">
        <input value={kelas} onChange={e=>setKelas(e.target.value)} placeholder="Kelas (contoh: 7A)" className="p-2 rounded-md bg-transparent border border-white/10" />
        <input value={mapel} onChange={e=>setMapel(e.target.value)} placeholder="Mata Pelajaran" className="p-2 rounded-md bg-transparent border border-white/10" />
        <input type="date" value={tanggal} onChange={e=>setTanggal(e.target.value)} className="p-2 rounded-md bg-transparent border border-white/10" />
        <input value={token} onChange={e=>setToken(e.target.value)} placeholder="Token (6 digit)" className="p-2 rounded-md bg-transparent border border-white/10" />
        <input type="file" accept="image/png" onChange={e=>setFile(e.target.files?.[0] ?? null)} />
        <div className="flex gap-2">
          <button className="py-2 px-4 rounded-lg bg-indigo-600">Simpan Jadwal</button>
        </div>
      </form>

      <section className="mt-6">
        <h3 className="text-xl mb-3">Daftar Jadwal</h3>
        <div className="grid gap-3">
          {schedules.map(s=> (
            <div key={s.id} className="card p-3 rounded-lg flex justify-between items-center">
              <div>
                <div className="font-semibold">{s.kelas} — {s.mataPelajaran}</div>
                <div className="text-sm">{s.tanggal} • Token: {s.token}</div>
              </div>
              <div className="flex gap-2 items-center">
                {s.barcodeUrl && <img src={s.barcodeUrl} alt="barcode" className="w-20 h-20 object-contain" />}
                <button onClick={()=>remove(s.id)} className="py-1 px-3 rounded bg-red-600">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}