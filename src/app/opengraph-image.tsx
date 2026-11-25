import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";
export const alt = "Aiman Farhan, Junior Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#09090b",
        color: "#fafafa",
        display: "flex",
        flexDirection: "column",
        padding: "80px",
        justifyContent: "center",
        borderBottom: "12px solid #8b5cf6",
      }}
    >
      <div
        style={{ fontSize: 26, color: "#a78bfa", marginBottom: 28 }}
      >{portfolio.location}</div>
      <div style={{ fontSize: 82, letterSpacing: -4, fontWeight: 700 }}>
        {portfolio.name}
      </div>
      <div
        style={{
          fontSize: 62,
          letterSpacing: -2,
          color: "#a78bfa",
          fontWeight: 700,
        }}
      >
        {portfolio.headline}
      </div>
      <div style={{ fontSize: 24, color: "#a1a1aa", marginTop: 36 }}>
        Flutter · Java · PHP · Laravel
      </div>
    </div>,
    size,
  );
}
