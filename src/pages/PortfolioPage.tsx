import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { defaultData } from '../lib/data';

export default function PortfolioPage() {
  const [data, setData] = useState<any>(null);

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

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      <Navbar />
      
      <div className="pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-gray-900">
            Dự án & Case Study
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            Những chiến dịch thực tế mang đậm dấu ấn sáng tạo và mang lại hiệu quả đo lường được mà chúng tôi đã triển khai cho doanh nghiệp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.caseStudies.map((item: any, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 bg-gray-50 border border-gray-200 shadow-sm">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-medium text-accent uppercase tracking-wider block mb-2">
                    {item.category}
                  </span>
                  <h4 className="text-2xl font-display font-semibold text-gray-900 group-hover:text-accent transition-colors mb-3">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Dự án tiêu biểu thể hiện năng lực sáng tạo và mức độ chi tiết trong khâu vận hành, đem lại thành công rực rỡ vượt qua KPI kỳ vọng.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm text-gray-900 font-medium group-hover:text-accent transition-colors">
                  Chi tiết dự án <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
