import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Services from '../components/home/Services';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { defaultData } from '../lib/data';

export default function ServicesPage() {
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
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-gray-900">
            Dịch vụ & Giải pháp
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            Hệ sinh thái dịch vụ toàn diện giúp doanh nghiệp của bạn tối ưu hoá chi phí, gia tăng độ nhận diện và thúc đẩy chuyển đổi thông qua chiến lược bài bản từ Light Pixel Media.
          </p>
        </motion.div>
      </div>

      <Services data={data.services} />
      
      <div className="py-24 bg-gray-50 border-y border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h3 className="text-3xl font-display font-bold mb-8 text-gray-900">Tìm kiếm gói giải pháp riêng biệt?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">Chúng tôi luôn tùy chỉnh các dịch vụ để phù hợp nhất với tầm nhìn và quy mô doanh nghiệp của bạn.</p>
          <Link to="/#contact" className="inline-block bg-accent text-white px-8 py-4 rounded-full font-medium hover:bg-accent-light transition-colors">
            Nhận tư vấn ngay
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
