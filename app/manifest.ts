import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "فروشگاه نُوین", short_name: "نُوین", description: "انتخاب‌های بهتر برای زندگی روزمره", start_url: "/", display: "standalone", background_color: "#f7f6f1", theme_color: "#18221f", lang: "fa", dir: "rtl", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}
