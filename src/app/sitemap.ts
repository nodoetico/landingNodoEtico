import type { MetadataRoute } from "next";
import { DOMINIO } from "@/lib/config";

/**
 * Mapa del sitio (sitemap.xml) generado automáticamente.
 * Le indica a los buscadores qué páginas indexar y con qué prioridad.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: DOMINIO,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}