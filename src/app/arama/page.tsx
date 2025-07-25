import { searchProducts } from "../lib/supabase";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";



export const metadata: Metadata = {
    title: 'Arama Sayfası | Ucuz Bez Çanta', // Sayfanın içeriğine özel başlık
    description: 'Ucuz Bez Çanta hakkında bilgi edinin. Misyonumuz, vizyonumuz ve toptan bez çanta üretimindeki uzmanlığımız hakkında detaylı bilgi.', // Sayfanın içeriğine özel açıklama
    keywords: ['ucuz bez çanta hakkında', 'bez çanta misyonu', 'bez çanta vizyonu', 'şirket bilgileri'], // Sayfaya özel anahtar kelimeler
    openGraph: {
      title: 'Arama Sayfası | Ucuz Bez Çanta',
      description: 'Ucuz Bez Çanta hakkında bilgi edinin. Misyonumuz, vizyonumuz ve toptan bez çanta üretimindeki uzmanlığımız hakkında detaylı bilgi.',
      url: 'https://www.ucuzbezcanta.com/arama', // Bu sayfanın URL'si
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
      type: 'website',
    },
};

export default async function SearchPage(props: any) {
  const query = props.searchParams?.q;

  let products = [];
  if (typeof query === "string" && query.trim() !== "") {
    products = await searchProducts(query);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Arama Sonuçları</h1>
      <p>Arama sorgusu: {query}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border p-2 rounded">
              <Link
                href={`/urunler/${product.slug}`}
                className="p-2 rounded block hover:shadow-lg transition-shadow duration-200"
              >
                <Image
                  src={product.mainImageUrl}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.price} TL</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Sonuç bulunamadı.</p>
        )}
      </div>
    </div>
  );
}
