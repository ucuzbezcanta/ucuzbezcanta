import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Çerez Politikası | Ucuz Bez Çanta',
    description: 'Ucuz Bez Çanta web sitesinin çerez politikası. Çerezlerin ne olduğunu, nasıl kullandığımızı ve tercihlerinizi nasıl yönetebileceğinizi öğrenin.',
  // Diğer SEO meta verilerini buraya ekleyebilirsiniz (openGraph, twitter vb.)
  openGraph: {
    title: 'Çerez Politikası | Ucuz Bez Çanta',
    description: 'Ucuz Bez Çanta web sitesinin çerez politikası. Çerezlerin ne olduğunu, nasıl kullandığımızı ve tercihlerinizi nasıl yönetebileceğinizi öğrenin.',
    url: 'https://ucuzbezcanta.com/cerez-politikasi', // Kendi domain adresinizi BURAYA YAZIN!
    type: 'website',
  },
  alternates: {
    canonical: 'https://ucuzbezcanta.com/cerez-politikasi', // Kendi domain adresinizi BURAYA YAZIN!
  },
};

export default function CerezPolitikasiPage() {
    return(
        <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight text-center">
        Çerez Politikası
      </h1>

      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
        <p className="mb-4">
          Bu Çerez Politikası, Ucuz Bez Çanta web sitesi (www.ucuzbezcanta.com) tarafından çerezlerin ve benzeri teknolojilerin nasıl kullanıldığını açıklamaktadır. Web Sitesini kullanarak bu politikada açıklanan çerez kullanımını kabul etmiş olursunuz.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">1. Çerez Nedir?</h2>
        <p className="mb-4">
          Çerezler, ziyaret ettiğiniz web siteleri tarafından bilgisayarınıza veya mobil cihazınıza depolanan küçük metin dosyalarıdır. Çerezler, web sitesinin sizi hatırlamasını, tercihlerinizi kaydetmesini (örneğin dil, oturum açma bilgileri) veya siteyi nasıl kullandığınızı analiz etmesini sağlar.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">2. Hangi Tür Çerezleri Kullanıyoruz?</h2>
        <p className="mb-4">Web sitemizde aşağıdaki çerez türlerini kullanabiliriz:</p>
        <ul className="list-disc list-inside mb-4 ml-4">
          <li>
            <strong>Zorunlu Çerezler:</strong> Web sitesinin temel işlevleri için gereklidir. Örneğin, oturum açma, alışveriş sepeti işlevselliği gibi. Bu çerezler olmadan web sitesi düzgün çalışamaz.
          </li>
          <li>
            <strong>Performans ve Analiz Çerezleri:</strong> Web sitesinin nasıl kullanıldığını analiz etmemize yardımcı olur. Hangi sayfaların en çok ziyaret edildiği, kullanıcıların sitede ne kadar zaman geçirdiği gibi bilgileri toplarız. Bu bilgiler, web sitesinin performansını ve kullanıcı deneyimini iyileştirmek için kullanılır. (Örn: Google Analytics)
          </li>
          <li>
            <strong>İşlevsellik Çerezleri:</strong> Web sitesinin tercihlerinizi (örneğin dil seçimi, bölge) hatırlamasını sağlar ve size daha kişiselleştirilmiş bir deneyim sunar.
          </li>
          <li>
            <strong>Hedefleme ve Reklam Çerezleri:</strong> İlgi alanlarınıza daha uygun reklamlar sunmak için kullanılır. Bu çerezler, diğer web sitelerinde de sizi takip edebilir ve reklam profili oluşturabilir.
          </li>
        </ul>

        <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">3. Çerezleri Nasıl Kullanıyoruz?</h2>
        <p className="mb-4">
          Web sitemiz, yukarıda belirtilen çerez türlerini çeşitli amaçlarla kullanır:
        </p>
        <ul className="list-disc list-inside mb-4 ml-4">
          <li>Web sitesinin çalışmasını sağlamak.</li>
          <li>Kullanıcı deneyimini iyileştirmek.</li>
          <li>Web sitesi trafiğini ve kullanımını analiz etmek.</li>
          <li>İlgi alanlarınıza uygun içerik ve reklamlar sunmak.</li>
          <li>Güvenliği artırmak.</li>
        </ul>

        <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">4. Çerez Tercihlerinizi Nasıl Yönetebilirsiniz?</h2>
        <p className="mb-4">
          Çoğu web tarayıcısı çerezleri otomatik olarak kabul eder, ancak isterseniz çerezleri reddetmek veya bilgisayarınıza çerez gönderildiğinde sizi uyarmak için tarayıcı ayarlarınızı değiştirebilirsiniz. Çerezleri nasıl yöneteceğiniz hakkında daha fazla bilgi için tarayıcınızın yardım menüsüne bakın.
        </p>
        <p className="mb-4">
          Çerezleri devre dışı bırakmanın, Web Sitesinin bazı özelliklerinin düzgün çalışmamasına neden olabileceğini lütfen unutmayın.
        </p>
        <ul className="list-disc list-inside mb-4 ml-4">
          <li>Google Chrome: <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Bağlantı</a></li>
          <li>Mozilla Firefox: <a href="https://support.mozilla.org/tr/kb/cerezleri-acip-kapatma-web-sitelerinin-tercihlerini" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Bağlantı</a></li>
          <li>Microsoft Edge: <a href="https://support.microsoft.com/tr-tr/microsoft-edge/microsoft-edge-de-%C3%A7erezleri-silme-f4b6693a-cd73-75a2-6a10-b99cc04f73ce" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Bağlantı</a></li>
          <li>Safari: <a href="https://support.apple.com/tr-tr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Bağlantı</a></li>
        </ul>

        <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">5. Üçüncü Taraf Çerezleri</h2>
        <p className="mb-4">
          Web sitemiz, Google Analytics gibi üçüncü taraf hizmetlerinden çerezler kullanabilir. Bu çerezler, Web Sitesi dışındaki web sitelerinde de sizi takip edebilir ve ilgi alanlarınıza göre reklamlar sunabilir. Üçüncü taraf çerezleri hakkında daha fazla bilgi için ilgili üçüncü tarafın gizlilik ve çerez politikalarını incelemeniz önerilir.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">6. Politikadaki Değişiklikler</h2>
        <p className="mb-4">
          Bu Çerez Politikası zaman zaman güncellenebilir. Herhangi bir değişiklik durumunda, güncellenmiş politikayı bu sayfada yayınlayacağız. Önemli değişiklikler hakkında sizi bilgilendirmek için ek adımlar atabiliriz.
        </p>

        <p className="text-sm text-gray-600 mt-8">
          Son Güncelleme Tarihi: 24 Temmuz 2025
        </p>

        <p className="mt-8 text-center">
          <Link href="/" className="text-indigo-600 hover:underline">
            Ana Sayfaya Geri Dön
          </Link>
        </p>
      </div>
    </div>
    );
}