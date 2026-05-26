import React, { useState } from 'react';
import { Plus, Trash2, Save, Image as ImageIcon } from 'lucide-react';

export default function PortfolioEditor({ data, onSave }: { data: any, onSave: (d: any) => void }) {
  const [items, setItems] = useState<any[]>(data.caseStudies || []);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  const handleUpdate = (field: string, value: any) => {
    if (selectedIndex === null) return;
    const newItems = [...items];
    newItems[selectedIndex] = { ...newItems[selectedIndex], [field]: value };
    setItems(newItems);
  };

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      title: 'Dự án mới',
      category: 'Digital',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    };
    setItems([...items, newItem]);
    setSelectedIndex(items.length);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    setSelectedIndex(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex h-[600px] overflow-hidden">
      {/* List */}
      <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/50">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="font-bold text-gray-900">Danh sách Dự án</h2>
          <button onClick={handleAdd} className="p-2 bg-accent text-white rounded-md hover:bg-accent-light">
            <Plus size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {items.map((item, index) => (
            <div 
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className={`p-3 mb-2 rounded-md cursor-pointer border flex justify-between items-center group transition-colors ${selectedIndex === index ? 'bg-accent/10 border-accent/20' : 'bg-white border-transparent hover:border-gray-200 shadow-sm'}`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-full h-full p-2 text-gray-400" />
                  )}
                </div>
                <div className="font-medium text-gray-900 text-sm truncate">{item.title}</div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleRemove(index); }} 
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100 bg-white">
          <button 
            onClick={() => onSave({ ...data, caseStudies: items })}
            className="w-full flex justify-center items-center gap-2 bg-accent text-white px-4 py-2 rounded-md font-medium hover:bg-accent-light"
          >
            <Save size={16} /> Lưu tất cả
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="w-2/3 flex flex-col bg-white">
        {selectedItem ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Chi tiết Dự án</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên dự án</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={selectedItem.title}
                  onChange={e => handleUpdate('title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục (Category)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={selectedItem.category}
                  onChange={e => handleUpdate('category', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh đại diện (URL)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={selectedItem.imageUrl}
                  onChange={e => handleUpdate('imageUrl', e.target.value)}
                />
                {selectedItem.imageUrl && (
                  <div className="mt-3 aspect-video w-full max-w-sm rounded-lg overflow-hidden border border-gray-200">
                    <img src={selectedItem.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">
            Chọn một dự án để chỉnh sửa
          </div>
        )}
      </div>
    </div>
  );
}
