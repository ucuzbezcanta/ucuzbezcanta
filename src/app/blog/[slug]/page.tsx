// app/blog/[slug]/page.tsx

import { fetchBlogPostBySlug } from '@/app/lib/strapi';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

// Düzeltildi: PageProps tipi tanımını tamamen kaldırıyoruz.
// type PageProps<P = object, SP = object> = { ... }; // Bu tanımı SİLİN

// generateStaticParams fonksiyonu aynı kalacak
export async function generateStaticParams() {
  return [{ slug: 'ham-bez-cantalarin-gunumuzdeki-onemi' }]; // Örnek slug
}

export default async function BlogPostDetailPage(props: any) { // Props'u doğrudan 'any' olarak tanımla
  const { slug } = props.params; // params'a props.params olarak erişiyoruz

  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    notFound(); 
  }

  const publishDate = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {post.coverImageUrl && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
        {post.title}
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        <span className="font-semibold">{post.categoryName}</span> - {publishDate}
      </p>
      <p className="text-xl text-gray-700 mb-8">{post.description}</p>

      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
        {post.content && post.content.length > 0 ? (
            <BlocksRenderer content={post.content as any} /> 
        ) : (
            <p>İçerik bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
}