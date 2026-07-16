# Hải Anh Textile Website

Astro SSG website giới thiệu công ty may mặc xuất khẩu. Site build ra `dist/` tĩnh hoàn toàn, không dùng SSR, API routes, database hay PHP.

## Chạy local

```bash
npm install
npm run dev
npm run build
```

## Nội dung

- Sản phẩm: `src/content/products/*.md`
- Danh mục sản phẩm: `src/content/product-categories/*.md`
- Banner trang chủ: `src/content/home-banners/*.md`
- Cấu hình trang chủ/video YouTube: `src/content/home-settings/*.md`
- Tin tức: `src/content/blog/*.md`
- Nhà máy: `src/content/factories/*.md`

Các field SEO quan trọng như `description`, `imageAlt`, `coverImageAlt` được bắt buộc trong `src/content.config.ts`.

## Decap CMS

CMS nằm tại `/admin`. Trước khi dùng thật, sửa `public/admin/config.yml`:

Test local không cần site public:

```bash
npm run dev:cms
```

Sau đó mở `http://localhost:4321/admin/`. Decap sẽ dùng backend `proxy` qua `decap-server` để ghi trực tiếp vào các file Markdown trong repo, không cần đăng nhập GitHub.

Người soạn bài có thể vào collection "Danh mục sản phẩm" để thêm danh mục mới. Khi tạo hoặc sửa sản phẩm, field "Danh mục" sẽ lấy dữ liệu từ collection này.

Trang chủ:

- Collection "Banner trang chủ" quản lý ảnh trượt, tiêu đề, mô tả và thứ tự.
- Collection "Cấu hình trang chủ" quản lý link YouTube và nội dung cạnh video.
- Banner có hiệu ứng zoom chậm; người dùng bật giảm chuyển động trong hệ điều hành sẽ không thấy animation.

Đa ngôn ngữ:

- Chọn field `Ngôn ngữ` khi tạo danh mục, sản phẩm, bài viết hoặc nhà máy.
- `vi` hiển thị ở `/`, `/san-pham/`, `/tin-tuc/`.
- `en` hiển thị ở `/en/`, `/en/products/`, `/en/news/`.
- `zh` hiển thị ở `/zh/`, `/zh/products/`, `/zh/news/`.
- Nếu chưa có nội dung tiếng Anh/Trung, site tạm fallback sang nội dung tiếng Việt để không bị trống.

1. Thay `repo: your-org/may-hai-anh` bằng repo GitHub thật.
2. Đổi block `backend` trong `public/admin/config.yml` từ `name: proxy` sang block GitHub đang được comment.
3. Tạo GitHub OAuth App riêng cho CMS. Callback URL trỏ về service OAuth bạn triển khai cho Decap CMS.
4. Điền `base_url` và `auth_endpoint` theo service OAuth.
5. Không commit client secret hoặc `.env`; đặt secret trên nền tảng hosting/OAuth service.

CMS bật `editorial_workflow` để bài đi qua draft -> review -> publish.

## Bảo mật vận hành

- Static site không có database/PHP/backend tự viết nên giảm bề mặt tấn công phía máy chủ.
- Bật 2FA cho GitHub organization quản lý repo.
- Tài khoản dùng cho Decap CMS chỉ nên có quyền `write`, không cấp `admin`.
- Tài khoản hoặc token deploy Cloudflare Pages tách biệt với tài khoản soạn bài.
- Form liên hệ dùng Formspree, có honeypot `_gotcha`; bật thêm spam protection/rate limit trong Formspree.
- Security headers nằm trong `public/_headers` cho Cloudflare Pages.

## Deploy Cloudflare Pages

1. Push repo lên GitHub.
2. Cloudflare Pages -> Create project -> Connect to Git.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Environment variables: thêm biến cho OAuth/Formspree nếu service của bạn yêu cầu. Không commit secret vào repo.
6. Custom domain: thêm `haianhtex.com`, bật SSL/TLS Full, đặt canonical non-www.
7. Redirect: cấu hình `www.haianhtex.com/*` -> `https://haianhtex.com/$1` và HTTP -> HTTPS để tránh trùng nội dung.

## Rollback

Nếu publish sai, dùng Git history:

```bash
git log --oneline
git revert <commit>
git push
```

Cloudflare Pages sẽ build lại từ commit mới.
