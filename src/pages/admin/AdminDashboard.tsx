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
import AboutEditor from './AboutEditor';

function AdminLogin({ onLoginSuccess }: { onLoginSuccess: (token: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        onLoginSuccess(result.token);
      } else {
        setError(result.message || 'Sai tài khoản hoặc mật khẩu!');
      }
    } catch (err) {
      setError('Không thể kết nối với máy chủ quản trị. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 text-accent mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h1 className="text-2xl font-display font-semibold tracking-tight text-white">Quản trị Hệ thống</h1>
          <p className="text-slate-400 text-sm mt-2 font-light">Vui lòng đăng nhập để tiếp tục quản lý website</p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12" y1="16" y2="16"/></svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">Tài khoản</label>
            <input
              type="text"
              required
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-all"
              placeholder="Nhập tên đăng nhập..."
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">Mật khẩu</label>
            <input
              type="password"
              required
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-all"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent text-white hover:bg-accent-light font-medium py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? 'Đang xác thực...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
          <Link to="/" className="text-sm text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Quay lại trang chủ Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const location = useLocation();

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  const handleSave = async (newData: any) => {
    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newData)
    });
    if (res.status === 401) {
      alert('Phiên làm việc đã hết hạn hoặc không có quyền. Vui lòng đăng nhập lại!');
      localStorage.removeItem('admin_token');
      setToken(null);
      return;
    }
    const result = await res.json();
    setData(result.data);
    alert('Đã lưu thành công!');
  };

  if (!token) {
    return (
      <AdminLogin 
        onLoginSuccess={(newToken) => {
          localStorage.setItem('admin_token', newToken);
          setToken(newToken);
        }} 
      />
    );
  }

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
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button 
            type="button"
            onClick={() => {
              localStorage.removeItem('admin_token');
              setToken(null);
            }}
            className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-md text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-200 cursor-pointer"
          >
            <LogOut size={16} />
            Đăng xuất
          </button>
          <Link to="/" className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200">
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


