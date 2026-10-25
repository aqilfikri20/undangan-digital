'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Heart, Menu, X } from 'lucide-react';
import styles from './LandingNavbar.module.css';

export default function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.nav}>
      <Link className={styles.brand} href="/" aria-label="UndangYuk, beranda">
        <span className={styles.brandIcon}><Heart size={18} fill="currentColor" /></span>
        <span className={styles.brandName}>Undang<span>Yuk</span></span>
      </Link>
      <button
        className={styles.menuButton}
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
        aria-expanded={menuOpen}
        aria-controls="landing-navigation"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav id="landing-navigation" className={`${styles.links} ${menuOpen ? styles.open : ''}`} aria-label="Navigasi utama">
        <a className={styles.link} href="#tentang" onClick={closeMenu}>Tentang</a>
        <a className={styles.link} href="#tema" onClick={closeMenu}>Pilihan tema</a>
        <a className={styles.link} href="#cara-kerja" onClick={closeMenu}>Cara kerja</a>
        <Link className={`${styles.link} ${styles.login}`} href="/login" onClick={closeMenu}>Masuk</Link>
        <Link className={styles.register} href="/register" onClick={closeMenu}>Daftar gratis <ArrowRight size={15} /></Link>
      </nav>
    </header>
  );
}
