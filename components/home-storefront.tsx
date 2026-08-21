import Link from "next/link";
import { products } from "@/lib/catalog";
import { Icon } from "./icon";
import { ProductArtwork } from "./product-artwork";
import { ProductCard } from "./product-card";

const featured = products.slice(0, 4);
const heroProduct = products[0];

export function HomeStorefront() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="kicker">کالکشن روزمره ۱۴۰۵</p>
          <h1>ساده انتخاب کن.<br/><em>خوب</em> زندگی کن.</h1>
          <p className="hero-text">محصولات کاربردی و خوش‌ساختی که از میان گزینه‌های زیاد انتخاب شده‌اند؛ برای خانه، کار و لحظه‌های شخصی شما.</p>
          <div className="hero-actions"><Link className="primary-button" href="/shop">خرید کالکشن <Icon name="arrow" size={19}/></Link><Link className="text-link" href="#story">داستان انتخاب‌های ما</Link></div>
          <dl className="stats"><div><dt>+۱۲۰</dt><dd>محصول بررسی‌شده</dd></div><div><dt>۴.۹</dt><dd>امتیاز خریداران</dd></div><div><dt>۷ روز</dt><dd>فرصت بازگشت</dd></div></dl>
        </div>
        <div className="hero-product">
          <ProductArtwork product={heroProduct} hero/>
          <div className="hero-label"><span>انتخاب این هفته</span><strong>{heroProduct.englishName}</strong><small>{heroProduct.shortDescription}</small></div>
          <div className="quality-pill"><Icon name="check" size={15}/> بررسی کیفیت پیش از ارسال</div>
        </div>
      </section>

      <section id="services" className="benefits shell" aria-label="مزایای خرید از نُوین">
        <div><b>۰۱</b><span><strong>انتخاب دقیق</strong><small>هر محصول قبل از عرضه بررسی می‌شود</small></span></div>
        <div><b>۰۲</b><span><strong>ارسال قابل پیگیری</strong><small>بسته‌بندی امن به سراسر ایران</small></span></div>
        <div><b>۰۳</b><span><strong>بازگشت ساده</strong><small>هفت روز فرصت تصمیم‌گیری</small></span></div>
      </section>

      <section className="products-section shell" aria-labelledby="featured-heading">
        <div className="section-heading"><div><p className="kicker">منتخب این هفته</p><h2 id="featured-heading">کمتر بگرد، بهتر انتخاب کن.</h2></div><div><p>چهار انتخاب محبوب که کیفیت، طراحی و ارزش خرید را کنار هم دارند.</p><Link className="text-link" href="/shop">مشاهده همه محصولات <Icon name="arrow" size={16}/></Link></div></div>
        <div className="product-grid">{featured.map((product) => <ProductCard product={product} key={product.id}/>)}</div>
      </section>

      <section id="story" className="story shell">
        <div className="story-art"><span className="story-mark">ن</span><p>Good things<br/>take time.</p><small>انتخاب خوب عجله نمی‌خواهد.</small></div>
        <div className="story-copy"><p className="kicker">فلسفه نُوین</p><h2>هر چیزی ارزش خریدن ندارد.</h2><p>ما میان انبوه گزینه‌ها می‌گردیم، کیفیت و کاربرد را بررسی می‌کنیم و فقط محصولاتی را نگه می‌داریم که واقعاً چیزی به زندگی روزمره اضافه کنند. نُوین درباره بیشتر خریدن نیست؛ درباره بهتر انتخاب‌کردن است.</p><ul><li><Icon name="check" size={16}/> مشخصات شفاف و بدون اغراق</li><li><Icon name="check" size={16}/> قیمت‌گذاری روشن و منصفانه</li><li><Icon name="check" size={16}/> پشتیبانی قبل و بعد از خرید</li></ul><Link className="primary-button secondary" href="/shop">دیدن انتخاب‌های نُوین <Icon name="arrow" size={18}/></Link></div>
      </section>
    </>
  );
}
