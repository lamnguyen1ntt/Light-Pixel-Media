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
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-gray-900 leading-tight">
            {data.aboutTitlePlain || "Câu chuyện của"} <span className="text-accent">{data.aboutTitleAccent || "Light Pixel"}</span>
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            {data.about}
          </p>
        </motion.div>

        {/* Vision - Mission - Core Values Section */}
        {data.aboutVmv && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-xs font-semibold text-accent tracking-widest uppercase mb-2">
                {data.aboutVmv.subtitle || "TẦM NHÌN - SỨ MỆNH - GIÁ TRỊ CỐT LÕI"}
              </h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                {data.aboutVmv.title || "Định hướng & Giá trị thương hiệu"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Vision (Tầm nhìn) */}
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <h4 className="text-xl font-display font-semibold text-gray-900 mb-3">
                  {data.aboutVmv.visionTitle || "Tầm nhìn"}
                </h4>
                <p className="text-gray-600 font-light text-sm leading-relaxed whitespace-pre-line">
                  {data.aboutVmv.visionDesc}
                </p>
              </div>

              {/* Mission (Sứ mệnh) */}
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <h4 className="text-xl font-display font-semibold text-gray-900 mb-3">
                  {data.aboutVmv.missionTitle || "Sứ mệnh"}
                </h4>
                <p className="text-gray-600 font-light text-sm leading-relaxed whitespace-pre-line">
                  {data.aboutVmv.missionDesc}
                </p>
              </div>

              {/* Core Values (Giá trị cốt lõi) */}
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h4 className="text-xl font-display font-semibold text-gray-900 mb-3">
                  {data.aboutVmv.valuesTitle || "Giá trị cốt lõi"}
                </h4>
                <p className="text-gray-600 font-light text-sm leading-relaxed whitespace-pre-line">
                  {data.aboutVmv.valuesDesc}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-32 mb-32">
          {(data.aboutSections || []).map((section: any, index: number) => {
            const isLeft = section.imagePosition === 'left';
            return (
              <div key={section.id || index} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={isLeft ? 'md:order-2' : 'md:order-1'}
                >
                  <h2 className="text-3xl font-display font-bold mb-6 text-gray-900">{section.title}</h2>
                  <p className="text-gray-600 mb-6 font-light leading-relaxed whitespace-pre-line">
                    {section.p1}
                  </p>
                  {section.p2 && (
                    <p className="text-gray-600 font-light leading-relaxed whitespace-pre-line">
                      {section.p2}
                    </p>
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`aspect-square bg-gray-50 rounded-3xl overflow-hidden ${isLeft ? 'md:order-1' : 'md:order-2'}`}
                >
                  <img src={section.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"} alt={section.title} className="w-full h-full object-cover opacity-90" />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
      
      <Process data={data.process} />
      
      <div className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h3 className="text-3xl font-display font-bold mb-8 text-gray-900">Bạn đã sẵn sàng đồng hành cùng chúng tôi?</h3>
          <Link to="/#contact" className="inline-block bg-accent text-white px-8 py-4 rounded-full font-medium hover:bg-accent-light transition-colors">
            Khởi động dự án ngay
          </Link>
        </div>
      </div>

      <Footer data={data.footer} />
    </div>
  );
}
