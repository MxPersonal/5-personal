"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const value = (data: FormData, key: string) => String(data.get(key) ?? "").trim();
const number = (data: FormData, key: string) => Number(value(data, key).replaceAll(",", ""));
const messageUrl = (path: string, kind: "message" | "error", message: string) => `${path}?${kind}=${encodeURIComponent(message)}`;

export async function saveProductAction(formData: FormData) {
  await requireAdmin();
  const id = number(formData, "id");
  const slug = value(formData, "slug").toLowerCase();
  const price = number(formData, "price");
  const compareAtPrice = number(formData, "compareAtPrice");
  const payload = {
    slug, name: value(formData, "name").slice(0, 150), english_name: value(formData, "englishName").slice(0, 150),
    category: value(formData, "category"), price, compare_at_price: compareAtPrice || null,
    badge: value(formData, "badge").slice(0, 40) || null, artwork: value(formData, "artwork"),
    accent: value(formData, "accent") || "#153f36", accent_soft: value(formData, "accentSoft") || "#dcefe6",
    short_description: value(formData, "shortDescription").slice(0, 300), description: value(formData, "description").slice(0, 2000),
    features: value(formData, "features").split("\n").map((item) => item.trim()).filter(Boolean).slice(0, 12),
    stock: Math.max(0, number(formData, "stock") || 0), is_active: formData.get("isActive") === "on",
  };
  const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  if (!validSlug || !payload.name || !payload.english_name || !payload.short_description || !payload.description || !Number.isSafeInteger(price) || price < 0) {
    redirect(messageUrl("/admin/products", "error", "اطلاعات محصول کامل یا معتبر نیست."));
  }
  const supabase = await createClient();
  const query = id > 0 ? supabase.from("products").update(payload).eq("id", id) : supabase.from("products").insert(payload);
  const { error } = await query;
  if (error) redirect(messageUrl("/admin/products", "error", "ذخیره محصول انجام نشد؛ یکتایی slug و مقادیر را بررسی کنید."));
  revalidatePath("/", "layout");
  redirect(messageUrl("/admin/products", "message", "محصول با موفقیت ذخیره شد."));
}

export async function toggleProductAction(formData: FormData) {
  await requireAdmin();
  const id = number(formData, "id");
  const nextActive = value(formData, "nextActive") === "true";
  const supabase = await createClient();
  const { error } = await supabase.from("products").update({ is_active: nextActive }).eq("id", id);
  if (error) redirect(messageUrl("/admin/products", "error", "تغییر وضعیت محصول انجام نشد."));
  revalidatePath("/", "layout");
  redirect(messageUrl("/admin/products", "message", nextActive ? "محصول منتشر شد." : "محصول از فروشگاه خارج شد."));
}

export async function updateOrderStatusAction(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const status = value(formData, "status");
  const allowed = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];
  if (!allowed.includes(status)) redirect(messageUrl("/admin/orders", "error", "وضعیت سفارش معتبر نیست."));
  const supabase = await createClient();
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) redirect(messageUrl("/admin/orders", "error", "به‌روزرسانی سفارش انجام نشد."));
  revalidatePath("/admin/orders");
  redirect(messageUrl("/admin/orders", "message", "وضعیت سفارش ذخیره شد."));
}

export async function updateCustomerRoleAction(formData: FormData) {
  const admin = await requireAdmin();
  const userId = value(formData, "userId");
  const role = value(formData, "role") === "admin" ? "admin" : "customer";
  if (userId === admin.id && role !== "admin") redirect(messageUrl("/admin/customers", "error", "نمی‌توانید دسترسی ادمین حساب فعلی را حذف کنید."));
  const supabase = await createClient();
  const { error } = await supabase.from("user_roles").update({ role }).eq("user_id", userId);
  if (error) redirect(messageUrl("/admin/customers", "error", "تغییر سطح دسترسی انجام نشد."));
  revalidatePath("/admin/customers");
  redirect(messageUrl("/admin/customers", "message", "سطح دسترسی کاربر ذخیره شد."));
}
