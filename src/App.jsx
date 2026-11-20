import { useEffect } from 'react';
import Header from './components/Header.jsx';
import { FactsBand, Hero } from './components/Hero.jsx';
import Quocreo from './components/Quocreo.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Certificates from './components/Certificates.jsx';
import { Contact, Footer } from './components/Contact.jsx';
import { initReveal } from './lib/reveal.js';

export default function App() {
  // Entrance animations run once the whole page has rendered.
  useEffect(() => initReveal(document), []);

  return (
    <>
      <a className="skip" href="#quocreo">Skip to experience</a>
      <Header />
      <main>
        <Hero />
        <FactsBand />
        <Quocreo />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
