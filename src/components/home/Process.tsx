import React from 'react';
import { motion } from 'motion/react';
import SectionBackground from '../layout/SectionBackground';

export default function Process({ bgConfig, data }: { bgConfig?: any; data?: any }) {
  const subtitle = data?.subtitle || "QUY TRÌNH LÀM VIỆC";
  const title = data?.title || "Cách chúng tôi tạo ra sự khác biệt";
  const description = data?.description || "Quy trình chuẩn hóa nhưng linh hoạt, đảm bảo mọi chiến dịch đều được thực thi với độ chính xác cao nhất và mang lại kết quả thực tế.";
  const steps = data?.steps || [
    { num: "01", title: "Nghiên cứu & Phân tích", desc: "Thấu hiểu thị trường, nội tại doanh nghiệp và đối thủ cạnh tranh." },
    { num: "02", title: "Lên chiến lược", desc: "Thiết kế kế hoạch định hướng chi tiết, chọn lọc kênh truyền thông tối ưu." },
    { num: "03", title: "Thực thi & Sáng tạo", desc: "Triển khai nội dung, hình ảnh, video với chất lượng premium." },
    { num: "04", title: "Đo lường & Tối ưu", desc: "Đánh giá hiệu quả liên tục để tối ưu chuyển đổi và chi phí." }
  ];

  return (
    <section id="process" className="relative py-24 md:py-32 bg-gray-50 border-t border-gray-200 overflow-hidden">
      <SectionBackground config={bgConfig} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-32"
          >
            <h2 className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
              {subtitle}
            </h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-gray-900 leading-tight mb-8">
              {title}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
              {description}
            </p>
          </motion.div>

          <div className="space-y-12 relative">
            <div className="absolute left-6 top-10 bottom-10 w-[1px] bg-gray-200 hidden md:block"></div>
            
            {steps.map((step: any, index: number) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative pl-0 md:pl-20"
              >
                <div className="hidden md:flex absolute left-0 top-0 w-12 h-12 rounded-full bg-white border border-gray-200 items-center justify-center text-sm font-display font-bold text-gray-900 z-10 shadow-sm">
                  {step.num}
                </div>
                
                <h4 className="text-2xl font-display font-semibold text-gray-900 mb-3 flex items-center gap-4">
                  <span className="md:hidden text-accent text-lg">{step.num}.</span>
                  {step.title}
                </h4>
                <p className="text-gray-600 font-light leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
