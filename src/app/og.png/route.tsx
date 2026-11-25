import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";
import { shareImage } from "@/lib/share-image";

// A route named og.png, because GitHub Pages picks the content type from the
// file extension and Next.js exports opengraph-image without one.
export const dynamic = "force-static";
export function GET() {
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
    { width: shareImage.width, height: shareImage.height },
  );
}
