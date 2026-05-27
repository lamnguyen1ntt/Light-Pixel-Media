import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function ServicesEditor({ data, onSave }: { data: any, onSave: (d: any) => void }) {
  const [services, setServices] = useState<any[]>(data.services || []);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedService = selectedIndex !== null ? services[selectedIndex] : null;

  const handleUpdate = (field: string, value: any) => {
    if (selectedIndex === null) return;
    const newServices = [...services];
    newServices[selectedIndex] = { ...newServices[selectedIndex], [field]: value };
    setServices(newServices);
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }]
    ]
  };

  const handleAdd = () => {
    const newService = {
      id: `service-${Date.now()}`,
      title: 'Dịch vụ mới',
      description: '',
      icon: 'briefcase',
    };
    setServices([...services, newService]);
    setSelectedIndex(services.length);
  };

  const handleRemove = (index: number) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
    setSelectedIndex(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex h-[600px] overflow-hidden">
      {/* List */}
      <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/50">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="font-bold text-gray-900">Danh sách Dịch vụ</h2>
          <button onClick={handleAdd} className="p-2 bg-accent text-white rounded-md hover:bg-accent-light">
            <Plus size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {services.map((svc, index) => (
            <div 
              key={svc.id}
              onClick={() => setSelectedIndex(index)}
              className={`p-3 mb-2 rounded-md cursor-pointer border flex justify-between items-center group transition-colors ${selectedIndex === index ? 'bg-accent/10 border-accent/20' : 'bg-white border-transparent hover:border-gray-200 shadow-sm'}`}
            >
              <div>
                <div className="font-medium text-gray-900 text-sm truncate">{svc.title}</div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); handleRemove(index); }} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100 bg-white">
          <button 
            onClick={() => onSave({ ...data, services })}
            className="w-full flex justify-center items-center gap-2 bg-accent text-white px-4 py-2 rounded-md font-medium hover:bg-accent-light"
          >
            <Save size={16} /> Lưu tất cả
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="w-2/3 flex flex-col bg-white">
        {selectedService ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">Chỉnh sửa chi tiết</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID (Đường dẫn tĩnh)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                  value={selectedService.id}
                  onChange={e => handleUpdate('id', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên dịch vụ</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={selectedService.title}
                  onChange={e => handleUpdate('title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cụm từ mô tả ngắn (Trang chủ)</label>
                <textarea 
                  rows={2}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none"
                  value={selectedService.description}
                  onChange={e => handleUpdate('description', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Headline (Trang chi tiết)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={selectedService.headline || ''}
                  onChange={e => handleUpdate('headline', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Intro (Đoạn giới thiệu lớn)</label>
                <textarea 
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none"
                  value={selectedService.intro || ''}
                  onChange={e => handleUpdate('intro', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tại sao cần dịch vụ này? (WhyNeed)</label>
                <textarea 
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none"
                  value={selectedService.whyNeed || ''}
                  onChange={e => handleUpdate('whyNeed', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sự khác biệt (Diff)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={selectedService.diff || ''}
                  onChange={e => handleUpdate('diff', e.target.value)}
                />
              </div>
              <div className="pt-4 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bài viết chi tiết (Như WordPress)</label>
                <div className="bg-white">
                  <ReactQuill 
                    theme="snow" 
                    value={selectedService.richContent || ''} 
                    onChange={(content: string) => handleUpdate('richContent', content)} 
                    modules={quillModules}
                    className="h-96 pb-12"
                  />
                </div>
              </div>
              <div className="pt-4 border-t mt-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">Các Gói Dịch Vụ</label>
                  <button 
                    onClick={() => {
                      const newPkgs = [...(selectedService.packages || [])];
                      newPkgs.push({ name: 'Gói mới', subtitle: '', features: ['Tính năng 1'], benefit: '' });
                      handleUpdate('packages', newPkgs);
                    }}
                    className="text-sm bg-accent text-white px-2 py-1 flex items-center gap-1 rounded"
                  >
                    <Plus size={14} /> Thêm gói
                  </button>
                </div>
                
                <div className="space-y-4">
                  {(selectedService.packages || []).map((pkg: any, pIndex: number) => (
                    <div key={pIndex} className="p-4 border border-gray-200 rounded bg-gray-50 relative">
                      <button 
                        onClick={() => {
                          const newPkgs = (selectedService.packages || []).filter((_: any, i: number) => i !== pIndex);
                          handleUpdate('packages', newPkgs);
                        }}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                      
                      <div className="space-y-3 mt-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Tên gói</label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                            value={pkg.name || ''}
                            onChange={(e) => {
                              const newPkgs = [...(selectedService.packages || [])];
                              newPkgs[pIndex] = { ...newPkgs[pIndex], name: e.target.value };
                              handleUpdate('packages', newPkgs);
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Mô tả ngắn (Subtitle)</label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                            value={pkg.subtitle || ''}
                            onChange={(e) => {
                              const newPkgs = [...(selectedService.packages || [])];
                              newPkgs[pIndex] = { ...newPkgs[pIndex], subtitle: e.target.value };
                              handleUpdate('packages', newPkgs);
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1 flex justify-between">
                            <span>Các tính năng (mỗi dòng 1 tính năng)</span>
                          </label>
                          <textarea 
                            rows={4}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white resize-none"
                            value={(pkg.features || []).join('\n')}
                            onChange={(e) => {
                              const newPkgs = [...(selectedService.packages || [])];
                              newPkgs[pIndex] = { ...newPkgs[pIndex], features: e.target.value.split('\n') };
                              handleUpdate('packages', newPkgs);
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Lợi ích (Benefit)</label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                            value={pkg.benefit || ''}
                            onChange={(e) => {
                              const newPkgs = [...(selectedService.packages || [])];
                              newPkgs[pIndex] = { ...newPkgs[pIndex], benefit: e.target.value };
                              handleUpdate('packages', newPkgs);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!selectedService.packages || selectedService.packages.length === 0) && (
                    <div className="text-sm text-gray-500 italic p-4 text-center border border-dashed rounded">
                      Chưa có gói dịch vụ nào
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">
            Chọn một dịch vụ để chỉnh sửa
          </div>
        )}
      </div>
    </div>
  );
}
