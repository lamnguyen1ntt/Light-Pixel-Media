import React from 'react';
import { motion } from 'motion/react';

import SectionBackground from '../layout/SectionBackground';

export default function Clients({ data, bgConfig }: { data: { id: number, name: string, logoUrl: string }[], bgConfig?: any }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="relative py-20 bg-white border-t border-gray-200 overflow-hidden">
      <SectionBackground config={bgConfig} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-display font-bold text-gray-900">
            Các đơn vị đã hợp tác cùng
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {data.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-24 md:w-32 h-16 flex items-center justify-center overflow-hidden"
            >
              <img 
                src={client.logoUrl} 
                alt={client.name} 
                className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
