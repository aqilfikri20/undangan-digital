import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  Flower2,
  Heart,
  Play,
  Sparkles,
  WandSparkles,
} from 'lucide-react';

const themes = [
  {
    title: 'Batik Biru',
    type: 'Batik biru keemasan',
    image: '/background/cover-batik.jpg',
    kind: 'batik',
  },
  {
    title: 'Hutan Hijau',
    type: 'Nuansa hutan yang teduh',
    image: '/background/cover-hutan.jpg',
    kind: 'forest',
  },
];

export function LandingHero() {
  return (
    <section className="landing-hero" id="tentang">
      <div className="hero-grain" />
      <div className="landing-hero-copy">
        <div className="landing-eyebrow"><Sparkles size={14} /> UNTUK HARI YANG TAK TERLUPAKAN</div>
        <h1>Undangan digital<br />terbaik & menarik,<br /><em>dibuat dengan ceritamu.</em></h1>
        <p>Kenalkan hari bahagiamu lewat undangan yang personal, cantik, dan mudah dibagikan. Pilih tema, isi cerita, lalu sebarkan kebahagiaan.</p>
        <div className="hero-actions">
          <Link className="landing-cta" href="/register">Buat undangan gratis <ArrowRight size={16} /></Link>
          <a className="hero-secondary" href="#cara-kerja"><span><Play size={13} fill="currentColor" /></span> Lihat cara kerja</a>
        </div>
        <div className="hero-social-proof">
          <div className="proof-avatars"><i>NA</i><i>AR</i><i>DS</i><i>+</i></div>
          <span><strong>2.400+</strong> cerita bahagia dimulai di sini</span>
        </div>
      </div>
      <div className="landing-hero-art">
        <div className="hero-flower-stamp">✿<small>LOVE<br />IS IN THE<br />DETAILS</small></div>
        <div className="hero-invite-backdrop" />
        <div className="hero-invite-card">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=90" alt="Pasangan di hari pernikahan" />
          <div className="invite-card-shade" />
          <div className="invite-card-text"><small>THE WEDDING OF</small><strong>Amara <i>&</i> Bima</strong><span>12 . 12 . 2026</span><b>BANDUNG, INDONESIA</b></div>
          <div className="invite-card-flower">✿</div>
        </div>
        <div className="hero-note"><span><Heart size={15} fill="currentColor" /></span><div><strong>Dirancang olehmu</strong><small>Dibagikan dengan cinta</small></div><Check size={15} className="hero-note-check" /></div>
        <span className="hero-art-doodle doodle-a">✳</span><span className="hero-art-doodle doodle-b">✧</span>
      </div>
      <a className="scroll-hint" href="#cara-kerja"><ArrowDown size={14} /> GULIR UNTUK MENJELAJAH</a>
      <div className="hero-side-label">CERITA KALIAN, CARA KALIAN — EST. 2026</div>
    </section>
  );
}

export function LandingIntroduction() {
  return (
    <section className="landing-intro">
      <div className="landing-section-kicker"><span /> LEBIH DARI SEKADAR UNDANGAN</div>
      <div className="intro-grid">
        <h2>Hari istimewa,<br /><em>dibuka dengan cerita.</em></h2>
        <div><p>UndangYuk adalah rumah bagi undangan digital yang terasa dekat dan personal. Bukan cuma memberi tahu tanggal, tapi berbagi kisah, foto, lokasi, dan rasa bahagia dengan orang-orang tersayang.</p><Link href="/register" className="inline-link">Mulai ceritamu <ArrowRight size={15} /></Link></div>
      </div>
      <div className="intro-stat-row">
        <div><strong>01</strong><span>Pilih desain<br />yang kamu suka</span></div>
        <div><strong>02</strong><span>Isi detail dan<br />kisah kalian</span></div>
        <div><strong>03</strong><span>Bagikan tautan<br />ke orang tersayang</span></div>
        <div className="intro-flower">✿</div>
      </div>
    </section>
  );
}

export function LandingThemes() {
  return (
    <section className="landing-themes" id="tema">
      <div className="theme-heading">
        <div><div className="landing-section-kicker"><span /> KOLEKSI UNTUK SETIAP CERITA</div><h2>Temukan tema <em>pilihanmu.</em></h2><p>Setiap cerita punya warna sendiri. Mana yang paling terasa seperti kalian?</p></div>
        <Link className="theme-all-link" href="/register">Pilih tema <ArrowRight size={15} /></Link>
      </div>
      <div className="landing-theme-grid">
        {themes.map((theme, index) => (
          <Link href="/register" className={`landing-theme-card theme-${theme.kind}`} key={theme.title}>
            <div className="landing-theme-image"><img src={theme.image} alt={`${theme.title}, tema undangan pernikahan`} /><span className="landing-theme-number">0{index + 1}</span><span className="landing-theme-open"><ArrowRight size={16} /></span></div>
            <div className="landing-theme-meta"><div><h3>{theme.title}</h3><span>{theme.type}</span></div><ChevronRight size={17} /></div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function LandingProcess() {
  return (
    <section className="landing-process" id="cara-kerja">
      <div className="process-left"><div className="landing-section-kicker"><span /> GAMPANG BANGET</div><h2>Mulai dari<br /><em>“yuk, isi data kamu.”</em></h2><p>Wizard sederhana akan memandumu mengisi informasi pasangan, jadwal acara, lokasi, kisah cinta, dan galeri foto. Kamu bisa menyimpan dan mengubahnya kapan saja.</p><Link className="landing-cta" href="/register">Mulai buat undangan <ArrowRight size={16} /></Link><div className="process-decoration">✳</div></div>
      <div className="process-steps">
        <div className="process-step"><span>01</span><div><WandSparkles size={19} /><h3>Pilih tema favorit</h3><p>Batik Biru atau Hutan Hijau, sesuai cerita kalian.</p></div><Check size={16} className="step-check" /></div>
        <div className="process-step"><span>02</span><div><Heart size={19} /><h3>Ceritakan tentang kalian</h3><p>Nama, keluarga, tanggal, lokasi, dan kisah cinta.</p></div><Check size={16} className="step-check" /></div>
        <div className="process-step"><span>03</span><div><Flower2 size={19} /><h3>Bagikan undanganmu</h3><p>Pratinjau hasilnya, lalu bagikan ke semua tamu.</p></div><Check size={16} className="step-check" /></div>
      </div>
    </section>
  );
}

export function LandingClosing() {
  return (
    <section className="landing-bottom-cta">
      <div className="bottom-cta-flower">✿</div><div className="landing-section-kicker"><span /> SEMUA CERITA INDAH DIMULAI DARI SINI</div>
      <h2>Ayo wujudkan undangan<br /><em>hari bahagiamu.</em></h2><p>Gratis untuk memulai. Dibuat dengan sepenuh hati.</p>
      <Link className="landing-cta cta-light" href="/register">Buat undangan pertamamu <ArrowRight size={16} /></Link>
      <span className="bottom-cta-note">Tak perlu kartu kredit <i>·</i> Bisa diedit kapan saja</span>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="landing-footer">
      <Link className="landing-brand" href="/"><span className="landing-brand-icon"><Heart size={16} fill="currentColor" /></span>Undang<span>Yuk</span></Link>
      <span>Dibuat dengan cinta, untuk cerita yang abadi.</span>
      <div><Link href="/login">Masuk</Link><Link href="/register">Daftar</Link><span>© 2026 UndangYuk</span></div>
    </footer>
  );
}
