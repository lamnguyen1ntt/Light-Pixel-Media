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
  about: "Chúng tôi là Light Pixel Media - Agency cung cấp giải pháp truyền thông sáng tạo, đột phá dành cho các doanh nghiệp, góp phần định vị vị thế vững chắc của bạn trên thị trường số."
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/data", (req, res) => {
    res.json(siteData);
  });

  app.post("/api/data", (req, res) => {
    siteData = { ...siteData, ...req.body };
    res.json({ success: true, data: siteData });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
