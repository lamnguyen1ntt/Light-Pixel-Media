import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function TestimonialsEditor({ data, onSave }: { data: any, onSave: (d: any) => void }) {
  const [testimonials, setTestimonials] = useState<any[]>(data.testimonials || []);

  const handleAdd = () => {
    setTestimonials([...testimonials, { quote: '', author: '', role: '', avatar: '' }]);
  };

  const handleRemove = (index: number) => {
    const newItems = [...testimonials];
    newItems.splice(index, 1);
    setTestimonials(newItems);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const newItems = [...testimonials];
    newItems[index] = { ...newItems[index], [field]: value };
    setTestimonials(newItems);
  };

  const handleSave = () => {
    onSave({ ...data, testimonials });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Quản lý nhận xét của khách hàng</h2>
        <div className="flex gap-2">
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
          >
            <Plus size={16} /> Thêm nhận xét
          </button>
          <button 
            onClick={handleSave}
            className="bg-accent text-white px-6 py-2 rounded-md font-medium hover:bg-accent-light transition-colors"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {testimonials.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-5 flex gap-4 bg-gray-50/50 relative">
            <button 
              onClick={() => handleRemove(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-md"
              title="Xóa nhận xét"
            >
              <Trash2 size={16} />
            </button>
            <div className="w-24 h-24 shrink-0 bg-gray-200 rounded-full border border-gray-300 overflow-hidden">
              {item.avatar ? (
                <img src={item.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
              )}
            </div>
            
            <div className="flex-1 space-y-4 pt-1 pr-12">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nội dung nhận xét</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                  value={item.quote}
                  onChange={(e) => handleChange(index, 'quote', e.target.value)}
                  rows={3}
                  placeholder="Nhập nội dung nhận xét..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Tên khách hàng</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                    value={item.author}
                    onChange={(e) => handleChange(index, 'author', e.target.value)}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Chức vụ / Công ty</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                    value={item.role}
                    onChange={(e) => handleChange(index, 'role', e.target.value)}
                    placeholder="CEO, Công ty XYZ"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">URL Ảnh đại diện</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                  value={item.avatar}
                  onChange={(e) => handleChange(index, 'avatar', e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
            Chưa có nhận xét nào. Nhấn "Thêm nhận xét" để bắt đầu.
          </div>
        )}
      </div>
    </div>
  );
}
