import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";

export function SiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="logo light" href="/">نُوین<span>.</span></Link>
          <p>انتخاب‌های دقیق برای زندگی آرام‌تر، زیباتر و کاربردی‌تر.</p>
          <div className="footer-promise"><span>ارسال سراسری</span><span>ضمانت اصالت</span><span>پشتیبانی واقعی</span></div>
        </div>
        <div><strong>فروشگاه</strong><Link href="/shop">همه محصولات</Link><Link href="/shop?category=دیجیتال">دیجیتال</Link><Link href="/shop?category=خانه%20و%20زندگی">خانه و زندگی</Link></div>
        <div><strong>راهنما</strong><Link href="/shipping">ارسال و تحویل</Link><Link href="/returns">شرایط بازگشت</Link><Link href="/support">پشتیبانی</Link></div>
        <div className="newsletter"><strong>نامه‌های کوتاه نُوین</strong><p>ماهانه یک ایمیل درباره محصول تازه و انتخاب بهتر.</p><NewsletterForm/><small>بدون پیام اضافه؛ لغو عضویت با یک کلیک.</small></div>
      </div>
      <div className="shell copyright"><span>© ۱۴۰۵ نُوین — تمامی حقوق محفوظ است.</span><span>طراحی‌شده برای یک خرید آگاهانه</span></div>
    </footer>
  );
}
