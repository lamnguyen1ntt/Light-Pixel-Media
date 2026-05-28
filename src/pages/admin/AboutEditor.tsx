import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Briefcase, Eye, Target, Shield, Settings } from 'lucide-react';

export default function AboutEditor({ data, onSave }: { data: any, onSave: (d: any) => void }) {
  const [about, setAbout] = useState<string>(data.about || '');
  const [aboutTitlePlain, setAboutTitlePlain] = useState<string>(data.aboutTitlePlain || 'Câu chuyện của');
  const [aboutTitleAccent, setAboutTitleAccent] = useState<string>(data.aboutTitleAccent || 'Light Pixel');
  const [aboutSections, setAboutSections] = useState<any[]>(data.aboutSections || []);

  const [aboutVmv, setAboutVmv] = useState<any>({
    title: data.aboutVmv?.title || 'Định hướng & Giá trị thương hiệu',
    subtitle: data.aboutVmv?.subtitle || 'TẦM NHÌN - SỨ MỆNH - GIÁ TRỊ CỐT LÕI',
    visionTitle: data.aboutVmv?.visionTitle || 'Tầm nhìn',
    visionDesc: data.aboutVmv?.visionDesc || 'Vươn mình trở thành biểu tượng dịch vụ truyền thông cao cấp hàng đầu, đồng hành nâng tầm giá trị cho mọi thương hiệu Việt vươn tầm thế giới.',
    missionTitle: data.aboutVmv?.missionTitle || 'Sứ mệnh',
    missionDesc: data.aboutVmv?.missionDesc || 'Cung cấp những giải pháp tiếp thị sáng tạo đổi mới, mang tính chiến lược chiều sâu và thúc đẩy hiệu quả kinh doanh vững bền.',
    valuesTitle: data.aboutVmv?.valuesTitle || 'Giá trị cốt lõi',
    valuesDesc: data.aboutVmv?.valuesDesc || 'Sáng tạo chuẩn premium, Cam kết hiệu quả đo lường được, và Đồng hành trung thực dựa trên triết lý win-win bền vững.'
  });

  const [process, setProcess] = useState<any>({
    subtitle: data.process?.subtitle || 'QUY TRÌNH LÀM VIỆC',
    title: data.process?.title || 'Cách chúng tôi tạo ra sự khác biệt',
    description: data.process?.description || 'Quy trình chuẩn hóa nhưng linh hoạt, đảm bảo mọi chiến dịch đều được thực thi với độ chính xác cao nhất và mang lại kết quả thực tế.',
    steps: data.process?.steps || [
      { num: '01', title: 'Nghiên cứu & Phân tích', desc: 'Thấu hiểu thị trường, nội tại doanh nghiệp và đối thủ cạnh tranh để xác định cơ hội phát triển cốt lõi.' },
      { num: '02', title: 'Lên chiến lược', desc: 'Thiết kế kế hoạch định hướng chi tiết, chọn lọc và phân bổ ngân sách vào các kênh truyền thông tối ưu.' },
      { num: '03', title: 'Thực thi & Sáng tạo', desc: 'Triển khai sản xuất nội dung, hình ảnh, video chất lượng premium đồng bộ với thông điệp thương hiệu.' },
      { num: '04', title: 'Đo lường & Tối ưu', desc: 'Theo dõi, đánh giá chỉ số hiệu quả liên tục để kịp thời tối ưu hóa tỷ lệ chuyển đổi và dòng tiền đầu tư.' }
    ]
  });

  const handleVmvChange = (field: string, value: string) => {
    setAboutVmv((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProcessChange = (field: string, value: string) => {
    setProcess((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProcessStepChange = (index: number, field: string, value: string) => {
    const updatedSteps = [...process.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setProcess((prev: any) => ({
      ...prev,
      steps: updatedSteps
    }));
  };

  const handleAddSection = () => {
    const newSection = {
      id: Date.now(),
      title: 'Tên Section Mới',
      p1: 'Nội dung dòng 1 hoặc đoạn 1...',
      p2: '',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
      imagePosition: 'right'
    };
    setAboutSections([...aboutSections, newSection]);
  };

  const handleRemoveSection = (index: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa section này không?')) {
      const newList = [...aboutSections];
      newList.splice(index, 1);
      setAboutSections(newList);
    }
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === aboutSections.length - 1) return;

    const newList = [...aboutSections];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    // Swap
    const temp = newList[index];
    newList[index] = newList[targetIdx];
    newList[targetIdx] = temp;

    setAboutSections(newList);
  };

  const handleSectionFieldChange = (index: number, field: string, value: any) => {
    const newList = [...aboutSections];
    newList[index] = { ...newList[index], [field]: value };
    setAboutSections(newList);
  };

  const handleSaveAll = () => {
    onSave({
      ...data,
      about,
      aboutTitlePlain,
      aboutTitleAccent,
      aboutVmv,
      process,
      aboutSections
    });
  };

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý trang Giới Thiệu (About Us)</h1>
          <p className="text-gray-500 text-sm mt-1">Tùy chỉnh tiêu đề, Tầm nhìn - Sứ mệnh, Quy trình làm việc và các câu chuyện thương hiệu</p>
        </div>
        <button
          onClick={handleSaveAll}
          className="bg-accent text-white px-6 py-2.5 rounded-xl font-medium hover:bg-accent-light transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <Settings size={18} />
          Lưu tất cả thay đổi
        </button>
      </div>

      {/* 1. Story Header Title & Intro (Red-boxed section) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span> 
          1. Phần Đầu Trang (Tiêu đề khoanh đỏ & Giới thiệu tổng quan)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Tiêu đề (Phần chữ thường)</label>
            <input
              type="text"
              value={aboutTitlePlain}
              onChange={(e) => setAboutTitlePlain(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-accent"
              placeholder="vd: Câu chuyện của"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Tiêu đề (Phần chữ xanh nổi bật)</label>
            <input
              type="text"
              value={aboutTitleAccent}
              onChange={(e) => setAboutTitleAccent(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-accent font-semibold text-accent"
              placeholder="vd: Light Pixel"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Đoạn văn giới thiệu tổng quan</label>
          <textarea
            rows={4}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-accent resize-none focus:ring-1 focus:ring-accent"
            placeholder="Nhập nội dung tóm tắt giới thiệu chung..."
          />
        </div>
      </div>

      {/* 2. Vision - Mission - Core Values Editor */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent rounded-full"></span> 
          2. Định hướng & Giá trị (Tầm nhìn - Sứ mệnh - Giá trị cốt lõi)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Tiêu đề Mục</label>
            <input
              type="text"
              value={aboutVmv.title}
              onChange={(e) => handleVmvChange('title', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Nhãn phụ (Subtitle)</label>
            <input
              type="text"
              value={aboutVmv.subtitle}
              onChange={(e) => handleVmvChange('subtitle', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Vision column */}
          <div className="border border-gray-100 p-5 rounded-2xl bg-slate-50/50 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 text-amber-600">
              <Eye size={18} />
              <input
                type="text"
                value={aboutVmv.visionTitle}
                onChange={(e) => handleVmvChange('visionTitle', e.target.value)}
                className="font-bold text-sm bg-transparent border-b border-transparent hover:border-gray-300 focus:border-amber-500 focus:outline-none text-gray-900 w-full"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Mô tả Tầm nhìn</label>
              <textarea
                rows={4}
                value={aboutVmv.visionDesc}
                onChange={(e) => handleVmvChange('visionDesc', e.target.value)}
                className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-accent resize-none"
              />
            </div>
          </div>

          {/* Mission column */}
          <div className="border border-gray-100 p-5 rounded-2xl bg-slate-50/50 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 text-red-500">
              <Target size={18} />
              <input
                type="text"
                value={aboutVmv.missionTitle}
                onChange={(e) => handleVmvChange('missionTitle', e.target.value)}
                className="font-bold text-sm bg-transparent border-b border-transparent hover:border-gray-300 focus:border-red-500 focus:outline-none text-gray-900 w-full"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Mô tả Sứ mệnh</label>
              <textarea
                rows={4}
                value={aboutVmv.missionDesc}
                onChange={(e) => handleVmvChange('missionDesc', e.target.value)}
                className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-accent resize-none"
              />
            </div>
          </div>

          {/* Core Values column */}
          <div className="border border-gray-100 p-5 rounded-2xl bg-slate-50/50 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 text-blue-500">
              <Shield size={18} />
              <input
                type="text"
                value={aboutVmv.valuesTitle}
                onChange={(e) => handleVmvChange('valuesTitle', e.target.value)}
                className="font-bold text-sm bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none text-gray-900 w-full"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Giá trị cốt lõi</label>
              <textarea
                rows={4}
                value={aboutVmv.valuesDesc}
                onChange={(e) => handleVmvChange('valuesDesc', e.target.value)}
                className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-accent resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quy trình làm việc (Process / Workflow section) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <Briefcase size={18} className="text-accent" />
          3. Chỉnh sửa Quy Trình Làm Việc
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Tiêu đề chính</label>
            <input
              type="text"
              value={process.title}
              onChange={(e) => handleProcessChange('title', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-accent"
              placeholder="vd: Cách chúng tôi tạo ra sự khác biệt"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Tiêu đề phụ (Subtitle)</label>
            <input
              type="text"
              value={process.subtitle}
              onChange={(e) => handleProcessChange('subtitle', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-accent font-medium text-accent"
              placeholder="vd: QUY TRÌNH LÀM VIỆC"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Mô tả quy trình</label>
          <textarea
            rows={2}
            value={process.description}
            onChange={(e) => handleProcessChange('description', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-accent resize-none"
            placeholder="Mô tả cụ thể về cam kết tuân thủ quy trình của agency..."
          />
        </div>

        {/* Edit workflow steps */}
        <div className="space-y-4 pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Các bước thực thi trong quy trình (4 khâu chính)</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {process.steps?.map((step: any, index: number) => (
              <div key={index} className="border border-gray-150 p-4 rounded-xl bg-gray-50/50 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-200/60 pb-2">
                  <span className="text-xs font-bold font-display text-accent bg-accent/10 px-2 py-0.5 rounded-md">Bước {step.num || `0${index + 1}`}</span>
                  <input
                    type="text"
                    value={step.num}
                    onChange={(e) => handleProcessStepChange(index, 'num', e.target.value)}
                    className="text-right text-xs bg-transparent border-none focus:outline-none font-bold text-gray-400 w-12"
                    title="Số thứ tự"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Tên bước</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => handleProcessStepChange(index, 'title', e.target.value)}
                    className="w-full border border-gray-200 bg-white rounded-xl px-3 py-1.5 text-xs text-gray-850 font-medium focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Chi tiết công việc</label>
                  <textarea
                    rows={2}
                    value={step.desc}
                    onChange={(e) => handleProcessStepChange(index, 'desc', e.target.value)}
                    className="w-full border border-gray-200 bg-white rounded-xl px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-accent resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Dynamic Sections Manager */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">4. Các khối câu chuyện & triết lý khác (Mục tùy biến)</h2>
            <p className="text-xs text-gray-500">Thêm, xóa và sắp xếp những section hiển thị dạng xen kẽ có hình ảnh kèm chữ</p>
          </div>
          <button
            onClick={handleAddSection}
            className="flex items-center justify-center gap-1.5 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
          >
            <Plus size={16} /> Thêm Section mới
          </button>
        </div>

        <div className="space-y-6">
          {aboutSections.map((section, index) => (
            <div key={section.id || index} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative group">
              {/* Toolbar */}
              <div className="absolute top-4 right-4 flex items-center gap-1 text-gray-600">
                <button
                  type="button"
                  onClick={() => handleMoveSection(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                  title="Di chuyển lên"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveSection(index, 'down')}
                  disabled={index === aboutSections.length - 1}
                  className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                  title="Di chuyển xuống"
                >
                  <ArrowDown size={16} />
                </button>
                <div className="w-px h-4 bg-gray-200 mx-1" />
                <button
                  type="button"
                  onClick={() => handleRemoveSection(index)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer"
                  title="Xóa section"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Form inside section */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
                {/* Left controls summary info */}
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Tiêu đề Section</label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => handleSectionFieldChange(index, 'title', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-accent"
                      placeholder="vd: Triết lý thiết kế & Vận hành"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Đoạn văn 1</label>
                    <textarea
                      rows={3}
                      value={section.p1}
                      onChange={(e) => handleSectionFieldChange(index, 'p1', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-accent resize-none"
                      placeholder="Nội dung văn bản chính..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Đoạn văn 2 (Tùy chọn)</label>
                    <textarea
                      rows={3}
                      value={section.p2 || ''}
                      onChange={(e) => handleSectionFieldChange(index, 'p2', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-accent resize-none"
                      placeholder="Bổ sung thêm một đoạn văn ngắn phía dưới nếu cần..."
                    />
                  </div>
                </div>

                {/* Right image + settings */}
                <div className="md:col-span-4 space-y-4 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 pt-4 md:pt-0">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Bố cục / Vị trí ảnh</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => handleSectionFieldChange(index, 'imagePosition', 'right')}
                        className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                          section.imagePosition === 'right'
                            ? 'bg-accent/10 border-accent/30 text-accent font-semibold'
                            : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
                        }`}
                      >
                        Ảnh bên Phải
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSectionFieldChange(index, 'imagePosition', 'left')}
                        className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                          section.imagePosition === 'left'
                            ? 'bg-accent/10 border-accent/30 text-accent font-semibold'
                            : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
                        }`}
                      >
                        Ảnh bên Trái
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">URL Hình ảnh</label>
                    <input
                      type="text"
                      value={section.imageUrl}
                      onChange={(e) => handleSectionFieldChange(index, 'imageUrl', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-accent"
                      placeholder="https://images.unsplash.com..."
                    />
                  </div>

                  <div className="aspect-video w-full bg-gray-50 border border-gray-150 rounded-xl overflow-hidden relative group">
                    {section.imageUrl ? (
                      <img src={section.imageUrl} alt="Review Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-1.5">
                        <ImageIcon size={20} />
                        <span className="text-xxs">Chưa có ảnh</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {aboutSections.length === 0 && (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl py-12 px-6 text-center text-gray-500">
              Chưa có section nào cho trang Về Chúng Tôi. Nhấp "Thêm Section mới" để tạo nội dung của bạn.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
