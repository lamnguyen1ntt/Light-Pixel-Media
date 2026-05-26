import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden border-t border-gray-200">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 leading-tight mb-6">
            Bắt đầu dự án của bạn
          </h2>
          <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
            Để lại thông tin, chuyên viên của chúng tôi sẽ liên hệ tư vấn giải pháp phù hợp nhất cho doanh nghiệp của bạn trong vòng 24h.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-xl"
        >
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Đã gửi yêu cầu thành công!</h3>
                <p className="text-gray-600">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ml-1">Họ và tên</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:border-accent focus:bg-white transition-colors"
                      placeholder="Nhập họ tên của bạn"
                      value={formState.name}
                      onChange={e => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ml-1">Số điện thoại</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:border-accent focus:bg-white transition-colors"
                      placeholder="091 234 5678"
                      value={formState.phone}
                      onChange={e => setFormState({...formState, phone: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:border-accent focus:bg-white transition-colors"
                    placeholder="email@doanhnghiep.com"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>
  
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Nhu cầu tư vấn</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:border-accent focus:bg-white transition-colors resize-none"
                    placeholder="Mô tả ngắn gọn về nhu cầu hoặc dự án của bạn..."
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                  ></textarea>
                </div>
  
                <button 
                  type="submit"
                  className="w-full bg-accent text-white hover:bg-accent-light font-medium py-4 rounded-xl transition-colors flex items-center justify-center gap-2 group mt-4 shadow-md"
                >
                Gửi yêu cầu tư vấn
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
