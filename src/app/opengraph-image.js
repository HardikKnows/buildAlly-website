import { ImageResponse } from "next/og";

export const alt =
  "BuildAlly — Construction Management Software for Modern Builders";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social preview. Only flexbox + a subset of CSS is supported here.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #2563EB, #1E40AF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              color: "white",
            }}
          >
            B
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "white" }}>
            Build<span style={{ color: "#60A5FA" }}>Ally</span>
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            Run your entire construction business from one place.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "#CBD5E1",
              maxWidth: 900,
            }}
          >
            Sites, money, team, and documents — unified, real-time, and built for the field.
          </div>
        </div>

        {/* Bottom: trust strip */}
        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#93C5FD" }}>
          <span>Built for Indian builders</span>
          <span style={{ color: "#475569" }}>·</span>
          <span>Works offline</span>
          <span style={{ color: "#475569" }}>·</span>
          <span>Enterprise-grade security</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
