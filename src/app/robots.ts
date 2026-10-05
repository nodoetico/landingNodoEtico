import type { MetadataRoute } from "next";
import { DOMINIO } from "@/lib/config";

/**
 * robots.txt generado automáticamente.
 * Permite indexar la landing y bloquea las rutas de API.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${DOMINIO}/sitemap.xml`,
    host: DOMINIO,
  };
}