import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionBackground from '../layout/SectionBackground';

export default function Portfolio({ data, bgConfig }: { data: any[], bgConfig?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả dự án');

  // Dynamically extract categories from incoming projects
  const categories = [
    'Tất cả dự án',
    ...Array.from(new Set(data.map((item: any) => item.category).filter(Boolean))) as string[]
  ];

  const filteredData = selectedCategory === 'Tất cả dự án'
    ? data
    : data.filter((item: any) => item.category === selectedCategory);

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
    <section id="portfolio" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <SectionBackground config={bgConfig} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-display font-bold text-gray-900 leading-tight max-w-3xl"
            >
              <span className="text-accent">Dự án tiêu biểu:</span> Những câu chuyện thành công
            </motion.h2>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-all"
              aria-label="Scroll left"
            >
              <ArrowLeft size={20} />
            </button>
             <button 
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-all"
              aria-label="Scroll right"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-12 border-b border-gray-50 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                if (containerRef.current) {
                  containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-accent text-white shadow-[0_4px_12px_rgba(0,102,255,0.2)]' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <motion.div 
            ref={containerRef}
            layout="position"
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 w-[100vw] pr-6 md:pr-12 relative -ml-6 md:-ml-12 pl-6 md:pl-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer snap-start shrink-0 w-[85vw] md:w-[600px]"
                >
                  <Link to={`/portfolio/${item.id}`} className="block">
                    <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl mb-6 bg-gray-50 border border-gray-200 shadow-sm">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-2">
                          {item.category}
                        </span>
                        <h4 className="text-xl md:text-2xl font-display font-semibold text-gray-900 group-hover:text-accent transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2 max-w-xl">
                          {item.introduction || "Dự án tiêu biểu thể hiện năng lực sáng tạo và mức độ chi tiết trong khâu vận hành, đem lại thành công rực rỡ vượt qua KPI kỳ vọng."}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 shrink-0 group-hover:bg-accent group-hover:border-transparent group-hover:text-white transition-all">
                        <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredData.length === 0 && (
              <div className="w-full text-center py-16 text-gray-400 italic shrink-0">
                Chưa có dự án nào thuộc danh mục này.
              </div>
            )}
          </motion.div>
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
