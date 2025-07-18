// app/sitemap.ts
import { MetadataRoute } from 'next';
import { fetchProducts, fetchBlogPosts, fetchCategories } from './lib/supabase';


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ucuzbezcanta.com'; // Kendi domaininiz!

  const products = await fetchProducts(); // Tüm ürünlerin sluglarını çeken fonksiyon
  const blogPosts = await fetchBlogPosts(); // Tüm blog yazılarının sluglarını çeken fonksiyon
  const categories = await fetchCategories(); // Tüm kategorilerin sluglarını çeken fonksiyon

  const productUrls = products?.map((product) => ({
    url: `${baseUrl}/urunler/${product.slug}`,
    lastModified: new Date(), // Veya ürünün son güncellenme tarihi
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || [];

  const blogPostUrls = blogPosts?.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt), // Blog yazısının yayınlanma tarihi
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  })) || [];

  const categoryUrls = categories?.map((category) => ({
    url: `${baseUrl}/kategoriler/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimizda`, // Statik sayfalarınız
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
        url: `${baseUrl}/iade`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    {
        url: `${baseUrl}/sss`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    ...productUrls,
    ...blogPostUrls,
    ...categoryUrls,
  ];
}