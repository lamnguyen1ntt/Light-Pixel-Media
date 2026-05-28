import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

// Mock Database
let siteData = {
  hero: {
    title: "Giải pháp truyền thông toàn diện",
    subtitle: "Nâng tầm thương hiệu của bạn với Light Pixel Media",
    videoUrl: "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4",
  },
  services: [
    { 
      id: "marketing-thue-ngoai", 
      title: "Marketing thuê ngoài cho SME", 
      description: "Giải pháp marketing trọn gói tối ưu chi phí.", 
      icon: "briefcase",
      headline: "Xây dựng đội ngũ marketing mà không cần tuyển cả phòng ban.",
      intro: "Dịch vụ Marketing thuê ngoài trọn gói được thiết kế dành riêng cho SME, cửa hàng, hợp tác xã và các doanh nghiệp chưa có đội ngũ in-house. Chúng tôi mang đến giải pháp marketing linh hoạt cho SME hiện đại, giúp bạn từ chiến lược đến triển khai thực chiến.",
      whyNeed: "Thay vì chi trả lương cố định cao, thuê ngoài một Agency giúp bạn sở hữu ngay một đội ngũ chuyên gia giàu kinh nghiệm.",
      packages: [
        {
          name: "GÓI BASIC – KHỞI ĐỘNG THƯƠNG HIỆU",
          suitableFor: "Cửa hàng nhỏ, startup, SME",
          features: ["Quản lý fanpage", "Thiết kế bài đăng cơ bản", "Viết content & Đăng bài định kỳ"],
          message: "Tiết kiệm chi phí. Có đội ngũ triển khai ngay."
        }
      ],
      process: ["Nghiên cứu & Đánh giá", "Lập kế hoạch chiến lược"],
      diff: "Quy trình thực chiến, báo cáo minh bạch"
    },
    { id: "truyen-thong-da-nen-tang", title: "Truyền thông đa nền tảng", description: "Phủ sóng thương hiệu trên mọi điểm chạm.", icon: "share2" },
    { id: "media-production", title: "Media Production", description: "Sản xuất hình ảnh, video chất lượng cao.", icon: "video" },
    { id: "to-chuc-su-kien", title: "Tổ chức sự kiện", description: "Tổ chức sự kiện chuyên nghiệp, ấn tượng.", icon: "calendar" },
    { id: "trade-marketing", title: "Trade Marketing", description: "Thúc đẩy doanh số tại điểm bán hiệu quả.", icon: "shopping-cart" },
    { id: "xuc-tien-thuong-mai", title: "Xúc tiến thương mại", description: "Kết nối giao thương, mở rộng thị trường.", icon: "globe" },
  ],
  caseStudies: [
    { id: 1, title: "Chiến dịch Web Portal", category: "Digital", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
    { id: 2, title: "Launch Event Thương hiệu Y", category: "Event", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" },
    { id: 3, title: "Viral Video Marketing Z", category: "Media", imageUrl: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&q=80&w=800" },
    { id: 4, title: "Rebranding Doanh nghiệp SME", category: "Branding", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
  ],
  clients: [
    { id: 1, name: "Tech Corp", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { id: 2, name: "Global Bank", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { id: 3, name: "Retail Pro", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { id: 4, name: "F&B Chain", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" },
    { id: 5, name: "Health Care", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" }
  ],
  crmEntries: [],
  testimonials: [
    {
      quote: "Toàn Cầu Media đã giúp chúng tôi tái định vị hoàn toàn thương hiệu trên nền tảng số. Đội ngũ chuyên nghiệp, sáng tạo và luôn bám sát mục tiêu kinh doanh.",
      author: "Nguyễn Văn A",
      role: "CEO, TechViet",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "Một agency hiếm hoi thực sự hiểu về SMEs. Các chiến dịch thực thi sắc bén, hình ảnh visual ấn tượng và quan trọng nhất là chi phí tối ưu so với hiệu quả mang lại.",
      author: "Trần Thị B",
      role: "Marketing Director, F&B Chain",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    }
  ],
  about: "Chúng tôi là Light Pixel Media - Agency cung cấp giải pháp truyền thông sáng tạo, đột phá dành cho các doanh nghiệp, góp phần định vị vị thế vững chắc của bạn trên thị trường số.",
  aboutTitlePlain: "Câu chuyện của",
  aboutTitleAccent: "Light Pixel",
  aboutVmv: {
    title: "Định hướng & Giá trị thương hiệu",
    subtitle: "TẦM NHÌN - SỨ MỆNH - GIÁ TRỊ CỐT LÕI",
    visionTitle: "Tầm nhìn",
    visionDesc: "Vươn mình trở thành biểu tượng dịch vụ truyền thông cao cấp hàng đầu, đồng hành nâng tầm giá trị cho mọi thương hiệu Việt vươn tầm thế giới.",
    missionTitle: "Sứ mệnh",
    missionDesc: "Cung cấp những giải pháp tiếp thị sáng tạo đổi mới, mang tính chiến lược chiều sâu và thúc đẩy hiệu quả kinh doanh vững bền.",
    valuesTitle: "Giá trị cốt lõi",
    valuesDesc: "Sáng tạo chuẩn premium, Cam kết hiệu quả đo lường được, và Đồng hành trung thực dựa trên triết lý win-win bền vững."
  },
  process: {
    subtitle: "QUY TRÌNH LÀM VIỆC",
    title: "Cách chúng tôi tạo ra sự khác biệt",
    description: "Quy trình chuẩn hóa nhưng linh hoạt, đảm bảo mọi chiến dịch đều được thực thi với độ chính xác cao nhất và mang lại kết quả thực tế.",
    steps: [
      { num: "01", title: "Nghiên cứu & Phân tích", desc: "Thấu hiểu thị trường, nội tại doanh nghiệp và đối thủ cạnh tranh để xác định cơ hội phát triển cốt lõi." },
      { num: "02", title: "Lên chiến lược", desc: "Thiết kế kế hoạch định hướng chi tiết, chọn lọc và phân bổ ngân sách vào các kênh truyền thông tối ưu." },
      { num: "03", title: "Thực thi & Sáng tạo", desc: "Triển khai sản xuất nội dung, hình ảnh, video chất lượng premium đồng bộ với thông điệp thương hiệu." },
      { num: "04", title: "Đo lường & Tối ưu", desc: "Theo dõi, đánh giá chỉ số hiệu quả liên tục để kịp thời tối ưu hóa tỷ lệ chuyển đổi và dòng tiền đầu tư." }
    ]
  },
  aboutSections: [
    {
      id: 1,
      title: "Triết lý thiết kế & Vận hành",
      p1: "Tại Light Pixel Media, chúng tôi tin rằng truyền thông không chỉ là công cụ để đo lường chuyển đổi, mà còn là bản sắc để một thương hiệu có thể sống lâu dài trong tâm trí khách hàng.",
      p2: "Chúng tôi luôn xây dựng nội dung có chiều sâu, kết hợp cùng hình ảnh thẩm mỹ theo phong cách premium corporate, giúp đối tác không chỉ gia tăng doanh số mà còn khẳng định vị thế dẫn đầu trong ngành.",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
      imagePosition: "right"
    }
  ],
  footer: {
    description: "Creative Agency hàng đầu cung cấp giải pháp truyền thông, marketing và tổ chức sự kiện toàn diện cho doanh nghiệp.",
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    },
    services: [
      { label: "Marketing thuê ngoài", path: "/services" },
      { label: "Truyền thông đa nền tảng", path: "/services" },
      { label: "Media Production", path: "/services" },
      { label: "Tổ chức sự kiện", path: "/services" }
    ],
    info: [
      { label: "Về chúng tôi", path: "/about" },
      { label: "Dự án tiêu biểu", path: "/portfolio" },
      { label: "Quy trình làm việc", path: "/" },
      { label: "Tuyển dụng", path: "/" }
    ],
    contact: {
      address: "Tòa nhà Innovation, Phường ABC, Quận XYZ, TP. Hà Nội",
      phone: "090 123 4567",
      email: "hello@lightpixel.vn"
    },
    copyright: "© 2026 Light Pixel Media. All rights reserved.",
    privacyUrl: "#",
    termsUrl: "#"
  }
};

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const expectedUser = process.env.ADMIN_USER || "admin";
    const expectedPass = process.env.ADMIN_PASSWORD || "lightpixel123";
    if (username === expectedUser && password === expectedPass) {
      res.json({ success: true, token: "secure-admin-token-123" });
    } else {
      res.status(401).json({ success: false, message: "Sai tài khoản hoặc mật khẩu!" });
    }
  });

  app.get("/api/data", (req, res) => {
    res.json(siteData);
  });

  app.post("/api/data", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== "Bearer secure-admin-token-123") {
      return res.status(401).json({ success: false, message: "Không có quyền thực hiện hành động này!" });
    }
    siteData = { ...siteData, ...req.body };
    res.json({ success: true, data: siteData });
  });

  app.post("/api/contact", (req, res) => {
    const entry = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...req.body
    };
    if (!siteData.crmEntries) {
      siteData.crmEntries = [];
    }
    siteData.crmEntries.unshift(entry); // Add to the beginning
    res.json({ success: true, entry });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else if (!process.env.VERCEL) {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
  
  return app;
}

const appPromise = startServer();
export default async function (req: any, res: any) {
  const app = await appPromise;
  app(req, res);
}

