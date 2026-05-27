import React from 'react';
import { Mail, Phone, Clock, User } from 'lucide-react';

export default function CRMEditor({ data }: { data: any }) {
  const crmEntries = data.crmEntries || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Khách hàng liên hệ (CRM)</h2>
        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
          {crmEntries.length} khách hàng
        </span>
      </div>

      <div className="space-y-4">
        {crmEntries.length === 0 ? (
          <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
            Chưa có khách hàng nào liên hệ.
          </div>
        ) : (
          crmEntries.map((entry: any, index: number) => (
            <div key={entry.id || index} className="border border-gray-200 rounded-lg p-5 bg-gray-50/50 hover:bg-white transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{entry.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Mail size={14} /> {entry.email}</span>
                      <span className="flex items-center gap-1"><Phone size={14} /> {entry.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={14} />
                  {new Date(entry.createdAt).toLocaleString('vi-VN')}
                </div>
              </div>
              <div className="bg-white p-4 rounded-md border border-gray-100 mt-3 text-gray-700 text-sm whitespace-pre-wrap">
                {entry.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
