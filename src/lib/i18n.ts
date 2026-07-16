export const languages = {
  vi: 'Tiếng Việt',
  en: 'English',
  zh: '中文'
} as const;

export const languageFlags = {
  vi: '🇻🇳',
  en: '🇬🇧',
  zh: '🇨🇳'
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'vi';

export const localized = {
  vi: {
    home: '/',
    about: '/gioi-thieu/',
    products: '/san-pham/',
    news: '/tin-tuc/',
    contact: '/lien-he/',
    nav: ['Trang chủ', 'Giới thiệu', 'Sản phẩm', 'Tin tức', 'Liên hệ'],
    productTitle: 'Nhóm sản phẩm được tổ chức theo năng lực vật liệu và chuyền may.',
    productFilterTitle: 'Tìm và lọc theo nhóm sản phẩm.',
    newsTitle: 'Ghi chú vận hành từ xưởng may xuất khẩu.',
    searchProducts: 'Tìm theo tên / tiêu đề',
    searchPosts: 'Tìm theo tiêu đề',
    filterCategory: 'Lọc theo danh mục',
    filterTag: 'Lọc theo tag',
    all: 'Tất cả',
    noProducts: 'Không có sản phẩm phù hợp.',
    noPosts: 'Không có bài viết phù hợp.',
    productUnit: 'sản phẩm',
    postUnit: 'bài viết',
    callNow: 'Gọi ngay',
    requestQuote: 'Gửi yêu cầu'
  },
  en: {
    home: '/en/',
    about: '/en/about/',
    products: '/en/products/',
    news: '/en/news/',
    contact: '/en/contact/',
    nav: ['Home', 'About', 'Products', 'News', 'Contact'],
    productTitle: 'Product groups organized by material capability and production line.',
    productFilterTitle: 'Search and filter by product segment.',
    newsTitle: 'Operational notes from an export garment factory.',
    searchProducts: 'Search by product name',
    searchPosts: 'Search by article title',
    filterCategory: 'Filter by category',
    filterTag: 'Filter by tag',
    all: 'All',
    noProducts: 'No matching products.',
    noPosts: 'No matching articles.',
    productUnit: 'products',
    postUnit: 'articles',
    callNow: 'Call now',
    requestQuote: 'Request a quote'
  },
  zh: {
    home: '/zh/',
    about: '/zh/about/',
    products: '/zh/products/',
    news: '/zh/news/',
    contact: '/zh/contact/',
    nav: ['首页', '关于我们', '产品', '新闻', '联系'],
    productTitle: '按面料能力和生产线组织的产品类别。',
    productFilterTitle: '按产品类别搜索和筛选。',
    newsTitle: '来自出口服装工厂的运营记录。',
    searchProducts: '按产品名称搜索',
    searchPosts: '按文章标题搜索',
    filterCategory: '按标签筛选',
    filterTag: '按标签筛选',
    all: '全部',
    noProducts: '没有匹配的产品。',
    noPosts: '没有匹配的文章。',
    productUnit: '个产品',
    postUnit: '篇文章',
    callNow: '立即致电',
    requestQuote: '发送需求'
  }
} satisfies Record<Language, Record<string, string | string[]>>;

export const aboutSectionPaths = {
  history: { vi: '/gioi-thieu/lich-su-phat-trien/', en: '/en/about/development/', zh: '/zh/about/development/' },
  vision: { vi: '/gioi-thieu/tam-nhin-su-menh/', en: '/en/about/purpose/', zh: '/zh/about/purpose/' },
  organization: { vi: '/gioi-thieu/co-cau-to-chuc/', en: '/en/about/organization/', zh: '/zh/about/organization/' }
} satisfies Record<string, Record<Language, string>>;

const pageRouteKeys = ['home', 'about', 'products', 'news', 'contact'] as const;

export function detectAlternates(pathname: string): Record<Language, string> | undefined {
  for (const key of pageRouteKeys) {
    for (const lang of ['vi', 'en', 'zh'] as Language[]) {
      if (localized[lang][key] === pathname) {
        return { vi: localized.vi[key] as string, en: localized.en[key] as string, zh: localized.zh[key] as string };
      }
    }
  }
  return undefined;
}

export function isLanguage(value: string | undefined): value is Language {
  return value === 'vi' || value === 'en' || value === 'zh';
}

export function entryLanguage(entry: { data: { language?: Language } }): Language {
  return entry.data.language ?? defaultLanguage;
}

export function filterByLanguage<T extends { data: { language?: Language } }>(entries: T[], language: Language): T[] {
  const exact = entries.filter((entry) => entryLanguage(entry) === language);
  return exact.length > 0 ? exact : entries.filter((entry) => entryLanguage(entry) === defaultLanguage);
}
