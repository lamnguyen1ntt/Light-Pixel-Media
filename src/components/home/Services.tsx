import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Share2, Video, Calendar, ShoppingCart, Globe, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const icons: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  share2: Share2,
  video: Video,
  calendar: Calendar,
  "shopping-cart": ShoppingCart,
  globe: Globe
};

export default function Services({ data }: { data: any[] }) {
  return (
    <section id="services" className="py-24 md:py-32 bg-gray-50 relative border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
              GIẢI PHÁP CỦA CHÚNG TÔI
            </h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
              Dịch vụ toàn diện cho sự phát triển vượt bậc
            </h3>
          </motion.div>
          
          <motion.a 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#contact" 
            className="text-sm text-gray-600 hover:text-accent flex items-center gap-2 group transition-colors uppercase tracking-wider font-semibold"
          >
            Nhận tư vấn ngay
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((service, index) => {
            const Icon = icons[service.icon] || Briefcase;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link to={`/services/${service.id}`} className="block h-full group relative p-8 md:p-10 rounded-2xl bg-white border border-gray-200 hover:border-accent/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500 border border-gray-200 group-hover:border-transparent">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  
                  <h4 className="text-xl font-display font-bold text-gray-900 mb-4 pr-10 group-hover:text-accent transition-colors">
                    {service.title}
                  </h4>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="absolute top-8 right-8 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-accent group-hover:border-transparent group-hover:text-white transition-all duration-300">
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
