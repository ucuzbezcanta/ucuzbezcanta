// app/urunler/[slug]/page.tsx

import { fetchProducts, fetchProductBySlug } from '@/app/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ProductGallery from '@/components/ProductGallery';


export const revalidate = 3600;


export async function generateMetadata({ params }: any) {
  const product = await fetchProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Ürün Bulunamadı | Ucuz Bez Çanta',
      description: 'Aradığınız ürün bulunamadı.',
    };
  }

  const description =
    product.description?.slice(0, 150) ||
    `${product.name} hakkında detaylı bilgi ve fiyatlar için hemen inceleyin.`;

  return {
    title: `${product.name} | Ucuz Bez Çanta`,
    description: description,
    openGraph: {
      title: `${product.name} | Ucuz Bez Çanta`,
      description: description,
      images: [
        {
          url: product.mainImageUrl || '/images/logo.png',
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Ucuz Bez Çanta`,
      description: description,
      images: [product.mainImageUrl || '/images/logo.png'],
    },
  };
}



export async function generateStaticParams() {
  const products = await fetchProducts();
  // Eğer ürünler çekilemezse veya boş gelirse boş bir dizi döndürerek hatayı önleriz
  if (!products) {
    console.error("generateStaticParams: Ürünler çekilemedi.");
    return [];
  }
  // Her ürünün slug'ını döneriz
  return products.map((product: { slug: string }) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: any) {

  const { slug } = params;

  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // WhatsApp butonu için telefon numarası ve mesajı belirliyoruz
  const whatsappPhoneNumber = '905339780835'; // Kendi gerçek numaranızı buraya yazın
  const whatsappMessage = encodeURIComponent(`Merhaba, "${product.name}" ürünü hakkında bilgi almak istiyorum.`);
  const whatsappLink = `https://wa.me/${whatsappPhoneNumber}?text=${whatsappMessage}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Rota / Breadcrumb Kısmı */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              Anasayfa
            </Link>
            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          {/* Kategori bilgisi varsa breadcrumb'da göster */}
          {product.categorySlug && product.categoryName && (
            <li className="flex items-center">
              <Link href={`/kategoriler/${product.categorySlug}`} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                {product.categoryName}
              </Link>
              <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.568.001 33.941z"/></svg>
            </li>
          )}
          <li className="flex items-center text-gray-700">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
        {/* Ürün Galerisi ve Ana Görsel Bölümü */}
        <ProductGallery
          mainImageUrl={product.mainImageUrl || ''} // Eğer null/undefined ise boş string gönder
          galleryImageUrls={product.galleryImageUrls || []} // Eğer null/undefined ise boş dizi gönder
          productName={product.name}
        />

        {/* Ürün Bilgileri (Sağ Kısım) */}
        <div className="md:col-span-2 order-3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            {product.name}
          </h1>
          {product.categoryName && ( // Kategori adı varsa göster
            <p className="text-gray-600 text-lg mb-4">
              Kategori:{' '}
              <Link href={`/kategoriler/${product.categorySlug}`} className="text-indigo-600 hover:underline">
                {product.categoryName}
              </Link>
            </p>
          )}
          <p className="text-4xl font-bold text-indigo-700 mb-6">
            {product.price.toFixed(2)} ₺ den başlayan fiyatlar
          </p>
          <p className="text-xl text-gray-700 mb-6">
            Stok Durumu: {product.stock > 0 ? `Stokta Var (${product.stock} Adet)` : 'Stokta Yok'}
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ürün Açıklaması</h3>
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-8">
            {/* Strapi'nin BlocksRenderer'ı yerine düz metin veya HTML render ediyoruz */}
            {product.description ? (
                // Eğer açıklama düz metin ise <p> içinde göster
                <p>{product.description}</p>
                // Eğer product.description içinde HTML tagleri varsa, XSS riskini bilerek:
                // <div dangerouslySetInnerHTML={{ __html: product.description }} />
            ) : (
                <p>Ürün açıklaması bulunmamaktadır.</p>
            )}
          </div>

          {/* WhatsApp Butonu */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.557-3.844-1.557-5.891 0-6.505 5.275-11.78 11.78-11.78s11.78 5.275 11.78 11.78-5.275 11.78-11.78 11.78c-1.956 0-3.956-.505-5.656-1.545l-6.204 1.656zm11.78-22.921c5.962 0 10.822 4.86 10.822 10.821 0 5.962-4.86 10.822-10.822 10.822-1.8 0-3.61-.43-5.205-1.25l-5.679 1.517 1.488-5.459c-.927-1.57-1.408-3.35-1.408-5.187 0-5.962 4.86-10.822 10.822-10.822zm5.727 15.011c-.131.258-.291.357-.597.472-.295.119-.661.168-.999.049-.338-.119-1.053-.388-1.21-.458-.157-.069-.32-.089-.481.089-.161.18-.581.459-.728.62-.149.16-.299.18-.559.089-.26-.11-1.09-3.996-4.408-5.467-.32-.149-.533-.239-.74-.269-.208-.029-.44-.029-.68-.029-.24-.009-.52.069-.739.279-.208.199-.79.768-.79.938 0 .18-.089.459-.178.62-.09.16-.179.359-.269.458-.089.089-.179.169-.269.269-.089.089-.179.18-1.091.688-1.502.839-2.508 1.577-3.376 2.067-.868.498-1.74.878-2.316.948-.577.069-1.036.01-1.353-.119-.316-.119-.789-.299-1.058-.518-.269-.219-.597-.338-.857-.338-.26 0-.671.169-1.02.508-.35.338-.999.988-1.208 1.258-.208.269-.418.359-.788.438-.37.079-1.63.508-2.61.908-1.597.649-2.659.84-2.659.84l-.128.029h-.01c-.139.02-.279.03-1.498.03-1.897 0-3.37-.508-4.52-1.737-1.15-1.229-1.737-2.668-1.737-4.505 0-.09.009-.18.009-.27-.009-.12-1.508-5.679-1.508-7.796 0-2.096.79-3.864 2.276-5.113 1.487-1.248 3.555-1.888 5.867-1.888 1.587 0 3.06.31 4.394.948 1.299.629 2.478 1.637 3.52 2.943 1.04 1.306 1.879 2.906 2.508 4.704.629 1.798.947 3.656.947 5.514 0 4.148-1.738 7.376-5.205 9.613l.001.001z"/>
            </svg>
            WhatsApp ile Bilgi Al
          </a>
        </div>
      </div>
    </div>
  );
}