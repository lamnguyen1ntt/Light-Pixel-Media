import React, { useState } from 'react';
import { Plus, Trash2, Save, Image as ImageIcon } from 'lucide-react';

export default function ClientsEditor({ data, onSave }: { data: any, onSave: (d: any) => void }) {
  const [items, setItems] = useState<any[]>(data.clients || []);
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
      name: 'Tên đối tác',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
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
          <h2 className="font-bold text-gray-900">Đối tác & Khách hàng</h2>
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
                <div className="w-10 h-10 rounded-md overflow-hidden bg-white border border-gray-100 flex-shrink-0 p-1 flex items-center justify-center">
                  {item.logoUrl ? (
                    <img src={item.logoUrl} alt={item.name} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <ImageIcon className="w-full h-full p-2 text-gray-400" />
                  )}
                </div>
                <div className="font-medium text-gray-900 text-sm truncate">{item.name}</div>
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
            onClick={() => onSave({ ...data, clients: items })}
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
              <h3 className="text-lg font-semibold text-gray-900">Chi tiết Đối tác</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên đối tác</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={selectedItem.name}
                  onChange={e => handleUpdate('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL (Nên dùng định dạng SVG hoặc PNG trong suốt)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={selectedItem.logoUrl}
                  onChange={e => handleUpdate('logoUrl', e.target.value)}
                />
                {selectedItem.logoUrl && (
                  <div className="mt-4 p-6 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 checkerboard-bg">
                    <img src={selectedItem.logoUrl} alt="Preview" className="max-h-24 max-w-full" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">
            Chọn một đối tác để chỉnh sửa
          </div>
        )}
      </div>
    </div>
  );
}
