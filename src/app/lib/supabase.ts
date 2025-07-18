// lib/supabase.ts

import { createClient } from "@supabase/supabase-js";

// Ortam değişkenlerini al
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Ortam değişkenlerinin tanımlı olduğundan emin olun
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon key is missing in environment variables.');
}

// Supabase Client'ı oluştur
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// BlogPost tipi tanımı
interface BlogPost {
    id: number;
    title: string;
    slug: string;
    description: string;
    coverImageUrl: string | null;
    publishedAt: string;
    content: string;
}


// Kategori verilerini Supabase'den çekme fonksiyonu
export async function fetchCategories() {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true })
            .limit(100);

        if (error) {
            console.error('Kategoriler çekilirken hata oluştu:', error);
            return [];
        }

        return data;
    } catch (e) {
        console.error('Kategoriler çekilirken beklenmeyen bir hata oluştu:', e);
        return [];
    }
}

// Slayt verilerini Supabase'den çekme fonksiyonu
export async function fetchSlides() {
    try {
        const { data, error } = await supabase
            .from('slides')
            .select('*')
            .order('order_num', { ascending: true })
            .limit(10);

        if (error) {
            console.error('Slaytlar çekilirken hata oluştu:', error);
            return [];
        }

        return data.map(slide => ({
            id: slide.id,
            title: slide.title,
            subtitle: slide.description || null,
            buttonText: slide.button_text || null,
            buttonLink: slide.link_url || null,
            imageUrl: slide.image_url || null,
        }));

    } catch (e) {
        console.error('Slaytlar çekilirken beklenmeyen bir hata oluştu:', e);
        return [];
    }
}

// Öne çıkan ürün verilerini Supabase'den çekme fonksiyonu
export async function fetchFeaturedProducts() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_featured', true)
            .limit(4);

        if (error) {
            console.error('Öne çıkan ürünler çekilirken hata oluştu:', error);
            return [];
        }
        return data.map(product => ({
            ...product,
            mainImageUrl: product.main_image_url,
        }));
    } catch (e) {
        console.error('Öne çıkan ürünler çekilirken beklenmeyen bir hata oluştu:', e);
        return [];
    }
}

// Belirli bir kategori slug'ına göre ürünleri çeken fonksiyon
export async function fetchProductsByCategorySlug(categorySlug: string) {
    try {
        const { data: categoryData, error: categoryError } = await supabase
            .from('categories')
            .select('id, name')
            .eq('slug', categorySlug)
            .single();

        if (categoryError || !categoryData) {
            console.error(`Kategori slug'ı "${categorySlug}" bulunamadı veya hata oluştu:`, categoryError);
            return [];
        }

        const categoryId = categoryData.id;
        const categoryName = categoryData.name;

        const { data: productsData, error: productsError } = await supabase
            .from('products')
            .select('*')
            .eq('category_id', categoryId);

        if (productsError) {
            console.error(`Ürünler çekilirken hata oluştu (kategori ID: ${categoryId}):`, productsError);
            return [];
        }

        return productsData.map(product => ({
            ...product,
            mainImageUrl: product.main_image_url,
            categoryName: categoryName
        }));

    } catch (e) {
        console.error('Kategoriye göre ürünler çekilirken beklenmeyen bir hata oluştu:', e);
        return [];
    }
}

// Tüm ürünleri çeken fonksiyon
export async function fetchProducts() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('id, slug');

        if (error) {
            console.error('Tüm ürünler çekilirken hata oluştu:', error);
            return [];
        }

        return data;
    } catch (e) {
        console.error('Tüm ürünler çekilirken beklenmeyen bir hata oluştu:', e);
        return [];
    }
}

// Slug'a göre tek bir ürünü çeken fonksiyon
export async function fetchProductBySlug(productSlug: string) {
    try {
        const { data: productData, error: productError } = await supabase
            .from('products')
            .select('*, categories(id, name, slug)')
            .eq('slug', productSlug)
            .single();

        if (productError || !productData) {
            console.error(`Ürün slug'ı "${productSlug}" bulunamadı veya hata oluştu:`, productError);
            return null;
        }

        const transformedProduct = {
            id: productData.id,
            name: productData.name,
            slug: productData.slug,
            description: productData.description,
            price: productData.price,
            stock: productData.stock,
            mainImageUrl: productData.main_image_url,
            galleryImageUrls: productData.gallery_image_urls && typeof productData.gallery_image_urls === 'string'
                ? JSON.parse(productData.gallery_image_urls) as string[]
                : Array.isArray(productData.gallery_image_urls)
                    ? productData.gallery_image_urls as string[]
                    : [],
            categorySlug: productData.categories?.slug,
            categoryName: productData.categories?.name,
        };

        return transformedProduct;

    } catch (e) {
        console.error('Ürün slug ile çekilirken beklenmeyen bir hata oluştu:', e);
        return null;
    }
}

// Tüm blog yazılarını Supabase'den çeken fonksiyon
export async function fetchBlogPosts(): Promise<BlogPost[] | null> {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('published_at', { ascending: false });

        if (error) {
            console.error('Blog yazıları çekilirken hata oluştu:', error);
            return null;
        }

        if (!data) {
            return [];
        }

        const formattedPosts: BlogPost[] = data.map((post: any) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            description: post.description,
            coverImageUrl: post.cover_image_url || null,
            publishedAt: post.published_at,
            content: post.content || '',
        }));

        return formattedPosts;

    } catch (e) {
        console.error('Tüm blog yazıları çekilirken beklenmeyen bir hata oluştu:', e);
        return null;
    }
}

// Slug'a göre tek bir blog yazısını Supabase'den çeken fonksiyon
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const { data: postData, error: postError } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .single();

        if (postError || !postData) {
            console.error(`Blog yazısı slug'ı "${slug}" bulunamadı veya hata oluştu:`, postError);
            return null;
        }

        const formattedPost: BlogPost = {
            id: postData.id,
            title: postData.title,
            slug: postData.slug,
            description: postData.description,
            coverImageUrl: postData.cover_image_url || null,
            publishedAt: postData.published_at,
            content: postData.content || '',
        };

        return formattedPost;

    } catch (e) {
        console.error(`Blog yazısı slug ile çekilirken beklenmeyen bir hata oluştu (${slug}):`, e);
        return null;
    }
}

export default supabase;