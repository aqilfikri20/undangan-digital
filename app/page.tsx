import LandingNavbar from '@/components/LandingNavbar';
import {
  LandingClosing,
  LandingFooter,
  LandingHero,
  LandingIntroduction,
  LandingProcess,
  LandingThemes,
} from '@/components/landing/LandingSections';
import './landing.css';

export default function LandingPage() {
  return (
    <main className="landing-page">
      <LandingNavbar />
      <LandingHero />
      <LandingIntroduction />
      <LandingThemes />
      <LandingProcess />
      <LandingClosing />
      <LandingFooter />
    </main>
  );
}
