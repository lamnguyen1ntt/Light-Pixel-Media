import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Portfolio({ data }: { data: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-accent tracking-widest uppercase mb-4"
            >
              DỰ ÁN TIÊU BIỂU
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-display font-bold text-gray-900 leading-tight max-w-2xl"
            >
              Những câu chuyện thành công
            </motion.h3>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
             <button 
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-all"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={containerRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 w-[100vw] pr-6 md:pr-12 relative -ml-6 md:-ml-12 pl-6 md:pl-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-pointer snap-start shrink-0 w-[85vw] md:w-[600px]"
            >
              <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl mb-6 bg-gray-50 border border-gray-200 shadow-sm">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-2">
                    {item.category}
                  </span>
                  <h4 className="text-2xl font-display font-semibold text-gray-900 group-hover:text-accent transition-colors">
                    {item.title}
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 shrink-0 group-hover:bg-accent group-hover:border-transparent group-hover:text-white transition-all">
                  <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:text-left">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-accent transition-colors uppercase tracking-widest font-medium group">
            Xem tất cả dự án
            <div className="w-8 h-[1px] bg-gray-400 group-hover:bg-accent group-hover:w-12 transition-all"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
