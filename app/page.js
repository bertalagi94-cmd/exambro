'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.ok) {
      sessionStorage.setItem('exambro_token', data.token);
      sessionStorage.setItem('exambro_role', data.role);
      if (data.role === 'admin') router.push('/admin');
      else router.push('/supervisor');
    } else {
      alert('Login gagal: ' + (data.message || ''));
    }
  }

  return (
    <main className="min-h-screen grid place-items-center">
      <form onSubmit={handleLogin} className="card p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Exambro — Login</h1>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="w-full p-3 mb-3 rounded-md bg-transparent border border-white/10" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-3 mb-4 rounded-md bg-transparent border border-white/10" />
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500">Login</button>
        <p className="mt-3 text-sm">Admin: <code>admin</code> / <code>admin</code> — Pengawas: <code>Pengawas</code> / <code>TM81</code></p>
      </form>
    </main>
  );
}