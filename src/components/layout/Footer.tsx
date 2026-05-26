import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-display font-bold tracking-tight text-white mb-6">
              Light Pixel<span className="text-accent">Media</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Creative Agency hàng đầu cung cấp giải pháp truyền thông, marketing và tổ chức sự kiện toàn diện cho doanh nghiệp.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6">Dịch vụ</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-gray-400 hover:text-accent transition-colors text-sm">Marketing thuê ngoài</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-accent transition-colors text-sm">Truyền thông đa nền tảng</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-accent transition-colors text-sm">Media Production</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-accent transition-colors text-sm">Tổ chức sự kiện</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Thông tin</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-accent transition-colors text-sm">Về chúng tôi</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-accent transition-colors text-sm">Dự án tiêu biểu</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-accent transition-colors text-sm">Quy trình làm việc</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-accent transition-colors text-sm">Tuyển dụng</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span>Tòa nhà Innovation, Phường ABC, Quận XYZ, TP. Hà Nội</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={18} className="text-accent shrink-0" />
                <span>090 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={18} className="text-accent shrink-0" />
                <span>hello@lightpixel.vn</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Light Pixel Media. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
