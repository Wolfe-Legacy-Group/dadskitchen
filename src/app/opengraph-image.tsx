import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Dad's Kitchen — Helping dads and kids cook side by side and talk face to face";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const logoData = await readFile(
    join(process.cwd(), "public", "logo-tagline.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2A2623",
        }}
      >
        <p
          style={{
            fontSize: 16,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#5E6E4B",
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          A Mens Philanthropy Foundation Initiative
        </p>
        <img src={logoSrc} width={380} height={380} />
      </div>
    ),
    { ...size }
  );
}
