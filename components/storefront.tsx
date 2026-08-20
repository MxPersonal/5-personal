"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  icon: string;
  color: string;
};

const products: Product[] = [
  { id: 1, name: "هدفون بی‌سیم Aura", category: "دیجیتال", price: 2890000, oldPrice: 3290000, badge: "پرفروش", icon: "🎧", color: "mint" },
  { id: 2, name: "ساعت مینیمال Nox", category: "اکسسوری", price: 1950000, icon: "⌚", color: "peach" },
  { id: 3, name: "اسپیکر همراه Mini", category: "دیجیتال", price: 1490000, oldPrice: 1790000, badge: "۱۵٪ تخفیف", icon: "🔊", color: "lilac" },
  { id: 4, name: "کیف روزمره Canvas", category: "مد و پوشاک", price: 1180000, icon: "👜", color: "sand" },
  { id: 5, name: "چراغ مطالعه Halo", category: "خانه", price: 840000, badge: "جدید", icon: "💡", color: "sky" },
  { id: 6, name: "عینک آفتابی Urban", category: "اکسسوری", price: 1290000, oldPrice: 1450000, icon: "🕶️", color: "rose" },
  { id: 7, name: "ماگ سرامیکی Calm", category: "خانه", price: 390000, icon: "☕", color: "sage" },
  { id: 8, name: "کفش روزمره Move", category: "مد و پوشاک", price: 2480000, badge: "محبوب", icon: "👟", color: "lemon" },
];

