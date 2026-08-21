export const categories = ["همه", "دیجیتال", "اکسسوری", "خانه و زندگی", "مد روزمره"] as const;

export type Category = (typeof categories)[number];
export type ProductCategory = Exclude<Category, "همه">;

export type Product = {
  id: number;
  slug: string;
  name: string;
  englishName: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  accent: string;
  accentSoft: string;
  artwork: "headphones" | "watch" | "speaker" | "bag" | "lamp" | "glasses" | "mug" | "shoe";
  shortDescription: string;
  description: string;
  features: string[];
};

export const products: Product[] = [
  {
    id: 1,
    slug: "aura-pro-headphones",
    name: "هدفون بی‌سیم Aura Pro",
    englishName: "Aura Pro",
    category: "دیجیتال",
    price: 2_890_000,
    compareAtPrice: 3_290_000,
    badge: "پرفروش",
    accent: "#153f36",
    accentSoft: "#dcefe6",
    artwork: "headphones",
    shortDescription: "صدای شفاف، حذف نویز هوشمند و طراحی سبک برای تمام روز.",
    description: "Aura Pro برای شنیدن جزئیاتی ساخته شده که معمولاً از دست می‌روند؛ با طراحی مینیمال، اتصال پایدار و بالشتک‌های نرم که در استفاده طولانی خسته‌کننده نیستند.",
    features: ["حذف نویز فعال", "تا ۳۲ ساعت شارژدهی", "اتصال هم‌زمان به دو دستگاه", "ضمانت اصالت کالا"],
  },
  {
    id: 2,
    slug: "nox-minimal-watch",
    name: "ساعت مینیمال Nox",
    englishName: "Nox Watch",
    category: "اکسسوری",
    price: 1_950_000,
    accent: "#8f4e34",
    accentSoft: "#f4dfd2",
    artwork: "watch",
    shortDescription: "فرم آرام، صفحه خوانا و بند نرم برای استفاده روزمره.",
    description: "Nox یک ساعت بی‌زمان با جزئیات کنترل‌شده است؛ نه بیش‌ازحد رسمی و نه کاملاً اسپرت، برای کسانی که سادگی را آگاهانه انتخاب می‌کنند.",
    features: ["بدنه استیل", "شیشه مقاوم", "بند قابل تعویض", "مقاوم در برابر پاشش آب"],
  },
  {
    id: 3,
    slug: "mini-portable-speaker",
    name: "اسپیکر همراه Mini",
    englishName: "Mini Speaker",
    category: "دیجیتال",
    price: 1_490_000,
    compareAtPrice: 1_790_000,
    badge: "۱۵٪ تخفیف",
    accent: "#5c477f",
    accentSoft: "#e5def1",
    artwork: "speaker",
    shortDescription: "صدای پرقدرت در ابعادی کوچک، مناسب خانه و سفر.",
    description: "Mini با وجود ابعاد جمع‌وجور، صدایی متعادل و واضح ارائه می‌دهد و با بدنه مقاوم و باتری بادوام برای حرکت طراحی شده است.",
    features: ["صدای ۳۶۰ درجه", "۱۲ ساعت شارژدهی", "مقاوم در برابر آب", "اتصال Bluetooth 5.3"],
  },
  {
    id: 4,
    slug: "canvas-daily-bag",
    name: "کیف روزمره Canvas",
    englishName: "Canvas Daily",
    category: "مد روزمره",
    price: 1_180_000,
    accent: "#66512f",
    accentSoft: "#eae0cc",
    artwork: "bag",
    shortDescription: "سبک، جادار و مناسب رفت‌وآمدهای هر روز.",
    description: "Canvas Daily با پارچه ضخیم، دوخت تقویت‌شده و فضای داخلی منظم، همراه ساده‌ای برای کار، دانشگاه و خریدهای روزمره است.",
    features: ["پارچه مقاوم", "جیب داخلی زیپ‌دار", "بند قابل تنظیم", "قابل شست‌وشو"],
  },
  {
    id: 5,
    slug: "halo-desk-lamp",
    name: "چراغ مطالعه Halo",
    englishName: "Halo Lamp",
    category: "خانه و زندگی",
    price: 840_000,
    badge: "جدید",
    accent: "#315c67",
    accentSoft: "#dcebf0",
    artwork: "lamp",
    shortDescription: "نور گرم و قابل تنظیم برای میز کار و گوشه مطالعه.",
    description: "Halo با نور یکنواخت و بدون لرزش، فضای کار را آرام‌تر می‌کند. بازوی قابل تنظیم آن نور را دقیقاً به جایی می‌رساند که نیاز دارید.",
    features: ["سه شدت نور", "دمای رنگ گرم", "مصرف انرژی پایین", "بازوی قابل تنظیم"],
  },
  {
    id: 6,
    slug: "urban-sunglasses",
    name: "عینک آفتابی Urban",
    englishName: "Urban Shade",
    category: "اکسسوری",
    price: 1_290_000,
    compareAtPrice: 1_450_000,
    accent: "#754957",
    accentSoft: "#eedcdf",
    artwork: "glasses",
    shortDescription: "فریم سبک و لنز محافظ برای روزهای روشن شهر.",
    description: "Urban با فریم متعادل و لنزهای استاندارد UV400 طراحی شده تا بدون شلوغی بصری، استایل روزمره را کامل کند.",
    features: ["محافظت UV400", "فریم سبک", "لولاهای تقویت‌شده", "همراه با کیف محافظ"],
  },
  {
    id: 7,
    slug: "calm-ceramic-mug",
    name: "ماگ سرامیکی Calm",
    englishName: "Calm Mug",
    category: "خانه و زندگی",
    price: 390_000,
    accent: "#4f6649",
    accentSoft: "#dfe7dc",
    artwork: "mug",
    shortDescription: "فرم دست‌ساز و لعاب مات برای لحظه‌های آرام روز.",
    description: "Calm با حجم مناسب و دسته خوش‌فرم، برای قهوه صبح یا چای عصر ساخته شده و لعاب مات آن هر قطعه را کمی منحصربه‌فرد می‌کند.",
    features: ["سرامیک مقاوم", "لعاب بدون سرب", "قابل استفاده در مایکروویو", "حجم ۳۵۰ میلی‌لیتر"],
  },
  {
    id: 8,
    slug: "move-daily-shoes",
    name: "کفش روزمره Move",
    englishName: "Move Everyday",
    category: "مد روزمره",
    price: 2_480_000,
    badge: "محبوب",
    accent: "#6b6334",
    accentSoft: "#eee9c9",
    artwork: "shoe",
    shortDescription: "کفی نرم و فرم سبک برای قدم‌های طولانی روزمره.",
    description: "Move با ترکیب رویه تنفس‌پذیر و کفی منعطف، برای حرکت پیوسته در شهر طراحی شده و ظاهر ساده آن با لباس‌های مختلف هماهنگ می‌شود.",
    features: ["رویه تنفس‌پذیر", "کفی طبی نرم", "زیره ضدلغزش", "وزن سبک"],
  },
];

const persianNumber = new Intl.NumberFormat("fa-IR");

export const formatPrice = (value: number) => `${persianNumber.format(value)} تومان`;

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
