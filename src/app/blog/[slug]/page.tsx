// app/blog/[slug]/page.tsx

import { fetchBlogPosts, fetchBlogPostBySlug } from '@/app/lib/supabase';
import Image from 'next/image';
import { notFound } from 'next/navigation';
// BlocksRenderer import'u kaldırıldı
// import { BlocksRenderer } from '@strapi/blocks-react-renderer'; // Bu satırı SİLİN

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  if (!posts) {
    console.error("generateStaticParams: Blog yazıları çekilemedi.");
    return [];
  }
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostDetailPage({ params }: any) {
  const { slug } = params;

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
        {/* Kategori adı gösterme kısmı tamamen kaldırıldı */}
        {publishDate}
      </p>
      <p className="text-xl text-gray-700 mb-8">{post.description}</p>

      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
        {post.content ? (
            <p>{post.content}</p>
        ) : (
            <p>İçerik bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
}