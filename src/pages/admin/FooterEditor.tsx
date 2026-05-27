import React, { useState } from 'react';

export default function FooterEditor({ data, onSave }: { data: any, onSave: (d: any) => void }) {
  const [footer, setFooter] = useState<any>(data.footer || {
    description: "",
    social: { facebook: "", instagram: "", linkedin: "" },
    services: [],
    info: [],
    contact: { address: "", phone: "", email: "" },
    copyright: "",
    privacyUrl: "",
    termsUrl: ""
  });

  const handleSave = () => {
    onSave({ ...data, footer });
  };

  const updateFooter = (key: string, value: any) => {
    setFooter((prev: any) => ({ ...prev, [key]: value }));
  };

  const updateNested = (category: string, key: string, value: any) => {
    setFooter((prev: any) => ({
      ...prev,
      [category]: { ...prev[category], [key]: value }
    }));
  };

  const updateLink = (category: 'services' | 'info', index: number, field: string, value: string) => {
    const list = [...(footer[category] || [])];
    list[index] = { ...list[index], [field]: value };
    updateFooter(category, list);
  };

  const addLink = (category: 'services' | 'info') => {
    const list = [...(footer[category] || []), { label: '', path: '' }];
    updateFooter(category, list);
  };

  const removeLink = (category: 'services' | 'info', index: number) => {
    const list = [...(footer[category] || [])];
    list.splice(index, 1);
    updateFooter(category, list);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Quản lý Footer (Chân trang)</h2>
        <button 
          onClick={handleSave}
          className="bg-accent text-white px-6 py-2 rounded-md font-medium hover:bg-accent-light transition-colors"
        >
          Lưu thay đổi
        </button>
      </div>

      <div className="space-y-8">
        {/* Thông tin chung */}
        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/50">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Thông tin chung</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
              <textarea 
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                value={footer.description}
                onChange={(e) => updateFooter('description', e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bản quyền (Copyright)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                  value={footer.copyright}
                  onChange={(e) => updateFooter('copyright', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link C.sách Bảo mật</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                    value={footer.privacyUrl}
                    onChange={(e) => updateFooter('privacyUrl', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Đ.khoản SD</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                    value={footer.termsUrl}
                    onChange={(e) => updateFooter('termsUrl', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liên hệ */}
        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/50">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Thông tin liên lạc</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ (Address)</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                value={footer.contact?.address || ''}
                onChange={(e) => updateNested('contact', 'address', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                value={footer.contact?.phone || ''}
                onChange={(e) => updateNested('contact', 'phone', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                value={footer.contact?.email || ''}
                onChange={(e) => updateNested('contact', 'email', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Mạng xã hội */}
        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/50">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Mạng xã hội (URLs)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <input 
                type="url" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                value={footer.social?.facebook || ''}
                onChange={(e) => updateNested('social', 'facebook', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <input 
                type="url" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                value={footer.social?.instagram || ''}
                onChange={(e) => updateNested('social', 'instagram', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
              <input 
                type="url" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                value={footer.social?.linkedin || ''}
                onChange={(e) => updateNested('social', 'linkedin', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Danh sách dịch vụ */}
        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Danh sách Dịch vụ</h3>
            <button onClick={() => addLink('services')} className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">
              + Thêm dịch vụ
            </button>
          </div>
          <div className="space-y-3">
            {(footer.services || []).map((link: any, idx: number) => (
              <div key={idx} className="flex gap-4">
                <input 
                  type="text" placeholder="Tên hiển thị (vd: Marketing thuê ngoài)" 
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent"
                  value={link.label} onChange={(e) => updateLink('services', idx, 'label', e.target.value)}
                />
                <input 
                  type="text" placeholder="Đường dẫn (vd: /services)" 
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent"
                  value={link.path} onChange={(e) => updateLink('services', idx, 'path', e.target.value)}
                />
                <button onClick={() => removeLink('services', idx)} className="text-red-500 hover:text-red-700 px-2 font-bold">X</button>
              </div>
            ))}
          </div>
        </div>

        {/* Danh sách thông tin */}
        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Danh sách Thông tin</h3>
            <button onClick={() => addLink('info')} className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">
              + Thêm link
            </button>
          </div>
          <div className="space-y-3">
            {(footer.info || []).map((link: any, idx: number) => (
              <div key={idx} className="flex gap-4">
                <input 
                  type="text" placeholder="Tên hiển thị (vd: Về chúng tôi)" 
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent"
                  value={link.label} onChange={(e) => updateLink('info', idx, 'label', e.target.value)}
                />
                <input 
                  type="text" placeholder="Đường dẫn (vd: /about)" 
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent"
                  value={link.path} onChange={(e) => updateLink('info', idx, 'path', e.target.value)}
                />
                <button onClick={() => removeLink('info', idx)} className="text-red-500 hover:text-red-700 px-2 font-bold">X</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
