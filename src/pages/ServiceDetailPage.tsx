import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'motion/react';
import { defaultData } from '../lib/data';
import * as Icons from 'lucide-react';

export default function ServiceDetailPage() {
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

  const service = data.services.find((s: any) => s.id === id);
  const otherServices = data.services.filter((s: any) => s.id !== id);

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Không tìm thấy dịch vụ</h1>
          <Link to="/" className="text-accent hover:underline">Về trang chủ</Link>
        </div>
      </div>
    );
  }

  const IconComponent = (Icons as any)[service.icon] || Icons.Circle;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-accent selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8">
              <IconComponent className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gray-900 leading-tight">
              {service.headline || service.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {service.intro || service.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            
            {/* Why Need / Value / Intro extended */}
            {(service.whyNeed || service.value || service.benefits) && (
              <section>
                <h3 className="text-2xl font-display font-bold mb-6">Giá trị mang lại</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {service.whyNeed || service.value || service.benefits}
                </p>
              </section>
            )}

            {/* Packages for Marketing */}
            {service.packages && (
              <section>
                <h3 className="text-2xl font-display font-bold mb-8">Các Gói Dịch Vụ</h3>
                <div className="space-y-6">
                  {service.packages.map((pkg: any, idx: number) => (
                    <div key={idx} className="p-8 rounded-2xl bg-gray-50 border border-gray-200 hover:border-accent/30 transition-colors">
                      <h4 className="text-xl font-bold text-accent mb-2">{pkg.name}</h4>
                      <p className="text-gray-900 font-medium mb-4">Phù hợp: {pkg.suitableFor}</p>
                      <ul className="space-y-3 mb-6">
                        {pkg.features.map((f: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600">
                            <Icons.CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-gray-900 italic font-medium">"{pkg.message}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Activities / Services List */}
            {(service.activities || service.servicesList || service.platforms || service.eventTypes) && (
              <section>
                <h3 className="text-2xl font-display font-bold mb-6">Nền tảng & Hoạt động triển khai</h3>
                <div className="flex flex-wrap gap-3">
                  {(service.activities || service.servicesList || service.platforms || service.eventTypes).map((item: string, idx: number) => (
                    <span key={idx} className="px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-gray-900 font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Process */}
            {service.process && (
              <section>
                <h3 className="text-2xl font-display font-bold mb-8">Quy trình triển khai</h3>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                  {service.process.map((step: string, idx: number) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-accent text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                        {idx + 1}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white border border-gray-200 shadow-sm transition-shadow">
                        <h4 className="text-lg font-bold text-gray-900">{step}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Differentials */}
            {(service.diff || service.commitment) && (
              <section>
                <h3 className="text-2xl font-display font-bold mb-6">Điểm khác biệt / Cam kết</h3>
                <div className="p-6 bg-accent text-white rounded-2xl">
                  <p className="text-lg leading-relaxed font-medium">
                    {service.diff || service.commitment}
                  </p>
                </div>
              </section>
            )}

          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 p-8 rounded-3xl bg-gray-900 text-white shadow-xl">
              <h3 className="text-2xl font-display font-bold mb-4">Bạn cần tư vấn chi tiết?</h3>
              <p className="text-gray-400 mb-8">
                Để lại thông tin, các chuyên gia của chúng tôi sẽ liên hệ tư vấn giải pháp phù hợp nhất cho doanh nghiệp của bạn.
              </p>
              <Link to="/#contact" className="block w-full text-center bg-accent text-white py-4 rounded-full font-medium hover:bg-accent-light transition-colors">
                Nhận tư vấn ngay
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Other Services */}
      <div className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h3 className="text-3xl font-display font-bold mb-12 text-center text-gray-900">Các dịch vụ khác</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherServices.slice(0, 3).map((s: any) => {
              const SIcon = (Icons as any)[s.icon] || Icons.Circle;
              return (
                <Link to={`/services/${s.id}`} key={s.id} className="group p-8 rounded-3xl bg-white border border-gray-200 hover:border-accent/50 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-gray-50 group-hover:bg-accent pb-0 rounded-xl flex items-center justify-center mb-6 transition-colors">
                    <SIcon className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-accent transition-colors">{s.title}</h4>
                  <p className="text-gray-600 line-clamp-2">{s.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
