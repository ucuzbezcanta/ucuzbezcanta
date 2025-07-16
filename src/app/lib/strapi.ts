// lib/strapi.ts

const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337/api';



interface StrapiTextChild {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface StrapiLinkChild {
  type: 'link';
  url: string;
  children: StrapiTextChild[];
}

type StrapiInlineNode = StrapiTextChild | StrapiLinkChild;

interface StrapiParagraphBlock {
  type: 'paragraph';
  children: StrapiInlineNode[];
  format?: string; // e.g., 'h1', 'h2', 'h3'
}

interface StrapiListBlock {
  type: 'list';
  format: 'unordered' | 'ordered';
  children: Array<{
    type: 'list-item';
    children: StrapiInlineNode[];
  }>;
}

interface StrapiImageBlock {
  type: 'image';
  image: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    url: string;
    // Diğer görsel detayları...
  };
}

// Buraya Strapi'den gelebilecek diğer block tiplerini ekleyebilirsiniz (e.g., quote, code, heading, table)
type StrapiContentBlock = StrapiParagraphBlock | StrapiListBlock | StrapiImageBlock;

// Strapi'nin Rich Text içeriği bir dizi bloktur
export type StrapiRichContent = StrapiContentBlock[];

// --- Mevcut Diğer Tipleriniz ---
interface StrapiCategoryData {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

interface StrapiCategoriesResponse {
  data: StrapiCategoryData[];
  meta: StrapiMeta;
}

interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface StrapiImageFormats {
  thumbnail?: StrapiImageFormat;
  small?: StrapiImageFormat;
  medium?: StrapiImageFormat;
  large?: StrapiImageFormat;
}

interface StrapiImageContent { 
  id: number;
  documentId?: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: StrapiImageFormats | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// Slaytlar için tip tanımlamaları
interface StrapiSlideData {
  id: number;
  documentId?: string;
  title: string;
  subtitle: StrapiRichContent; // any[] yerine yeni tipimizi kullanıyoruz
  buttonText?: string;
  buttonLink?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: StrapiImageContent;
}

interface StrapiSlidesResponse {
  data: StrapiSlideData[];
  meta: StrapiMeta;
}

// Blog Post için tip tanımlamaları
interface StrapiBlogPostData {
  id: number;
  documentId?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  slug: string;
  description: string;
  content: StrapiRichContent; // any[] yerine yeni tipimizi kullanıyoruz
  coverImage: StrapiImageContent;
  category: StrapiCategoryData;
}

interface StrapiBlogPostsResponse {
  data: StrapiBlogPostData[];
  meta: StrapiMeta;
}

// --- YENİ EKLENEN KISIM: Ürünler İçin Tip Tanımlamaları ---
interface StrapiProductData {
  id: number;
  documentId?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  slug: string;
  description: StrapiRichContent; // Rich Text içeriği için
  price: number;
  stock: number;
  mainImage: StrapiImageContent; // Tek görsel
  galleryImages: StrapiImageContent[]; // Birden fazla görsel
  category: StrapiCategoryData; // Kategori ilişkisi
  isFeatured: boolean;
}

interface StrapiProductsResponse {
  data: StrapiProductData[];
  meta: StrapiMeta;
}

// --- Next.js Bileşenlerinde Kullanılacak Temiz Ürün Tipi ---
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: StrapiRichContent;
  price: number;
  stock: number;
  mainImageUrl: string | null;
  galleryImageUrls: string[];
  categoryName: string;
  categorySlug: string;
  publishedAt: string;
  isFeatured: boolean; // <-- DEĞİŞİKLİK 2: Next.js'te kullanılacak Product tipine eklendi
}

// Kategori için Next.js'te kullanılacak temiz tip
export interface Category {
  id: number;
  name: string;
  slug: string;
}

// --- Fetch Fonksiyonları ---
export async function fetchCategories() {
  try {
    const response = await fetch(`${STRAPI_API_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json() as StrapiCategoriesResponse;
    return result.data.map((item: StrapiCategoryData) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
    }));
  } catch (error) {
    console.error("Kategoriler çekilirken hata oluştu:", error);
    return [];
  }
}

export async function fetchSlides() {
  try {
    const response = await fetch(`${STRAPI_API_URL}/slides?populate=image`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json() as StrapiSlidesResponse;
    
    return result.data.map((item: StrapiSlideData) => {
        let subtitleText = '';
        if (item.subtitle && item.subtitle.length > 0) {
            // StrapiRichContent tipini kullanarak daha güvenli erişim
            subtitleText = item.subtitle.map(block => {
                if (block.type === 'paragraph' && 'children' in block) { // Type guard
                    return block.children.map(child => (child as StrapiTextChild).text || '').join('');
                }
                return '';
            }).join(' ').trim();
        }

        const calculatedImageUrl = item.image?.url 
                                ? `${STRAPI_API_URL.replace('/api', '')}${item.image.url}` 
                                : null;
        
        console.log("Slayt ID:", item.id, " - Hesaplanan Image URL:", calculatedImageUrl);

        return {
            id: item.id,
            title: item.title,
            subtitle: subtitleText,
            buttonText: item.buttonText || null,
            buttonLink: item.buttonLink || null,
            imageUrl: calculatedImageUrl,
        };
    });
  } catch (error) {
    console.error("Slaytlar çekilirken hata oluştu:", error);
    return [];
  }
}

export async function fetchBlogPosts() {
  try {
    const response = await fetch(`${STRAPI_API_URL}/blog-posts?populate=coverImage&populate=category`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json() as StrapiBlogPostsResponse;
    
    return result.data.map((item: StrapiBlogPostData) => {
        const coverImageUrl = item.coverImage?.url 
                                ? `${STRAPI_API_URL.replace('/api', '')}${item.coverImage.url}` 
                                : null;
        
        console.log(`Blog Post ID: ${item.id} - Title: ${item.title} - Cover Image URL: ${coverImageUrl}`);

        return {
            id: item.id,
            title: item.title,
            slug: item.slug,
            description: item.description,
            content: item.content,
            coverImageUrl: coverImageUrl,
            categoryName: item.category?.name || 'Uncategorized',
            categorySlug: item.category?.slug || 'uncategorized',
            publishedAt: item.publishedAt,
        };
    });
  } catch (error) {
    console.error("Blog yazıları çekilirken hata oluştu:", error);
    return [];
  }
}

export async function fetchBlogPostBySlug(slug: string) {
  try {
    const response = await fetch(`${STRAPI_API_URL}/blog-posts?filters[slug][$eq]=${slug}&populate=coverImage&populate=category`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json() as StrapiBlogPostsResponse;
    
    if (result.data.length === 0) {
      return null;
    }

    const item = result.data[0];
    const coverImageUrl = item.coverImage?.url 
                            ? `${STRAPI_API_URL.replace('/api', '')}${item.coverImage.url}` 
                            : null;

    return {
        id: item.id,
        title: item.title,
        slug: item.slug,
        description: item.description,
        content: item.content,
        coverImageUrl: coverImageUrl,
        categoryName: item.category?.name || 'Uncategorized',
        categorySlug: item.category?.slug || 'uncategorized',
        publishedAt: item.publishedAt,
    };

  } catch (error) {
    console.error(`Slug (${slug}) ile blog yazısı çekilirken hata oluştu:`, error);
    return null;
  }
}

// --- YENİ EKLENEN KISIM: Ürünler İçin Fetch Fonksiyonları ---

// Tüm ürünleri çeker
export async function fetchProducts(): Promise<Product[]> { // <-- Promise<Product[]> dönüş tipi eklendi
  try {
    const response = await fetch(`${STRAPI_API_URL}/products?populate=mainImage&populate=galleryImages&populate=category`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json() as StrapiProductsResponse;

    return result.data.map((item: StrapiProductData) => {
      const mainImageUrl = item.mainImage?.url 
                            ? `${STRAPI_API_URL.replace('/api', '')}${item.mainImage.url}` 
                            : null;
      
      const galleryImageUrls = item.galleryImages?.map(img => 
        img.url ? `${STRAPI_API_URL.replace('/api', '')}${img.url}` : null
      ).filter(Boolean) as string[];

      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        stock: item.stock,
        mainImageUrl: mainImageUrl,
        galleryImageUrls: galleryImageUrls,
        categoryName: item.category?.name || 'Uncategorized',
        categorySlug: item.category?.slug || 'uncategorized',
        publishedAt: item.publishedAt,
        isFeatured: item.isFeatured || false, // <-- DEĞİŞİKLİK 3: Döndürülen objeye eklendi
      };
    });
  } catch (error) {
    console.error("Ürünler çekilirken hata oluştu:", error);
    return [];
  }
}

// Belirli bir kategoriye ait ürünleri çeker
export async function fetchProductsByCategorySlug(categorySlug: string): Promise<Product[]> { // <-- Promise<Product[]> dönüş tipi eklendi
  try {
    const response = await fetch(`${STRAPI_API_URL}/products?filters[category][slug][$eq]=${categorySlug}&populate=mainImage&populate=galleryImages&populate=category`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json() as StrapiProductsResponse;

    return result.data.map((item: StrapiProductData) => {
      const mainImageUrl = item.mainImage?.url 
                            ? `${STRAPI_API_URL.replace('/api', '')}${item.mainImage.url}` 
                            : null;
      
      const galleryImageUrls = item.galleryImages?.map(img => 
        img.url ? `${STRAPI_API_URL.replace('/api', '')}${img.url}` : null
      ).filter(Boolean) as string[];

      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        stock: item.stock,
        mainImageUrl: mainImageUrl,
        galleryImageUrls: galleryImageUrls,
        categoryName: item.category?.name || 'Uncategorized',
        categorySlug: item.category?.slug || 'uncategorized',
        publishedAt: item.publishedAt,
        isFeatured: item.isFeatured || false, // <-- DEĞİŞİKLİK 4: Döndürülen objeye eklendi
      };
    });
  } catch (error) {
    console.error(`Kategori (${categorySlug}) ürünleri çekilirken hata oluştu:`, error);
    return [];
  }
}

// Belirli bir slug'a sahip ürün detayını çeker
export async function fetchProductBySlug(slug: string): Promise<Product | null> { // <-- Promise<Product | null> dönüş tipi eklendi
  try {
    const response = await fetch(`${STRAPI_API_URL}/products?filters[slug][$eq]=${slug}&populate=mainImage&populate=galleryImages&populate=category`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json() as StrapiProductsResponse;

    if (result.data.length === 0) {
      return null; // Ürün bulunamadı
    }

    const item = result.data[0];
    const mainImageUrl = item.mainImage?.url 
                            ? `${STRAPI_API_URL.replace('/api', '')}${item.mainImage.url}` 
                            : null;
    
    const galleryImageUrls = item.galleryImages?.map(img => 
      img.url ? `${STRAPI_API_URL.replace('/api', '')}${img.url}` : null
    ).filter(Boolean) as string[];

    return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        stock: item.stock,
        mainImageUrl: mainImageUrl,
        galleryImageUrls: galleryImageUrls,
        categoryName: item.category?.name || 'Uncategorized',
        categorySlug: item.category?.slug || 'uncategorized',
        publishedAt: item.publishedAt,
        isFeatured: item.isFeatured || false, // <-- DEĞİŞİKLİK 5: Döndürülen objeye eklendi
    };

  } catch (error) {
    console.error(`Slug (${slug}) ile ürün çekilirken hata oluştu:`, error);
    return null;
  }
}

// Öne çıkan (isFeatured: true) ürünleri çeker (YENİ FONKSİYON)
export async function fetchFeaturedProducts(): Promise<Product[]> { // <-- DEĞİŞİKLİK 6: Yeni fonksiyon ve dönüş tipi
  try {
    // isFeatured filtresi ile sadece öne çıkanları çekiyoruz
    const response = await fetch(`${STRAPI_API_URL}/products?filters[isFeatured][$eq]=true&populate=mainImage&populate=category`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json() as StrapiProductsResponse;

    return result.data.map(item => { // item: StrapiProductData olarak TypeScript otomatik çıkarım yapacak
      const mainImageUrl = item.mainImage?.url
                              ? `${STRAPI_API_URL.replace('/api', '')}${item.mainImage.url}`
                              : null;

      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description, // Dilerseniz bu alanı burada boş bırakabilirsiniz
        price: item.price,
        stock: item.stock,
        mainImageUrl: mainImageUrl,
        galleryImageUrls: [], // Anasayfada sadece ana görsel yeterli, galeriye gerek yok
        categoryName: item.category?.name || 'Uncategorized',
        categorySlug: item.category?.slug || 'uncategorized',
        publishedAt: item.publishedAt,
        isFeatured: item.isFeatured || false, // <-- DEĞİŞİKLİK 7: Döndürülen objeye eklendi
      };
    });

  } catch (error) {
    console.error("Öne çıkan ürünler çekilirken hata oluştu:", error);
    return []; // Hata durumunda boş dizi dön
  }
}
