import { ImageResponse } from "next/og";

export const alt = "نُوین — انتخاب‌های بهتر برای زندگی روزمره";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", background: "#f7f6f1", color: "#18221f", padding: 72, alignItems: "center", justifyContent: "space-between" }}><div style={{ display: "flex", flexDirection: "column", width: 720 }}><span style={{ color: "#ff663b", fontSize: 28 }}>NOVIN SELECTED GOODS</span><strong style={{ fontSize: 82, marginTop: 30, lineHeight: 1.2 }}>انتخاب‌های بهتر<br/>برای زندگی روزمره</strong><span style={{ fontSize: 30, marginTop: 32, color: "#68716d" }}>فروشگاه نُوین</span></div><div style={{ display: "flex", width: 300, height: 430, borderRadius: 150, background: "#cfe9dc", alignItems: "center", justifyContent: "center", fontSize: 150, fontWeight: 800 }}>ن<span style={{ color: "#ff663b" }}>.</span></div></div>, size);
}
