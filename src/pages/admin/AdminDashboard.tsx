import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, Image, FileText, Briefcase, Menu as MenuIcon, LogOut, Users, FolderOpen, Inbox } from 'lucide-react';
import { cn } from '../../lib/utils';

// Import New Editors
import ServicesEditor from './ServicesEditor';
import PortfolioEditor from './PortfolioEditor';
import ClientsEditor from './ClientsEditor';
import SettingsEditor from './SettingsEditor';
import TestimonialsEditor from './TestimonialsEditor';
import CRMEditor from './CRMEditor';
import FooterEditor from './FooterEditor';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  const handleSave = async (newData: any) => {
    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    });
    const result = await res.json();
    setData(result.data);
    alert('Đã lưu thành công!');
  };

  if (!data) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Khách hàng liên hệ (CRM)', path: '/admin/crm', icon: Inbox },
    { name: 'Cài đặt nền', path: '/admin/settings', icon: Settings },
    { name: 'Footer', path: '/admin/footer', icon: Settings },
    { name: 'Khách hàng', path: '/admin/clients', icon: Users },
    { name: 'Nhận xét', path: '/admin/testimonials', icon: Users },
    { name: 'Hero Settings', path: '/admin/hero', icon: Image },
    { name: 'Dịch vụ', path: '/admin/services', icon: Briefcase },
    { name: 'Dự án (Portfolio)', path: '/admin/portfolio', icon: FolderOpen },
    { name: 'Giới thiệu', path: '/admin/about', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10 shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link to="/" className="text-xl font-display font-bold tracking-tight text-gray-900 flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
            </div>
            Light Pixel
          </Link>
        </div>
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive ? "bg-accent/10 text-accent" : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link to="/" className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200">
            <LogOut size={16} />
            Xem Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <Routes>
          <Route path="/" element={<DashboardHome data={data} />} />
          <Route path="/settings" element={<SettingsEditor data={data} onSave={handleSave} />} />
          <Route path="/hero" element={<HeroEditor data={data} onSave={handleSave} />} />
          <Route path="/about" element={<AboutEditor data={data} onSave={handleSave} />} />
          <Route path="/services" element={<ServicesEditor data={data} onSave={handleSave} />} />
          <Route path="/portfolio" element={<PortfolioEditor data={data} onSave={handleSave} />} />
          <Route path="/clients" element={<ClientsEditor data={data} onSave={handleSave} />} />
          <Route path="/testimonials" element={<TestimonialsEditor data={data} onSave={handleSave} />} />
          <Route path="/crm" element={<CRMEditor data={data} />} />
          <Route path="/footer" element={<FooterEditor data={data} onSave={handleSave} />} />
        </Routes>
      </main>
    </div>
  );
}

function DashboardHome({ data }: { data: any }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tổng quan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-accent/30 transition-colors">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
            <Briefcase size={20} />
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Tổng số dịch vụ</h3>
          <p className="text-3xl font-bold text-gray-900">{data.services.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-accent/30 transition-colors">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
            <FolderOpen size={20} />
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Dự án (Portfolio)</h3>
          <p className="text-3xl font-bold text-gray-900">{data.caseStudies.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-accent/30 transition-colors">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
            <Users size={20} />
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Khách hàng / Đối tác</h3>
          <p className="text-3xl font-bold text-gray-900">{data.clients.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-accent/30 transition-colors">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
            <Inbox size={20} />
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Yêu cầu liên hệ</h3>
          <p className="text-3xl font-bold text-gray-900">{data.crmEntries ? data.crmEntries.length : 0}</p>
        </div>
      </div>
    </div>
  );
}

function HeroEditor({ data, onSave }: { data: any, onSave: (d: any) => void }) {
  const [hero, setHero] = useState(data.hero);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Chỉnh sửa Hero Section</h2>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề chính</label>
          <input 
            type="text" 
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={hero.title}
            onChange={e => setHero({...hero, title: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề phụ</label>
          <input 
            type="text" 
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={hero.subtitle}
            onChange={e => setHero({...hero, subtitle: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Video nền (MP4)</label>
          <input 
            type="text" 
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={hero.videoUrl}
            onChange={e => setHero({...hero, videoUrl: e.target.value})}
          />
        </div>
      </div>
      <button 
        onClick={() => onSave({ ...data, hero })}
        className="bg-accent text-white px-6 py-2.5 rounded-md font-medium hover:bg-accent-light transition-colors"
      >
        Lưu thay đổi
      </button>
    </div>
  );
}

function AboutEditor({ data, onSave }: { data: any, onSave: (d: any) => void }) {
  const [about, setAbout] = useState(data.about);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Chỉnh sửa phần giới thiệu (Về Chúng Tôi)</h2>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung giới thiệu</label>
          <textarea 
            rows={8}
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none"
            value={about}
            onChange={e => setAbout(e.target.value)}
          />
        </div>
      </div>
      <button 
        onClick={() => onSave({ ...data, about })}
        className="bg-accent text-white px-6 py-2.5 rounded-md font-medium hover:bg-accent-light transition-colors"
      >
        Lưu thay đổi
      </button>
    </div>
  );
}
