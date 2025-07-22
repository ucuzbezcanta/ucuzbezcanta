
import { fetchProductsByCategorySlug, fetchCategories } from "@/app/lib/supabase";
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

// generateStaticParams: Tüm kategori slug'ları için statik yollar oluşturur
export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}


/**
 * Dinamik SEO Metadata
 */
export async function generateMetadata({ params }: any) {
  const { slug } = params;
  const products = await fetchProductsByCategorySlug(slug);

  if (!products || products.length === 0) {
    return {
      title: 'Kategori Bulunamadı | Ucuz Bez Çanta',
      description: 'Aradığınız kategori bulunamadı.',
    };
  }

  const categoryName = products[0].categoryName;

  return {
    title: `${categoryName} Ürünleri | Ucuz Bez Çanta`,
    description: `${categoryName} kategorisindeki ürünleri ve fiyatları hemen inceleyin.`,
    openGraph: {
      title: `${categoryName} Ürünleri | Ucuz Bez Çanta`,
      description: `${categoryName} kategorisindeki ürünleri ve fiyatları hemen inceleyin.`,
      images: [
        {
          url: products[0].mainImageUrl || '/images/logo.png',
          width: 1200,
          height: 630,
          alt: categoryName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} Ürünleri | Ucuz Bez Çanta`,
      description: `${categoryName} kategorisindeki ürünleri ve fiyatları hemen inceleyin.`,
      images: [products[0].mainImageUrl || '/images/logo.png'],
    },
  };
}



export default async function CategoryPage({ params }: { params: any}) {
  const { slug } = params;
  // Belirli bir kategoriye ait ürünleri çekiyoruz
  const products = await fetchProductsByCategorySlug(slug);
  const allCategories = await fetchCategories(); // Tüm kategorileri çekiyoruz

  // Eğer ürün bulunamazsa veya kategori yanlışsa 404 sayfasına yönlendir
  if (!products || products.length === 0) {
    notFound(); 
  }

  // Kategori adını ürünlerden alıyoruz (tüm ürünler aynı kategoriye ait olmalı)
  const categoryName = products[0].categoryName;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 md:hidden"> {/* Mobil için başlık */}
        Kategori: {categoryName} Ürünleri
      </h1>

      <div className="flex flex-col md:flex-row gap-8"> {/* Flex container */}
        {/* Sol Taraftaki Kategori Listesi */}
        <aside className="w-full md:w-64 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Kategoriler</h2>
          <nav>
            <ul>
              {allCategories.map((cat) => (
                <li key={cat.id} className="mb-3">
                  <Link 
                    href={`/kategoriler/${cat.slug}`} 
                    // Aktif kategoriye özel stil uyguluyoruz
                    className={`block py-2 px-3 rounded-md transition-colors duration-200 
                      ${cat.slug === slug 
                        ? 'bg-indigo-600 text-white font-semibold' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Mevcut Ürün Listesi */}
        <main className="flex-1"> {/* main etiketine sarıldı ve flex-1 ile alanı kaplaması sağlandı */}
          <h1 className="hidden md:block text-4xl font-bold text-gray-900 mb-8"> {/* Masaüstü için başlık */}
            Kategori: {categoryName} Ürünleri
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link href={`/urunler/${product.slug}`} key={product.id} className="block group">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out">
                  <div className="relative w-full h-60">
                    {product.mainImageUrl ? (
                      <Image
                        src={product.mainImageUrl}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="group-hover:opacity-80 transition-opacity duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                        Görsel Yok
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 truncate mb-2">
                      {product.name}
                    </h2>
                    <p className="text-lg font-bold text-indigo-600 mb-2">
                      ₺{product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">Stok: {product.stock}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
