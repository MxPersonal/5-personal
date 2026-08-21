import Link from "next/link";
import { signOutAction } from "@/app/auth-actions";

type Item = { href: string; label: string };
export function DashboardShell({ title, subtitle, items, children }: { title: string; subtitle: string; items: Item[]; children: React.ReactNode }) {
  return <div className="dashboard shell"><aside className="dashboard-sidebar"><div><p className="kicker">فضای اختصاصی</p><h1>{title}</h1><p>{subtitle}</p></div><nav aria-label="منوی پنل">{items.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><form action={signOutAction}><button type="submit">خروج امن از حساب</button></form></aside><div className="dashboard-content">{children}</div></div>;
}

export function DashboardHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return <header className="dashboard-header"><div><p className="kicker">{eyebrow}</p><h2>{title}</h2>{description && <p>{description}</p>}</div>{action}</header>;
}
