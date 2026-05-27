import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'motion/react';
import { defaultData } from '../lib/data';
import { ArrowLeft, Calendar, FileText, Briefcase, User, Award, Tag } from 'lucide-react';

export default function PortfolioDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(d => setData(d))
      .catch(err => setData(defaultData));
    
    window.scrollTo(0, 0);
  }, [id]);

  if (!data) return <div className="min-h-screen bg-white" />;

  const project = data.caseStudies.find((s: any) => s.id.toString() === id);
  const otherProjects = data.caseStudies.filter((s: any) => s.id.toString() !== id).slice(0, 3);

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Không tìm thấy dự án</h1>
          <Link to="/portfolio" className="text-accent hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Về danh sách dự án
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-accent selection:text-white">
      <Navbar />
      
      {/* Cover Hero Banner */}
      <div className="relative pt-32 pb-48 md:py-48 overflow-hidden bg-gray-900">
        {project.imageUrl && (
          <div className="absolute inset-0 z-0">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-25 filter blur-xs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-gray-900/80 to-gray-900" />
          </div>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 header-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-light mb-6 transition-colors"
            >
              <ArrowLeft size={16} /> Danh sách dự án
            </Link>
            <span className="text-xs font-semibold text-accent uppercase tracking-widest bg-accent/10 px-3 py-1.5 rounded-full block w-fit mb-4">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-medium text-gray-900 leading-tight tracking-tight mb-6">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Main Content Info */}
      <div className="-mt-24 pb-32 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left Area: Description and Rich HTML Story */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Visual Preview */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50"
            >
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            </motion.div>

            {/* Introduction block */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl space-y-6">
              <h3 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2">
                <FileText className="text-accent" size={24} /> Giới thiệu dự án
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap font-light">
                {project.introduction || "Dự án tiêu biểu thể hiện năng lực sáng tạo và mức độ chi tiết trong khâu vận hành, đem lại thành công rực rỡ vượt qua KPI kỳ vọng cho khách hàng."}
              </p>
            </div>

            {/* WordPress Rich Content block */}
            {project.richContent ? (
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl space-y-6">
                <style dangerouslySetInnerHTML={{__html: `
                  .wp-rich h1 { font-family: var(--font-font-sans); font-size: 2.25rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: #111827; }
                  .wp-rich h2 { font-family: var(--font-font-sans); font-size: 1.875rem; font-weight: 700; margin-top: 2.25rem; margin-bottom: 1rem; color: #111827; border-left: 4px solid var(--color-accent); padding-left: 0.75rem; }
                  .wp-rich h3 { font-family: var(--font-font-sans); font-size: 1.5rem; font-weight: 700; margin-top: 1.75rem; margin-bottom: 0.75rem; color: #111827; }
                  .wp-rich p { margin-bottom: 1.25rem; line-height: 1.8; color: #4B5563; font-size: 1.05rem; }
                  .wp-rich ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; color: #4B5563; }
                  .wp-rich ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; color: #4B5563; }
                  .wp-rich li { margin-bottom: 0.5rem; }
                  .wp-rich a { color: #0066FF; text-decoration: underline; }
                  .wp-rich img { max-width: 100%; height: auto; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); }
                  .wp-rich blockquote { border-left: 4px solid #E5E7EB; padding-left: 1.25rem; margin: 1.5rem 0; font-style: italic; color: #6B7280; font-size: 1.1rem; }
                  .wp-rich strong { font-weight: 700; color: #111827; }
                `}} />
                <h3 className="text-2xl font-display font-bold text-gray-900 pb-4 border-b">Chi tiết câu chuyện dự án</h3>
                <div 
                  className="wp-rich"
                  dangerouslySetInnerHTML={{ __html: project.richContent }} 
                />
              </div>
            ) : (
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl py-12 text-center text-gray-500 italic">
                Nội dung chi tiết dự án đang được cập nhật bởi quản trị viên.
              </div>
            )}

          </div>

          {/* Right Area: Metadata / Sticky sidebar */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Project Info Panel */}
            <div className="bg-gray-900 border border-white/5 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-lg font-bold tracking-wider uppercase text-gray-400 mb-6 flex items-center gap-2">
                <Award size={18} className="text-accent" /> Thông tin dự án
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4 border-b border-white/5 pb-4">
                  <User className="text-accent shrink-0 mt-1" size={20} />
                  <div>
                    <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Khách hàng</span>
                    <span className="font-semibold text-white text-sm md:text-base">
                      {project.client || "Đối tác / Doanh nghiệp ẩn tên"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 border-b border-white/5 pb-4">
                  <Briefcase className="text-accent shrink-0 mt-1" size={20} />
                  <div>
                    <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Dịch vụ</span>
                    <span className="font-semibold text-white text-sm md:text-base">
                      {project.service || "Giải pháp truyền thông trọn gói"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 border-b border-white/5 pb-4">
                  <Calendar className="text-accent shrink-0 mt-1" size={20} />
                  <div>
                    <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Thời gian</span>
                    <span className="font-semibold text-white text-sm md:text-base">
                      {project.year || "Năm 2026"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 border-b border-white/5 pb-4">
                  <Award className="text-accent shrink-0 mt-1" size={20} />
                  <div>
                    <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Vai trò</span>
                    <span className="font-semibold text-white text-sm md:text-base">
                      {project.role || "Tư vấn & Thực thi chiến dịch"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Tag className="text-accent shrink-0 mt-1" size={20} />
                  <div>
                    <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Hạt nhân / Mục</span>
                    <span className="font-semibold text-white text-sm md:text-base">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Projects Panel */}
            {otherProjects.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-3">Dự án khác</h3>
                <div className="space-y-6">
                  {otherProjects.map((p: any) => (
                    <Link 
                      key={p.id} 
                      to={`/portfolio/${p.id}`} 
                      className="flex items-center gap-4 group cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                        <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-1">
                          {p.category}
                        </span>
                        <h4 className="font-bold text-gray-900 text-sm group-hover:text-accent transition-colors truncate">
                          {p.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      <Footer data={data.footer} />
    </div>
  );
}
