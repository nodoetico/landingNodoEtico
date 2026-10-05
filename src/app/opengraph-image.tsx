import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { NOMBRE, LEMA, DESCRIPCION } from "@/lib/config";

/**
 * Lee el emblema de la marca y lo convierte en un data URI.
 * Incrustarlo permite que la imagen OG se genere sin depender de
 * que el dominio esté desplegado ni de una request HTTP en build.
 */
const emblema = `data:image/png;base64,${readFileSync(
  path.join(process.cwd(), "src/assets/logo-claro.png")
).toString("base64")}`;

/**
 * Imagen de Open Graph generada en build.
 * Es la vista previa que se muestra al compartir el enlace en
 * WhatsApp, Facebook, LinkedIn y X.
 */
export const alt = `${NOMBRE} - ${LEMA}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ImagenOpenGraph() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(0,180,216,0.25), transparent 60%), radial-gradient(circle at 100% 100%, rgba(139,92,246,0.2), transparent 55%)",
          padding: 70,
          textAlign: "center",
        }}
      >
        {/* Emblema circular de la marca */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={emblema} width={124} height={122} alt="" />

        <div
          style={{
            display: "flex",
            fontSize: 21,
            letterSpacing: 7,
            color: "#00b4d8",
            textTransform: "uppercase",
          }}
        >
          {LEMA}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#ededed",
            lineHeight: 1.05,
          }}
        >
          {NOMBRE}
        </div>

        <div
          style={{
            display: "flex",
            maxWidth: 900,
            fontSize: 26,
            lineHeight: 1.4,
            color: "#a0a0a0",
          }}
        >
          {DESCRIPCION}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
          {["Inteligencia Artificial", "Automatización", "Software a medida"].map(
            (etiqueta) => (
              <div
                key={etiqueta}
                style={{
                  display: "flex",
                  padding: "9px 20px",
                  fontSize: 20,
                  color: "#22d3ee",
                  border: "1px solid rgba(34,211,238,0.35)",
                  borderRadius: 999,
                  backgroundColor: "rgba(34,211,238,0.08)",
                }}
              >
                {etiqueta}
              </div>
            )
          )}
        </div>
      </div>
    ),
    size
  );
}