import React, { useState } from 'react';

export default function SettingsEditor({ data, onSave }: { data: any, onSave: (d: any) => void }) {
  const defaultBackgrounds = {
    hero: { url: '', opacity: 50, type: 'video' },
    about: { url: '', opacity: 20, type: 'image' },
    services: { url: '', opacity: 20, type: 'image' },
    process: { url: '', opacity: 20, type: 'image' },
    portfolio: { url: '', opacity: 20, type: 'image' },
    testimonials: { url: '', opacity: 20, type: 'image' },
    clients: { url: '', opacity: 20, type: 'image' },
    contact: { url: '', opacity: 20, type: 'image' },
  };

  const [backgrounds, setBackgrounds] = useState<any>(data.sectionBackgrounds || defaultBackgrounds);

  const handleUpdate = (sectionKey: string, field: string, value: any) => {
    setBackgrounds((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey] || { url: '', opacity: 20, type: 'image' }),
        [field]: value
      }
    }));
  };

  const sections = [
    { key: 'hero', label: 'Hero (Trang chủ)' },
    { key: 'about', label: 'Về chúng tôi (About)' },
    { key: 'services', label: 'Dịch vụ' },
    { key: 'process', label: 'Quy trình' },
    { key: 'portfolio', label: 'Dự án (Portfolio)' },
    { key: 'testimonials', label: 'Cảm nhận khách hàng' },
    { key: 'clients', label: 'Đối tác' },
    { key: 'contact', label: 'Liên hệ' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Cài đặt ảnh nền các trang</h2>
        <button 
          onClick={() => onSave({ ...data, sectionBackgrounds: backgrounds })}
          className="bg-accent text-white px-6 py-2.5 rounded-md font-medium hover:bg-accent-light transition-colors"
        >
          Lưu cài đặt
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map(({ key, label }) => {
          const config = backgrounds[key] || { url: '', opacity: 20, type: 'image' };
          
          return (
            <div key={key} className="border border-gray-200 rounded-lg p-5 bg-gray-50/50">
              <h3 className="font-bold text-gray-900 mb-4">{label}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Loại Nền</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                    value={config.type}
                    onChange={(e) => handleUpdate(key, 'type', e.target.value)}
                  >
                    <option value="image">Hình ảnh</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">URL (Ảnh / Video)</label>
                  <input 
                    type="text" 
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                    value={config.url}
                    onChange={(e) => handleUpdate(key, 'url', e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-gray-700">Độ mờ (Opacity %)</label>
                    <span className="text-xs font-bold text-accent">{config.opacity}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="5"
                    className="w-full accent-accent"
                    value={config.opacity}
                    onChange={(e) => handleUpdate(key, 'opacity', parseInt(e.target.value))}
                  />
                  <p className="text-[10px] text-gray-500 mt-1">Kéo để điều chỉnh độ mờ của hình nền (0 = trong suốt, 100 = rõ hoàn toàn).</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