const categories = ["همه", "دیجیتال", "اکسسوری", "مد و پوشاک", "خانه"];
const money = new Intl.NumberFormat("fa-IR");

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    bag: <><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    arrow: <><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function Storefront() {
  const [category, setCategory] = useState("همه");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(() => products.filter((product) =>
    (category === "همه" || product.category === category) &&
    product.name.includes(query.trim())
  ), [category, query]);

  const addToCart = (product: Product) => {
    setCart((current) => [...current, product]);
    setCartOpen(true);
  };

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <main>
      <div className="announcement">ارسال رایگان برای سفارش‌های بالای ۲ میلیون تومان</div>
      <header className="header shell">
        <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="منو"><Icon name="menu" /></button>
        <a className="logo" href="#">نُوین<span>.</span></a>
        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#products">فروشگاه</a><a href="#story">داستان ما</a><a href="#benefits">خدمات</a><a href="#footer">تماس</a>
        </nav>
        <div className="header-actions">
          <label className="search"><Icon name="search" size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جست‌وجو" aria-label="جست‌وجوی محصول" /></label>
          <button className="icon-button hide-mobile" aria-label="حساب کاربری"><Icon name="user" /></button>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="سبد خرید"><Icon name="bag"/><span>{money.format(cart.length)}</span></button>
        </div>
      </header>

      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">انتخاب‌های تازه برای زندگی امروز</p>
          <h1>ساده انتخاب کن.<br/><em>خاص</em> زندگی کن.</h1>
          <p className="hero-text">مجموعه‌ای دست‌چین‌شده از محصولات کاربردی، زیبا و باکیفیت؛ برای روزهایی که جزئیات تفاوت می‌سازند.</p>
          <a className="primary-button" href="#products">مشاهده محصولات <Icon name="arrow" size={19}/></a>
          <div className="stats"><div><strong>+۱۲۰</strong><span>محصول منتخب</span></div><div><strong>۴.۹</strong><span>رضایت مشتریان</span></div><div><strong>۲۴/۷</strong><span>پشتیبانی</span></div></div>
        </div>
        <div className="hero-visual" aria-label="محصول ویژه">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
          <span className="hero-object">🎧</span>
          <div className="floating-card"><span>انتخاب هفته</span><strong>Aura Pro</strong><small>صدایی فراتر از انتظار</small></div>
          <div className="floating-tag">ضمانت اصالت کالا <Icon name="check" size={15}/></div>
        </div>
      </section>

      <section className="benefits shell" id="benefits">
        <div><b>۰۱</b><span><strong>ارسال سریع</strong><small>به سراسر ایران</small></span></div>
        <div><b>۰۲</b><span><strong>پرداخت امن</strong><small>درگاه معتبر بانکی</small></span></div>
        <div><b>۰۳</b><span><strong>هفت روز ضمانت</strong><small>بازگشت بی‌دردسر</small></span></div>
      </section>

      <section className="products-section shell" id="products">
        <div className="section-heading"><div><p className="eyebrow">محبوب‌ترین‌ها</p><h2>برای شما انتخاب کردیم</h2></div><p>کالاهایی که کیفیت، طراحی و ارزش خرید را کنار هم دارند.</p></div>
        <div className="filters">{categories.map((item) => <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="product-grid">
          {filtered.map((product) => (
            <article className="product-card" key={product.id}>
              <div className={`product-image ${product.color}`}>
                {product.badge && <span className="badge">{product.badge}</span>}
                <span className="product-emoji">{product.icon}</span>
                <button className="quick-add" onClick={() => addToCart(product)} aria-label={`افزودن ${product.name}`}><Icon name="plus"/></button>
              </div>
              <div className="product-info"><small>{product.category}</small><h3>{product.name}</h3><div className="price"><strong>{money.format(product.price)} تومان</strong>{product.oldPrice && <del>{money.format(product.oldPrice)}</del>}</div></div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <div className="empty">محصولی با این عبارت پیدا نشد.</div>}
      </section>

      <section className="story shell" id="story">
        <div className="story-art"><span>✦</span><div>زیبایی در<br/>سادگی‌ست.</div></div>
        <div className="story-copy"><p className="eyebrow">داستان نُوین</p><h2>کمتر، اما بهتر.</h2><p>ما باور داریم خرید خوب از میان انبوه گزینه‌ها اتفاق نمی‌افتد؛ از انتخاب دقیق می‌آید. هر محصول در نُوین با معیار کیفیت، کاربرد و طراحی ماندگار انتخاب شده است.</p><a href="#products">بیشتر درباره ما <Icon name="arrow" size={18}/></a></div>
      </section>

      <footer id="footer"><div className="shell footer-grid"><div><a className="logo light" href="#">نُوین<span>.</span></a><p>انتخاب‌های ساده برای یک زندگی زیباتر.</p></div><div><strong>دسترسی سریع</strong><a href="#products">محصولات</a><a href="#story">درباره ما</a></div><div><strong>پشتیبانی</strong><a href="#">راهنمای خرید</a><a href="#">شرایط بازگشت</a></div><div><strong>خبرنامه</strong><p>از تازه‌ها و تخفیف‌ها باخبر شوید.</p><form onSubmit={(e) => e.preventDefault()}><input type="email" placeholder="ایمیل شما"/><button aria-label="عضویت"><Icon name="arrow"/></button></form></div></div><div className="copyright shell">© ۱۴۰۵ نُوین شاپ — ساخته‌شده با Next.js</div></footer>

      {cartOpen && <><button className="overlay" onClick={() => setCartOpen(false)} aria-label="بستن سبد"/><aside className="cart-drawer"><div className="cart-head"><h2>سبد خرید <span>({money.format(cart.length)})</span></h2><button className="icon-button" onClick={() => setCartOpen(false)}><Icon name="close"/></button></div><div className="cart-items">{cart.length === 0 ? <div className="cart-empty"><Icon name="bag" size={42}/><p>سبد خرید شما خالی است.</p></div> : cart.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><span className={`mini-product ${item.color}`}>{item.icon}</span><div><strong>{item.name}</strong><small>{money.format(item.price)} تومان</small></div><button onClick={() => setCart((current) => current.filter((_, i) => i !== index))}>حذف</button></div>)}</div><div className="cart-footer"><div><span>مجموع</span><strong>{money.format(total)} تومان</strong></div><button disabled={!cart.length}>ادامه فرایند خرید</button><small>نسخه نمایشی — درگاه پرداخت متصل نیست.</small></div></aside></>}
    </main>
  );
}
