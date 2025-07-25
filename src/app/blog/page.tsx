// app/blog/page.tsx

import { fetchBlogPosts } from '../lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';



export const metadata: Metadata = {
    title: 'Blog | Ucuz Bez Çanta Haberleri ve İpuçları',
    description: 'Ucuz Bez Çanta blogunda en son bez çanta modelleri, kullanım ipuçları, sektör haberleri ve çevre dostu üretim süreçleri hakkında bilgilere ulaşın.',
    keywords: ['bez çanta blog', 'çanta haberleri', 'promosyon ürünleri ipuçları', 'çevre dostu üretim', 'bez çanta trendleri'],
    openGraph: {
      title: 'Blog | Ucuz Bez Çanta Haberleri ve İpuçları',
      description: 'Ucuz Bez Çanta blogunda en son bez çanta modelleri, kullanım ipuçları, sektör haberleri ve çevre dostu üretim süreçleri hakkında bilgilere ulaşın.',
      url: 'https://www.ucuzbezcanta.com/blog', // Blog sayfanızın URL'si
      siteName: 'Ucuz Bez Çanta',
      images: [
        {
          url: 'https://ucuzbezcanta.com/images/logo.png',
          width: 1200,
          height: 630,
          alt: 'Ucuz bez çanta Logo Ana Görsel',
        },
      ],
      locale: 'tr_TR',
      type: 'article',
    },
};

export const revalidate = 300;

// BlogPostCard bileşeni: Kategori bilgisi kaldırıldı
function BlogPostCard({ post }: {
  post: {
    id: number;
    title: string;
    slug: string;
    description: string;
    coverImageUrl: string | null;
    // categoryName: string; // Bu satır kaldırıldı
    publishedAt: string;
  }
}) {
  const publishDate = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white group">
      {post.coverImageUrl && (
        <div className="relative w-full h-48 sm:h-56 overflow-hidden">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5 flex flex-col justify-between h-[calc(100%-12rem)]"> {/* H: 12rem = h-48 */}
        <div>
          {/* Kategori adını gösterme kısmı tamamen kaldırıldı */}
          <span className="text-xs text-gray-500 mb-2 block">{publishDate}</span>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {post.description}
          </p>
        </div>
        <div className="mt-auto">
          <span className="text-blue-500 font-semibold flex items-center group-hover:underline">
            Devamını Oku
            <svg className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const blogPosts = await fetchBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12">
        Son Blog Yazılarımız
      </h1>

      {blogPosts === null || blogPosts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Şu anda gösterilecek bir blog yazısı bulunmamaktadır.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}