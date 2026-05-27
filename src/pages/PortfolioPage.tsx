import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { defaultData } from '../lib/data';
import { Link } from 'react-router-dom';

export default function PortfolioPage() {
  const [data, setData] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả dự án');

  useEffect(() => {
    fetch('/api/data')
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(d => setData(d))
      .catch(err => setData(defaultData));
  }, []);

  if (!data) return <div className="min-h-screen bg-white" />;

  // Dynamically extract categories
  const categories = [
    'Tất cả dự án',
    ...Array.from(new Set(data.caseStudies.map((item: any) => item.category).filter(Boolean))) as string[]
  ];

  const filteredCaseStudies = selectedCategory === 'Tất cả dự án'
    ? data.caseStudies
    : data.caseStudies.filter((item: any) => item.category === selectedCategory);

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      <Navbar />
      
      <div className="pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-gray-900">
            Dự án & Case Study
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            Những chiến dịch thực tế mang đậm dấu ấn sáng tạo và mang lại hiệu quả đo lường được mà chúng tôi đã triển khai cho doanh nghiệp.
          </p>
        </motion.div>

        {/* Dynamic Category Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16 border-b border-gray-100 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-accent text-white shadow-[0_4px_12px_rgba(0,102,255,0.25)]' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCaseStudies.map((item: any, index: number) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  to={`/portfolio/${item.id}`}
                  className="group cursor-pointer flex flex-col h-full bg-white rounded-3xl p-4 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 bg-gray-50 border border-gray-100">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between px-2">
                    <div>
                      <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-2">
                        {item.category}
                      </span>
                      <h4 className="text-xl font-display font-bold text-gray-900 group-hover:text-accent transition-colors mb-3">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {item.introduction || "Dự án tiêu biểu thể hiện năng lực sáng tạo và mức độ chi tiết trong khâu vận hành, đem lại thành công rực rỡ vượt qua KPI kỳ vọng."}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-2 text-sm text-gray-900 font-semibold group-hover:text-accent transition-colors">
                      Xem chi tiết dự án <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCaseStudies.length === 0 && (
          <div className="text-center py-24 text-gray-400 italic">
            Chưa có dự án nào thuộc danh mục này.
          </div>
        )}
      </div>

      <Footer data={data.footer} />
    </div>
  );
}
