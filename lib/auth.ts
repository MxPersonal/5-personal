import { redirect } from "next/navigation";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: "customer" | "admin";
};

export async function getAuthUser(): Promise<AuthUser | null> {
  if (!hasSupabaseConfig) return null;

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) return null;

  const [{ data: userData }, { data: profile }, { data: role }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("profiles").select("full_name, phone").eq("id", userId).maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle(),
  ]);

  return {
    id: userId,
    email: userData.user?.email ?? "",
    fullName: profile?.full_name ?? "",
    phone: profile?.phone ?? "",
    role: role?.role === "admin" ? "admin" : "customer",
  };
}

export async function requireUser() {
  const user = await getAuthUser();
  if (!user) redirect(`/login?message=${encodeURIComponent("برای مشاهده حساب کاربری وارد شوید.")}`);
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") redirect(`/account?error=${encodeURIComponent("دسترسی به پنل مدیریت برای این حساب مجاز نیست.")}`);
  return user;
}
