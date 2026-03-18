export interface BlogPost {
  slug: string
  title: string
  category: string
  categoryColor: string
  excerpt: string
  date: string
  readTime: string
  image: string
  content: BlogSection[]
  tags: string[]
}

export interface BlogSection {
  type: "paragraph" | "heading" | "subheading" | "quote" | "list" | "callout"
  text?: string
  items?: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "kas-hipertrofisi-icin-gercek-antrenman-sikligi",
    title: "Kas Hipertrofisi İçin Gerçek Antrenman Sıklığı",
    category: "ANTRENMAN",
    categoryColor: "bg-primary text-black",
    excerpt:
      "Haftada 5 mi, 4 mü, 3 mü? Antrenman sıklığı sorusunun bilimsel cevabı — ve neden çoğu insanın yaptığı yanlış.",
    date: "14 Mart 2026",
    readTime: "7 dk okuma",
    image: "/images/blog-antrenman-sikligi.png",
    tags: ["Hipertrofi", "Antrenman Planı", "Bilim"],
    content: [
      {
        type: "paragraph",
        text: "Spor salonuna her gün giden ama kas kütlesi kazanamayan insanlar var. Haftada 3 gün çalışan ama sürekli gelişen başkaları. Fark nerede? Antrenman sıklığı mı, yoksa başka bir şey mi?",
      },
      {
        type: "heading",
        text: "Önce Temel Bir Kavram: Protein Sentezi Penceresi",
      },
      {
        type: "paragraph",
        text: "Bir kası çalıştırdığında vücudun protein sentezi 24-48 saat yükselmiş kalır. Bu, kasın büyüme fırsatı penceresidir. Bu pencere kapandıktan sonra aynı kası tekrar uyarmazsan, tavan hızınla büyüyemezsin.",
      },
      {
        type: "subheading",
        text: "Bilim Ne Diyor?",
      },
      {
        type: "paragraph",
        text: "2016'da yayınlanan Schoenfeld meta-analizi açık: Haftada 2 kez çalışılan kaslar, haftada 1 kez çalışılanlara kıyasla anlamlı derecede daha fazla büyüyor. Aynı haftalık volüm dağıtıldığında bile sıklık avantaj sağlıyor.",
      },
      {
        type: "quote",
        text: "\"Haftada 10 seti tek seferde yapmak ile 2×5 set olarak bölmek arasında fark var. Protein sentezi eşit dağılımda daha verimli çalışır.\" — Dr. Brad Schoenfeld",
      },
      {
        type: "heading",
        text: "Pratik Antrenman Sıklığı Rehberi",
      },
      {
        type: "list",
        items: [
          "Yeni Başlayanlar (0–1 yıl): Haftada 3 tam vücut antrenmanı ideal",
          "Orta Seviye (1–3 yıl): Haftada 4 gün, üst/alt ayrımı veya push-pull-legs",
          "İleri Seviye (3+ yıl): Haftada 5–6 gün, her kas grubu 2 kez",
          "Her seviyede: Toparlanma antrenman kadar kritik",
        ],
      },
      {
        type: "callout",
        text: "Altın Kural: Haftalık toplam setleri artır, ama her oturumda sinirsel yorgunluğu minimumda tut. Kas grubu başına oturum başı 5–8 set yeterli.",
      },
      {
        type: "heading",
        text: "\"Overtraining\" Gerçekten Var mı?",
      },
      {
        type: "paragraph",
        text: "Evet, var. Ama çoğu insan overtraining değil, under-recovery yaşıyor. Uyku 7 saatin altında, beslenme yetersiz, stres yüksek — bu koşullarda sıklığı artırsan gelişemezsin. Önce toparlanmayı düzelt, sonra sıklığı artır.",
      },
      {
        type: "subheading",
        text: "Platoda Mısın? Sıklığı Artır",
      },
      {
        type: "paragraph",
        text: "Eğer aynı programı 12 haftadan uzun süredir yapıyorsan ve gelişim durmuşsa, büyük ihtimalle sıklık sorunu yaşıyorsundur. Her kas grubunu haftada 2 kez çalışacak şekilde programını yeniden düzenle ve 6 hafta sonra farkı gör.",
      },
    ],
  },
  {
    slug: "definasyon-doneminde-kas-kaybini-onlemenin-5-yolu",
    title: "Definasyon Döneminde Kas Kaybını Önlemenin 5 Yolu",
    category: "BESLENME",
    categoryColor: "bg-blue-500 text-white",
    excerpt:
      "Kalori açığındayken kas kütleni nasıl korursun? Bilimsel temelli 5 strateji ile definasyon sürecini daha akıllıca yönet.",
    date: "28 Şubat 2026",
    readTime: "8 dk okuma",
    image: "/images/blog-definasyon.png",
    tags: ["Definasyon", "Beslenme", "Kas Koruma"],
    content: [
      {
        type: "paragraph",
        text: "Birçok kişi definasyon dönemine girdiğinde hem yağ hem kas kaybeder. Aynaya baktığında zayıf görünür, güçten düşer. Bu, yanlış yapılan bir definasyonun sonucudur. Doğru yapıldığında kas kütlesini neredeyse tamamen koruyarak yağ yakabilirsin.",
      },
      {
        type: "heading",
        text: "1. Kalori Açığını Kademeli Tut",
      },
      {
        type: "paragraph",
        text: "TDEE'nin %20'sinden fazla açık oluşturma. Haftada 0.5–1 kg kayıp ideal hızdır. Daha hızlı kilo vermeye çalışırsan vücut enerji için kasa başvurur. Agresif diyet — sert kas kaybı.",
      },
      {
        type: "heading",
        text: "2. Protein Alımını Yükselt",
      },
      {
        type: "paragraph",
        text: "Definasyon döneminde protein ihtiyacın artar, azalmaz. Kas koruması için vücut ağırlığının kilogramı başına en az 2–2.5 gram protein tüket. Bu, kas protein sentezini yüksek tutarak katabolizmi yavaşlatır.",
      },
      {
        type: "quote",
        text: "\"Protein, definasyonun en ucuz ve en etkili 'anabolik' silahıdır. Az protein = kas kaybı kaçınılmaz.\"",
      },
      {
        type: "heading",
        text: "3. Ağırlık Antrenmanını Bırakma",
      },
      {
        type: "paragraph",
        text: "Çoğu insan definasyona geçince 'hafif ağırlık, çok tekrar' moduna girer. Bu hata. Ağır çalışmak kasın korunması için sinirsel uyarı sağlar. Mümkün olduğunca antrenman yoğunluğunu koru.",
      },
      {
        type: "list",
        items: [
          "Temel bileşik hareketleri programdan çıkarma (squat, deadlift, bench)",
          "Ağırlıkları en az %90 seviyesinde tut",
          "Tekrar sayısını artırmak yerine yoğunluğu koru",
          "Kardio'yu antrenman üstüne çok yığma — ayrı tutmaya çalış",
        ],
      },
      {
        type: "heading",
        text: "4. Refeed Günleri Ekle",
      },
      {
        type: "paragraph",
        text: "Sürekli açıkta kalmak leptin seviyelerini düşürür ve metabolizmanı yavaşlatır. Haftada 1 gün TDEE kadar ya da biraz üzerinde yemek (özellikle karbonhidrat ağırlıklı) hem metabolizmayı hem de motivasyonu sıfırlar.",
      },
      {
        type: "callout",
        text: "Refeed = Cheat day değil! Refeed kalorisi TDEE etrafında kalır, sağlıklı karbonhidrat kaynaklarıyla yapılır. Pizza ve burger değil — pirinç, patates, yulaf.",
      },
      {
        type: "heading",
        text: "5. Uyku ve Kortizol Yönetimi",
      },
      {
        type: "paragraph",
        text: "Uyku 6 saatin altına düştüğünde kortizol yükselir. Kortizol, hem yağ depolamayı artırır hem de kas yıkımını hızlandırır. Definasyonun en çok sabote edilen kısmı uyku ve stres yönetimidir. 7–9 saat uyku, definasyonun sessiz süperpusulanı.",
      },
    ],
  },
  {
    slug: "sabah-kardiyo-gercekten-yag-yakar-mi",
    title: "Sabah Kardiyo Efsanesi: Gerçekten Yağ Yakar mı?",
    category: "ANTRENMAN",
    categoryColor: "bg-primary text-black",
    excerpt:
      "\"Aç karnına sabah koşusu daha fazla yağ yakar\" tezi yıllardır fitness dünyasında dolaşıyor. Bilim ne diyor?",
    date: "10 Şubat 2026",
    readTime: "6 dk okuma",
    image: "/images/blog-sabah-kardiyo.png",
    tags: ["Kardiyo", "Yağ Yakımı", "Bilim"],
    content: [
      {
        type: "paragraph",
        text: "Sabah 6'da kalkan, kahvaltı yapmadan koşu bandına atlayan insanları gördün mü? 'Aç karnına kardiyo daha fazla yağ yakar' efsanesi bunları motive ediyor. Gerçek biraz daha karmaşık.",
      },
      {
        type: "heading",
        text: "Teori Nedir?",
      },
      {
        type: "paragraph",
        text: "Sabah uyanıldığında glikojen seviyeleri düşüktür. Bu durumda yapılan kardiyo, enerji için önce yağ depolarını kullanır — teori bu. Kulağa mantıklı geliyor, ancak vücut o kadar basit çalışmıyor.",
      },
      {
        type: "heading",
        text: "Araştırmalar Ne Söylüyor?",
      },
      {
        type: "paragraph",
        text: "2014 yılında Journal of Strength and Conditioning Research'te yayınlanan çalışma: Aynı kalori yakımıyla karşılaştırıldığında, aç karnına ve tok karnına kardiyo arasında toplam yağ kaybı açısından anlamlı fark yok.",
      },
      {
        type: "quote",
        text: "\"Önemli olan anlık olarak ne yakıldığı değil, 24 saatlik enerji dengesidir. Vücut homeostatik bir sistemdir.\" — Lyle McDonald",
      },
      {
        type: "subheading",
        text: "Ama Neden İnsanlar İyi Sonuç Alıyor?",
      },
      {
        type: "paragraph",
        text: "Sabah kardiyoyu tercih edenler genellikle daha az kesinti yaşıyor. Sabah kalkıp yapmak bir alışkanlık oluşturuyor ve tutarlılık her şeyin üstünde. Ayrıca aç karnına egzersiz bazı insanlarda iştahı kontrol etmeyi kolaylaştırıyor.",
      },
      {
        type: "callout",
        text: "Sonuç: Sabah kardiyo sihirli bir yağ yakıcı değil, ama sabah rutini oluşturmak için harika bir araç. Yapabiliyorsan yap — ama yapamazsan akşam da aynı derecede etkili.",
      },
      {
        type: "heading",
        text: "Peki Kas Kaybı Riski Var mı?",
      },
      {
        type: "paragraph",
        text: "Uzun süreli, yüksek yoğunluklu aç karına kardiyo kas kaybına yol açabilir. Özellikle 45 dakikanın üzerindeyse BCAA veya whey protein alabileceğin kadar almak iyi bir strateji. Düşük yoğunluklu, kısa süreli (20–30 dk) LISS kardio için bu risk minimal.",
      },
      {
        type: "list",
        items: [
          "30 dk altı düşük yoğunluklu: Güvenli, kas kaybı riski düşük",
          "45 dk+ yüksek yoğunluklu: BCAA almayı düşün",
          "HIIT aç karnına: Önerilmez — performans düşer, stres hormonu artar",
          "Her durumda: Günlük toplam kalori dengesi en belirleyici faktör",
        ],
      },
    ],
  },
  {
    slug: "protein-zamanlamasi-ne-zaman-yersen-onemli-mi",
    title: "Protein Zamanlaması: Ne Zaman Yersen O Kadar Önemli mi?",
    category: "BESLENME",
    categoryColor: "bg-blue-500 text-white",
    excerpt:
      "Antrenman sonrası 30 dakika içinde protein yemezsen kas kaybeder misin? Anabolik pencere efsanesinin gerçeği.",
    date: "25 Ocak 2026",
    readTime: "7 dk okuma",
    image: "/images/blog-protein.png",
    tags: ["Protein", "Beslenme", "Anabolik Pencere"],
    content: [
      {
        type: "paragraph",
        text: "Antrenman biter bitmez çantadan protein shake çıkaran insanları herkes gördü. \"30 dakikada yemezsen kaslar yanacak\" şeklinde bir inanç var. Bu ne kadar doğru?",
      },
      {
        type: "heading",
        text: "Anabolik Pencere Nedir?",
      },
      {
        type: "paragraph",
        text: "Antrenman sonrasında vücut protein sentezine daha duyarlı hale gelir. Bu döneme 'anabolik pencere' ya da 'fırsat penceresi' denir. Sorun şu: Bu pencerenin 30 dakika olmadığı, aslında 4–6 saat sürdüğü biliniyor.",
      },
      {
        type: "quote",
        text: "\"Anabolik pencere kapıyı aralamış bir evdir, sonlamış bir fırsat değil.\" — Alan Aragon",
      },
      {
        type: "heading",
        text: "Asıl Önemli Olan: Günlük Toplam Protein",
      },
      {
        type: "paragraph",
        text: "Araştırmalar tutarlı bir şekilde şunu gösteriyor: Günlük toplam protein alımı, zamanlama kaygısından çok daha fazla önem taşıyor. Günde 160 gram protein alıyorsan ve bunu öğünlere böldüysen, shake'i antrenman sonrası 30 dakika ya da 2 saat içinde içmen anlamlı fark yaratmıyor.",
      },
      {
        type: "subheading",
        text: "Ne Zaman Gerçekten Önemli?",
      },
      {
        type: "paragraph",
        text: "Antrenmandan önce veya sonra uzun süre aç kalıyorsan zamanlama önem kazanıyor. Sabah aç karnına antrene olup, öğlene kadar yemek yemeyeceksen, antrenmandan hemen sonra protein almak mantıklı. Ama 2 saat önce yediysen ve antrenmandan 2 saat sonra yiyeceksen — panik yok.",
      },
      {
        type: "list",
        items: [
          "Önce hedef: Kilogram başına 2–2.5 gram günlük protein",
          "Öğünlere böl: 3–5 öğünde 30–50 gram protein",
          "Antrenman etrafında: Hem öncesi hem sonrası 2 saatlik pencere yeterli",
          "Uyku öncesi: Kazein protein (yavaş sindirilen) gece toparlanmayı destekler",
        ],
      },
      {
        type: "callout",
        text: "Pratik Kural: Antrenmanın 2 saati içinde bir protein kaynağı ye. Bu shake olmak zorunda değil — tavuk, yumurta, süzme peynir de olur.",
      },
      {
        type: "heading",
        text: "Her Öğünde Ne Kadar Protein?",
      },
      {
        type: "paragraph",
        text: "Maksimum protein sentezi için öğün başına 20–40 gram protein yeterli. Bundan fazlası oksidasyona gider (enerji olarak yakılır). Bu yüzden 100 gram proteini tek öğünde yutmak yerine, birkaç öğüne yaymak çok daha verimli.",
      },
    ],
  },
  {
    slug: "zihin-kasini-gelistir-mental-guc-insaa-etmek",
    title: "Zihin Kasını Geliştir: Mental Güç İnşa Etmek",
    category: "MENTAL",
    categoryColor: "bg-red-600 text-white",
    excerpt:
      "Zor setin ortasında aklın seni durdurmaya çalışır. Beden hazır olsa bile beyin dur der. İşte bu sinyalin nasıl aşıldığı.",
    date: "8 Ocak 2026",
    readTime: "6 dk okuma",
    image: "/images/blog-mental.png",
    tags: ["Mental Güç", "Disiplin", "Psikoloji"],
    content: [
      {
        type: "paragraph",
        text: "Squat sağrındasın, ağırlık omuzunda, bacaklar yanıyor. Tam o anda bir ses duyarsın: \"Yeter, bırak.\" Bu ses senden değil, beyinden geliyor. Ve çoğu zaman yalan söylüyor.",
      },
      {
        type: "heading",
        text: "Beyin Neden \"Dur\" Der?",
      },
      {
        type: "paragraph",
        text: "İnsan beyni evrim sürecinde hayatta kalmak için programlandı. Enerji harcamak tehlikeliydi; kaynaklara ulaşmak belirsizdi. Bu yüzden beyin zorlandığında koruyucu sinyaller gönderir: yorgunluk, acı, 'yeter' hissi. Bunların büyük kısmı gerçek fiziksel sınır değil, koruyucu mekanizma.",
      },
      {
        type: "quote",
        text: "\"Vücut hep zihnin izniyle durur. Gerçek fiziksel başarısızlık, hissedilenden çok sonra gelir.\" — Dr. Samuele Marcora",
      },
      {
        type: "heading",
        text: "Mental Direnç Geliştirilir",
      },
      {
        type: "paragraph",
        text: "İyi haber şu: Fiziksel kas gibi mental güç de antrenmanla gelişir. Zor bir sette bir tekrar daha yapmak, zorlu bir koşuda 500 metre daha gitmek — bunlar aynı zamanda zihinsel antrenman.",
      },
      {
        type: "subheading",
        text: "Pratik Teknikler",
      },
      {
        type: "list",
        items: [
          "5 Saniye Kuralı: Bırakmak istediğinde 5'ten geri say — beyin bu sürede karar değiştirir",
          "Mikro Hedefler: 'Şu seti bitir, sonrasını düşünme' — büyük hedefi küçük anlara böl",
          "Nefes Kontrolü: Zorlu anlarda düzgün nefes almak kortizol düşürür",
          "Görselleştirme: Hareketi yapmadan önce zihinsel olarak tamamla",
          "Olumsuz Söylem: 'Yapamam' yerine 'Bu zor ama biterken ne hissederim'",
        ],
      },
      {
        type: "callout",
        text: "Disiplin, motivasyonun yokluğunda çalışan sistemdir. Motivasyon hissetmiyorsun — sistemi başlat. Sistem başlayınca motivasyon gelir, ters değil.",
      },
      {
        type: "heading",
        text: "Ağırlık Salonu Bir Zihin Okulu",
      },
      {
        type: "paragraph",
        text: "Spor salonunda öğrendiğin zihinsel dayanıklılık sadece egzersimle sınırlı kalmaz. Zor iş toplantıları, sıkıcı dönemler, başarısızlık anları — bunların hepsinde salonda inşa ettiğin mental kas devreye girer. Demir, en iyi mental koçtur.",
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
