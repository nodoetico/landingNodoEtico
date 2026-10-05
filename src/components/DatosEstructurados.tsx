import {
  DESCRIPCION,
  DOMINIO,
  EMAIL_CONTACTO,
  LEMA,
  NOMBRE,
  REDES_SOCIALES,
  UBICACION,
  WHATSAPP_NUMERO,
} from '@/lib/config';
import { SERVICIOS } from '@/lib/servicios';

/**
 * Datos estructurados JSON-LD (schema.org).
 * Permite que Google y otros buscadores entiendan qué es NODO ÉTICO,
 * qué servicios ofrece y cómo contactarlo (rich snippets).
 */
export default function DatosEstructurados() {
  // Solo se incluyen las redes que estén efectivamente configuradas.
  const sameAs = Object.values(REDES_SOCIALES).filter(
    (url): url is string => typeof url === 'string' && url.length > 0
  );

  const datos = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${DOMINIO}/#negocio`,
    name: NOMBRE,
    alternateName: `${NOMBRE} ${LEMA}`,
    description: DESCRIPCION,
    url: DOMINIO,
    logo: `${DOMINIO}/logo-nodo-etico.png`,
    email: EMAIL_CONTACTO,
    telephone: `+${WHATSAPP_NUMERO}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: UBICACION.direccion,
      addressCountry: UBICACION.pais,
    },
    areaServed: 'Latinoamérica',
    availableLanguage: ['es'],
    priceRange: '$$',
    sameAs,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Servicios de ${NOMBRE}`,
      itemListElement: SERVICIOS.map((servicio) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: servicio.titulo,
          description: servicio.descripcion,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // El contenido proviene de la configuración interna, nunca de
      // entrada de usuario, por lo que no hay riesgo de inyección.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
    />
  );
}