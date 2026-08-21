import Link from "next/link";

export function InfoPage({ kicker, title, intro, sections }: { kicker: string; title: string; intro: string; sections: Array<{ title: string; body: string }> }) {
  return (
    <article className="info-page shell">
      <header className="page-hero compact"><p className="kicker">{kicker}</p><h1>{title}</h1><p>{intro}</p></header>
      <div className="info-grid">{sections.map((section, index) => <section key={section.title}><span>{new Intl.NumberFormat("fa-IR", { minimumIntegerDigits: 2 }).format(index + 1)}</span><h2>{section.title}</h2><p>{section.body}</p></section>)}</div>
      <div className="info-cta"><div><h2>هنوز پرسشی دارید؟</h2><p>در مرحله اتصال پشتیبانی، راه ارتباط مستقیم و پیگیری درخواست به این بخش اضافه می‌شود.</p></div><Link href="/shop">بازگشت به فروشگاه</Link></div>
    </article>
  );
}
