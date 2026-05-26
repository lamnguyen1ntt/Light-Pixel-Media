import React from 'react';
import { motion } from 'motion/react';

const testimonials = [
  {
    quote: "Toàn Cầu Media đã giúp chúng tôi tái định vị hoàn toàn thương hiệu trên nền tảng số. Đội ngũ chuyên nghiệp, sáng tạo và luôn bám sát mục tiêu kinh doanh.",
    author: "Nguyễn Văn A",
    role: "CEO, TechViet",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "Một agency hiếm hoi thực sự hiểu về SMEs. Các chiến dịch thực thi sắc bén, hình ảnh visual ấn tượng và quan trọng nhất là chi phí tối ưu so với hiệu quả mang lại.",
    author: "Trần Thị B",
    role: "Marketing Director, F&B Chain",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
          {testimonials.map((t, i) => (
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
