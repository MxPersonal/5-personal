"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { getSiteUrl } from "@/lib/site-url";
import { requireUser } from "@/lib/auth";

const value = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const safeNext = (candidate: string) => candidate.startsWith("/") && !candidate.startsWith("//") ? candidate : "/account";
const withMessage = (path: string, kind: "message" | "error", message: string) => `${path}${path.includes("?") ? "&" : "?"}${kind}=${encodeURIComponent(message)}`;

function ensureConfigured(path: string) {
  if (!hasSupabaseConfig) redirect(withMessage(path, "error", "اتصال احراز هویت هنوز در Vercel تنظیم نشده است."));
}

export async function loginAction(formData: FormData) {
  ensureConfigured("/login");
  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");
  const next = safeNext(value(formData, "next"));
  if (!email || password.length < 8) redirect(withMessage("/login", "error", "ایمیل و رمز عبور حداقل هشت‌کاراکتری را وارد کنید."));
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(withMessage("/login", "error", "ایمیل یا رمز عبور صحیح نیست، یا حساب هنوز تأیید نشده است."));
  redirect(next);
}

export async function registerAction(formData: FormData) {
  ensureConfigured("/register");
  const fullName = value(formData, "fullName");
  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");
  if (fullName.length < 2 || !email || password.length < 8) redirect(withMessage("/register", "error", "نام، ایمیل و رمز عبور حداقل هشت‌کاراکتری الزامی است."));
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName.slice(0, 100) }, emailRedirectTo: `${getSiteUrl()}/auth/callback?next=/account` },
  });
  if (error) redirect(withMessage("/register", "error", "ساخت حساب انجام نشد. ایمیل را بررسی کنید یا کمی بعد دوباره تلاش کنید."));
  if (data.session) redirect("/account");
  redirect(withMessage("/login", "message", "لینک تأیید برای شما ارسال شد. پس از تأیید ایمیل وارد شوید."));
}

export async function googleLoginAction(formData: FormData) {
  const authPath = value(formData, "source") === "register" ? "/register" : "/login";
  ensureConfigured(authPath);
  if (process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED !== "true") redirect(withMessage(authPath, "error", "ورود گوگل هنوز فعال نشده است."));
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${getSiteUrl()}/auth/callback?next=/account`, skipBrowserRedirect: true } });
  if (error || !data.url) redirect(withMessage(authPath, "error", "شروع ورود با گوگل انجام نشد."));
  redirect(data.url);
}

export async function requestPasswordResetAction(formData: FormData) {
  ensureConfigured("/forgot-password");
  const email = value(formData, "email").toLowerCase();
  if (!email) redirect(withMessage("/forgot-password", "error", "ایمیل حساب را وارد کنید."));
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${getSiteUrl()}/auth/callback?next=/update-password` });
  redirect(withMessage("/forgot-password", "message", "اگر حسابی با این ایمیل وجود داشته باشد، لینک بازیابی ارسال می‌شود."));
}

export async function updatePasswordAction(formData: FormData) {
  ensureConfigured("/update-password");
  const password = value(formData, "password");
  if (password.length < 8) redirect(withMessage("/update-password", "error", "رمز عبور باید حداقل هشت کاراکتر باشد."));
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) redirect(withMessage("/update-password", "error", "لینک بازیابی منقضی شده یا معتبر نیست."));
  redirect(withMessage("/account", "message", "رمز عبور با موفقیت تغییر کرد."));
}

export async function signOutAction() {
  if (hasSupabaseConfig) {
    const supabase = await createClient();
    await supabase.auth.signOut({ scope: "local" });
  }
  redirect("/login");
}

export async function updateProfileAction(formData: FormData) {
  const user = await requireUser();
  const fullName = value(formData, "fullName").slice(0, 100);
  const phone = value(formData, "phone").slice(0, 30);
  if (fullName.length < 2) redirect(withMessage("/account", "error", "نام و نام خانوادگی را کامل وارد کنید."));
  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ full_name: fullName, phone }).eq("id", user.id);
  if (error) redirect(withMessage("/account", "error", "ذخیره اطلاعات انجام نشد."));
  revalidatePath("/account");
  redirect(withMessage("/account", "message", "اطلاعات حساب ذخیره شد."));
}

export async function saveAddressAction(formData: FormData) {
  const user = await requireUser();
  const fields = {
    title: value(formData, "title").slice(0, 50), recipient_name: value(formData, "recipientName").slice(0, 100),
    phone: value(formData, "phone").slice(0, 30), province: value(formData, "province").slice(0, 60),
    city: value(formData, "city").slice(0, 60), postal_code: value(formData, "postalCode").slice(0, 20),
    address_line: value(formData, "addressLine").slice(0, 500), user_id: user.id,
  };
  if (Object.values(fields).some((item) => !item)) redirect(withMessage("/account/addresses", "error", "همه فیلدهای آدرس الزامی هستند."));
  const supabase = await createClient();
  const { error } = await supabase.from("addresses").insert(fields);
  if (error) redirect(withMessage("/account/addresses", "error", "ثبت آدرس انجام نشد."));
  revalidatePath("/account/addresses");
  redirect(withMessage("/account/addresses", "message", "آدرس جدید ثبت شد."));
}

export async function deleteAddressAction(formData: FormData) {
  const user = await requireUser();
  const id = value(formData, "id");
  const supabase = await createClient();
  await supabase.from("addresses").delete().eq("id", id).eq("user_id", user.id);
  revalidatePath("/account/addresses");
}
