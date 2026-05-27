import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import SectionBackground from '../layout/SectionBackground';

interface HeroProps {
  data: {
    title: string;
    subtitle: string;
    videoUrl: string;
  };
  bgConfig?: any;
}

export default function Hero({ data, bgConfig }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden w-full">
      {/* Background Video/Overlay */}
      {bgConfig ? (
        <SectionBackground config={bgConfig} />
      ) : (
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-20"
          >
            <source src={data.videoUrl} type="video/mp4" />
          </video>
        </div>
      )}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/90 via-white/80 to-white pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-xs font-medium text-accent tracking-wider mb-6 backdrop-blur-md"
        >
          PREMIUM CREATIVE AGENCY
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold text-gray-900 tracking-tight leading-[1.1] mb-8 max-w-4xl"
          dangerouslySetInnerHTML={{ __html: (data.title || '').replace(/(Light Pixel)/gi, '<br/>$1') }}
        />

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl font-light"
        >
          {data.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/services" className="bg-accent text-white px-8 py-4 rounded-full font-medium hover:bg-accent-light transition-colors flex items-center justify-center gap-2 group">
            Khám phá dịch vụ
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/portfolio" className="border border-gray-200 hover:border-gray-400 text-gray-900 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-full font-medium transition-colors flex items-center justify-center">
            Xem dự án
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
      </motion.div>
    </section>
  );
}
