import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import Portfolio from '../components/home/Portfolio';
import Process from '../components/home/Process';
import Testimonials from '../components/home/Testimonials';
import ContactForm from '../components/home/ContactForm';
import Clients from '../components/home/Clients';
import { defaultData } from '../lib/data';

export default function HomePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(d => setData(d))
      .catch(err => {
        console.error("Error fetching data, using fallback", err);
        setData(defaultData);
      });
  }, []);

  if (!data) return <div className="min-h-screen bg-white flex items-center justify-center text-gray-900 font-display text-xl">Loading...</div>;

  return (
    <div className="bg-white text-gray-900 selection:bg-accent selection:text-white font-sans">
      <Navbar />
      <Hero data={data.hero} />
      <Clients data={data.clients} />
      <About data={data.about} />
      <Services data={data.services} />
      <Portfolio data={data.caseStudies} />
      <Process />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}
