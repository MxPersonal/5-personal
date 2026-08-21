import type { Product } from "@/lib/catalog";

export function ProductArtwork({ product, hero = false }: { product: Product; hero?: boolean }) {
  const gradientId = `gradient-${product.slug}`;
  const common = { fill: `url(#${gradientId})`, stroke: product.accent, strokeWidth: 5 };

  const artwork = {
    headphones: <><path d="M48 122v-17a52 52 0 0 1 104 0v17" fill="none" stroke={product.accent} strokeWidth="12" strokeLinecap="round"/><rect x="34" y="111" width="30" height="52" rx="13" {...common}/><rect x="136" y="111" width="30" height="52" rx="13" {...common}/></>,
    watch: <><rect x="82" y="16" width="36" height="168" rx="18" fill={product.accent} opacity=".2"/><rect x="57" y="54" width="86" height="92" rx="28" {...common}/><circle cx="100" cy="100" r="30" fill="#fff" opacity=".8"/><path d="M100 80v22l16 10" fill="none" stroke={product.accent} strokeWidth="5" strokeLinecap="round"/></>,
    speaker: <><rect x="56" y="24" width="88" height="152" rx="30" {...common}/><circle cx="100" cy="76" r="20" fill="#fff" opacity=".65"/><circle cx="100" cy="128" r="32" fill="#fff" opacity=".35"/><circle cx="100" cy="128" r="13" fill={product.accent}/></>,
    bag: <><path d="M45 73h110l-8 96H53Z" {...common}/><path d="M74 77V60a26 26 0 0 1 52 0v17" fill="none" stroke={product.accent} strokeWidth="8" strokeLinecap="round"/><path d="M62 104h76" stroke="#fff" strokeWidth="5" opacity=".7"/></>,
    lamp: <><path d="M58 80h84l-22-48H80Z" {...common}/><path d="M100 80v65" stroke={product.accent} strokeWidth="8"/><path d="M66 165h68" stroke={product.accent} strokeWidth="10" strokeLinecap="round"/><circle cx="100" cy="92" r="10" fill="#fff" opacity=".8"/></>,
    glasses: <><circle cx="65" cy="105" r="37" {...common}/><circle cx="135" cy="105" r="37" {...common}/><path d="M102 98c8-10 18-10 26 0M28 88 8 75m164 13 20-13" fill="none" stroke={product.accent} strokeWidth="7" strokeLinecap="round"/></>,
    mug: <><path d="M49 54h91v107a20 20 0 0 1-20 20H69a20 20 0 0 1-20-20Z" {...common}/><path d="M140 78h13a30 30 0 0 1 0 60h-13" fill="none" stroke={product.accent} strokeWidth="10"/><path d="M72 30c-10 12 10 18 0 30m30-30c-10 12 10 18 0 30" fill="none" stroke={product.accent} strokeWidth="5" strokeLinecap="round" opacity=".55"/></>,
    shoe: <><path d="M38 123c22-7 42-25 52-58 16 24 30 37 62 46 12 4 21 14 21 27v13H31c-11 0-15-21 7-28Z" {...common}/><path d="M64 113h45m-34-14h40m-29-15h32" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".72"/></>,
  }[product.artwork];

  return (
    <div className={hero ? "artwork artwork-hero" : "artwork"} style={{ background: product.accentSoft }} aria-hidden="true">
      <span className="artwork-orbit artwork-orbit-one" />
      <span className="artwork-orbit artwork-orbit-two" />
      <svg viewBox="0 0 200 200" role="presentation">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fff" stopOpacity=".95" />
            <stop offset="1" stopColor={product.accent} stopOpacity=".42" />
          </linearGradient>
        </defs>
        {artwork}
      </svg>
    </div>
  );
}
