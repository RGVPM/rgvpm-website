import { ImageResponse } from "next/og";

export const alt = "RGV Performance Marketing — AI-Powered Digital Marketing for Local Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social/AI preview card for the whole site. Pages without their own
// opengraph-image inherit this one.
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
          background: "#13233f",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 18, height: 64, background: "#FF6B35", marginRight: 24 }} />
          <div style={{ display: "flex", color: "#ffffff", fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>
            RGV PERFORMANCE MARKETING
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#ffffff", fontSize: 82, fontWeight: 800, lineHeight: 1.05 }}>
            More Leads. More Customers.
          </div>
          <div style={{ display: "flex", color: "#FF6B35", fontSize: 82, fontWeight: 800, lineHeight: 1.05 }}>
            Less Guesswork.
          </div>
          <div style={{ display: "flex", color: "#c9d4e6", fontSize: 34, marginTop: 28, maxWidth: 960 }}>
            AI-powered websites, SEO, ads & automation for local businesses.
          </div>
        </div>

        <div style={{ display: "flex", color: "#8ea3c4", fontSize: 28, letterSpacing: 1 }}>
          Rio Grande Valley, TX  ·  rgvperformancemarketing.com
        </div>
      </div>
    ),
    { ...size },
  );
}
