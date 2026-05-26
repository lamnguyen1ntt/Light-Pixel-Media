import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'motion/react';
import Process from '../components/home/Process';
import { defaultData } from '../lib/data';
import { Link } from 'react-router-dom';

export default function AboutPage() {
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
      
      <div className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-gray-900">
            Câu chuyện của <span className="text-accent">Light Pixel</span>
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            {data.about}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-display font-bold mb-6 text-gray-900">Triết lý thiết kế & Vận hành</h2>
            <p className="text-gray-600 mb-6 font-light leading-relaxed">
              Tại Light Pixel Media, chúng tôi tin rằng truyền thông không chỉ là công cụ để đo lường chuyển đổi, mà còn là bản sắc để một thương hiệu có thể sống lâu dài trong tâm trí khách hàng. 
            </p>
            <p className="text-gray-600 font-light leading-relaxed">
              Chúng tôi luôn xây dựng nội dung có chiều sâu, kết hợp cùng hình ảnh thẩm mỹ theo phong cách premium corporate, giúp đối tác không chỉ gia tăng doanh số mà còn khẳng định vị thế dẫn đầu trong ngành.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-square bg-gray-50 rounded-3xl overflow-hidden"
          >
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" alt="Team working" className="w-full h-full object-cover opacity-90" />
          </motion.div>
        </div>
      </div>
      
      <Process />
      
      <div className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h3 className="text-3xl font-display font-bold mb-8 text-gray-900">Bạn đã sẵn sàng đồng hành cùng chúng tôi?</h3>
          <Link to="/#contact" className="inline-block bg-accent text-white px-8 py-4 rounded-full font-medium hover:bg-accent-light transition-colors">
            Khởi động dự án ngay
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
