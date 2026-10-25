'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Heart } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const register = mode === 'register';
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError('');
    const data = new FormData(e.currentTarget);
    const password = String(data.get('password') || '');
    if (password.length < 8) { setError('Kata sandi perlu minimal 8 karakter.'); return; }
    try {
      const response = await fetch(`/api/auth/${register ? 'register' : 'login'}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json();
      if (!response.ok) { setError(result.error || 'Tidak dapat memproses akun.'); return; }
      router.push('/dashboard');
    } catch { setError('Tidak dapat terhubung ke server. Periksa koneksi database.'); }
  };
  return <main className="auth-page"><div className="auth-story"><Link className="auth-back" href="/"><ArrowLeft size={15}/> Kembali ke beranda</Link><Link className="landing-brand auth-brand" href="/"><span className="landing-brand-icon"><Heart size={17} fill="currentColor"/></span>Undang<span>Yuk</span></Link><div className="auth-story-copy"><span className="landing-section-kicker"><span/> CERITA KALIAN LAYAK DIRAYAKAN</span><h1>Satu hari,<br/>sejuta <em>kenangan.</em></h1><p>Mulai susun undangan yang akan dikenang orang-orang tersayang.</p><div className="auth-story-photo"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85" alt="Momen pernikahan yang hangat"/><span>“Hari yang sederhana,<br/>dengan cinta yang luar biasa.”</span></div></div><span className="auth-story-footer">© 2026 UndangYuk · Dibuat dengan cinta</span></div><section className="auth-panel"><div className="auth-form-wrap"><div className="auth-mobile-brand"><Link className="landing-brand" href="/"><span className="landing-brand-icon"><Heart size={16} fill="currentColor"/></span>Undang<span>Yuk</span></Link></div><span className="auth-welcome">{register ? 'SELAMAT DATANG DI RUANG CERITAMU' : 'SENANG MELIHATMU LAGI'}</span><h2>{register ? 'Mulai kisah indahmu.' : 'Lanjutkan ceritamu.'}</h2><p className="auth-form-intro">{register ? 'Buat akun gratis dan mulai rancang undangan hari bahagiamu.' : 'Masuk untuk melanjutkan undangan yang sedang kamu siapkan.'}</p><form onSubmit={submit}>{register && <label>Nama lengkap<input value={name} onChange={e=>setName(e.target.value)} required placeholder="Nama kamu" autoComplete="name"/></label>}<label>Alamat email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="nama@email.com" autoComplete="email"/></label><label>Kata sandi<input name="password" type="password" required placeholder="Minimal 8 karakter" autoComplete={register?'new-password':'current-password'}/></label>{error && <div className="auth-error">{error}</div>}<button className="auth-form-submit" type="submit">{register?'Buat akun gratis':'Masuk ke akun'} <ArrowRight size={16}/></button></form><div className="auth-divider"><span/> atau <span/></div><p className="auth-switch">{register?'Sudah punya akun?':'Belum punya akun?'} <Link href={register?'/login':'/register'}>{register?'Masuk':'Daftar gratis'}</Link></p><p className="auth-terms"><Check size={13}/> {register?'Dengan mendaftar, kamu menyetujui':'Akunmu disimpan dengan aman di server.'} {register&&<a href="#ketentuan">Syarat & Ketentuan</a>}</p></div></section></main>;
}
