export const site = {
  name: 'Hải Anh Textile',
  legalName: 'Công ty Cổ phần May Hải Anh',
  copyrightName: 'Haianhtex Joint Stock Company',
  title: 'Hải Anh Textile | Sản xuất may mặc xuất khẩu',
  description: 'Công ty sản xuất may mặc xuất khẩu với năng lực dệt kim, đồ lót, đồ bơi và hàng dệt len cho thị trường Mỹ, EU.',
  url: 'https://haianhtex.com',
  phones: ['+84 220 3792 492', '+84 220 3689 668', '+84 227 3936 888'],
  phone: '+84 220 3792 492',
  email: 'export@haianhtex.com'
};

export const defaultOgImage = '/og-default.jpg';

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.url, site.url).toString()
    }))
  };
}
