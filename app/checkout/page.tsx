import type { Metadata } from "next";
import { CheckoutPreview } from "@/components/checkout-preview";

export const metadata: Metadata = { title: "تکمیل خرید", robots: { index: false, follow: false } };

export default function CheckoutPage() {
  return <CheckoutPreview/>;
}
