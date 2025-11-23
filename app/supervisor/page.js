'use client'
import { useEffect, useState } from 'react';

export default function Supervisor() {
  const [schedules, setSchedules] = useState([]);
  const [kelas, setKelas] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [mapel, setMapel] = useState('');
  const [result, setResult] = useState(null);

  useEffect(()=>{ fetch('/api/schedules').then(r=>r.json()).then(d=>setSchedules(d.items || [])); }, []);

  function findOne(e) {
    e.preventDefault();
    const found = schedules.find(s=> s.kelas === kelas && s.tanggal === tanggal && s.mataPelajaran === mapel);
    setResult(found || null);
    if (!found) alert('Tidak ditemukan');
  }

  const kelasOptions = Array.from(new Set(schedules.map(s=>s.kelas)));
  const tanggalOptions = Array.from(new Set(schedules.map(s=>s.tanggal)));
  const mapelOptions = Array.from(new Set(schedules.map(s=>s.mataPelajaran)));

  return (
    <main className="p-6">
      <h2 className="text-2xl mb-4">Pengawas — Ambil Barcode & Token</h2>
      <form onSubmit={findOne} className="grid gap-3 max-w-md card p-4 rounded-lg">
        <select value={kelas} onChange={e=>setKelas(e.target.value)} className="p-2 bg-transparent border border-white/10">
          <option value="">Pilih Kelas</option>
          {kelasOptions.map(k=> <option key={k} value={k}>{k}</option>)}
        </select>
        <select value={tanggal} onChange={e=>setTanggal(e.target.value)} className="p-2 bg-transparent border border-white/10">
          <option value="">Pilih Tanggal</option>
          {tanggalOptions.map(t=> <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={mapel} onChange={e=>setMapel(e.target.value)} className="p-2 bg-transparent border border-white/10">
          <option value="">Pilih Mata Pelajaran</option>
          {mapelOptions.map(m=> <option key={m} value={m}>{m}</option>)}
        </select>
        <button className="py-2 rounded-lg bg-green-600">Tampilkan</button>
      </form>

      {result && (
        <section className="mt-6 card p-4 rounded-lg">
          <h3 className="text-xl">Hasil</h3>
          <img src={result.barcodeUrl} alt="barcode" className="w-64 h-64 object-contain" />
          <p className="mt-2 text-lg">Token: <strong>{result.token}</strong></p>
        </section>
      )}
    </main>
  );
}