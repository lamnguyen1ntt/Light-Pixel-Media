import React, { useState, useEffect } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Về chúng tôi', href: '/about' },
    { label: 'Dịch vụ', href: '/services' },
    { label: 'Dự án', href: '/portfolio' },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-white/90 backdrop-blur-md border-gray-200 py-4 shadow-sm" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="text-2xl font-display font-bold tracking-tight text-gray-900 flex items-center gap-2 group z-50">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-[0_0_15px_rgba(0,102,255,0.4)] group-hover:scale-105 transition-transform duration-300">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            Light Pixel<span className="text-accent group-hover:text-accent-light transition-colors duration-300">Media</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-gray-600 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="text-gray-400 hover:text-accent transition-colors p-2"
                title="Quản trị viên"
              >
                <Settings size={20} />
              </Link>
              <Link
                to="/#contact"
                className="bg-accent hover:bg-accent-light text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 inline-block shadow-[0_0_15px_rgba(0,102,255,0.4)]"
              >
                Liên hệ ngay
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-900 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 border-b border-gray-200 shadow-xl"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-display font-medium text-gray-900 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-display font-medium text-gray-900 hover:text-accent transition-colors border-t border-gray-100 pt-6 mt-2 flex items-center justify-center gap-2"
              >
                <Settings size={24} />
                Quản trị viên
              </Link>
              <Link
                to="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 bg-accent text-white px-8 py-4 rounded-full text-lg font-medium inline-block shadow-[0_0_15px_rgba(0,102,255,0.4)]"
              >
                Liên hệ ngay
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
