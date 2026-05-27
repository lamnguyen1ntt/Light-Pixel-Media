import React from 'react';
import { motion } from 'motion/react';
import SectionBackground from '../layout/SectionBackground';

export default function Testimonials({ data, bgConfig }: { data?: any[], bgConfig?: any }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <SectionBackground config={bgConfig} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
            Khách hàng nói gì về chúng tôi
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-gray-50 p-10 rounded-2xl border border-gray-200 relative shadow-sm"
            >
              <div className="text-accent text-6xl font-display leading-none absolute top-6 right-8 opacity-10">"</div>
              <p className="text-lg text-gray-600 font-light italic mb-8 relative z-10">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h5 className="text-gray-900 font-medium">{t.author}</h5>
                  <p className="text-sm text-gray-600">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
