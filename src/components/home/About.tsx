import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import SectionBackground from '../layout/SectionBackground';

export default function About({ data, bgConfig }: { data: string, bgConfig?: any }) {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <SectionBackground config={bgConfig} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
              VỀ CHÚNG TÔI
            </h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-gray-900 leading-tight mb-8">
              Kiến tạo giá trị truyền thông đích thực
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-10 font-light">
              {data}
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <div className="text-4xl font-display font-bold text-gray-900 mb-2">5+</div>
                <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-gray-900 mb-2">200+</div>
                <div className="text-sm text-gray-600">Dự án thành công</div>
              </div>
            </div>

            <Link to="/about" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-accent transition-colors uppercase tracking-widest font-medium group">
              Khám phá thêm về chúng tôi
              <div className="w-8 h-[1px] bg-gray-400 group-hover:bg-accent group-hover:w-12 transition-all"></div>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 relative">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Team" 
                className="w-full h-full object-cover mix-blend-multiply hover:mix-blend-normal transition-all duration-700"
              />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-gray-200 rounded-full blur-2xl bg-accent/10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
