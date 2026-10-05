/**
 * CONFIGURACIÓN CENTRAL DE NODO ÉTICO
 * ------------------------------------
 * Fuente única de verdad para todos los datos de la landing.
 * Cualquier dato de contacto, red social o navegación debe definirse
 * acá y NUNCA hardcodeado dentro de un componente, para evitar que
 * queden datos desactualizados o duplicados.
 *
 * Los valores por defecto pueden sobreescribirse con variables de
 * entorno públicas (NEXT_PUBLIC_*) definidas en `.env.local`.
 */

/**
 * Dominio público del sitio.
 * Se usa para metadata, Open Graph, sitemap y JSON-LD.
 */
export const DOMINIO = process.env.NEXT_PUBLIC_DOMINIO ?? 'https://nodoetico.com';

/**
 * Nombre comercial de la empresa.
 */
export const NOMBRE = 'NODO ÉTICO';

/**
 * Lema corto de la marca, reutilizado en el footer y en redes.
 */
export const LEMA = 'Sistemas Inteligentes';

/**
 * Descripción comercial usada en SEO y en el botón "Compartir".
 */
export const DESCRIPCION =
  'Transformamos tu negocio con inteligencia artificial, automatización inteligente y sistemas empresariales modernos. Soluciones SaaS, bots y plataformas personalizadas.';

/**
 * Ubicación de la empresa (usada por los buscadores locales y el JSON-LD).
 */
export const UBICACION = {
  direccion: 'Jujuy, Argentina',
  pais: 'AR',
};

/**
 * Número de WhatsApp en formato internacional, SOLO dígitos.
 * Ejemplo: 5493885788043
 */
export const WHATSAPP_NUMERO =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMERO ?? '5493885788043';

/**
 * Versión legible del número de WhatsApp para mostrar en pantalla.
 * Aplica el formato argentino: +54 9 388 578-8043
 */
export const WHATSAPP_MOSTRAR = (() => {
  const digitos = WHATSAPP_NUMERO.replace(/\D/g, '');

  // 54 + 9 (móvil) + 10 dígitos del número.
  if (digitos.length === 13 && digitos.startsWith('54')) {
    const resto = digitos.slice(3);
    return `+54 9 ${resto.slice(0, 3)} ${resto.slice(3, 6)}-${resto.slice(6)}`;
  }

  // Fallback: agrupación genérica de a tres dígitos.
  return `+${digitos.replace(/(\d{3})(?=\d)/g, '$1 ').trim()}`;
})();

/**
 * Correo institucional de contacto.
 */
export const EMAIL_CONTACTO =
  process.env.NEXT_PUBLIC_EMAIL_CONTACTO ?? 'contacto@nodoetico.com';

/**
 * Construye un enlace de WhatsApp con mensaje precargado.
 * @param mensaje Texto que se precarga en el chat.
 */
export const enlaceWhatsApp = (mensaje: string): string =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;

/**
 * Mensaje predeterminado para consultas comerciales.
 */
export const MENSAJE_WHATSAPP =
  'Hola NODO ÉTICO, quiero solicitar una propuesta para mi empresa.';

/**
 * Redes sociales oficiales.
 * `null` significa que la red no está configurada y no se renderiza.
 */
export const REDES_SOCIALES = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK ?? 'https://www.facebook.com/share/19oRSqcZLH/',
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM ??
    'https://www.instagram.com/buczek_design/?utm_source=qr&r=nametag',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? null,
  github: process.env.NEXT_PUBLIC_GITHUB ?? null,
} as const;

/**
 * Enlaces de navegación de la landing.
 * Se comparten entre el encabezado y el pie de página para evitar duplicados.
 */
export const ENLACES_NAVEGACION = [
  { nombre: 'Servicios', href: '#servicios' },
  { nombre: '¿Por qué nosotros?', href: '#por-que-elegirnos' },
  { nombre: 'Tecnologías', href: '#tecnologias' },
  { nombre: 'Contacto', href: '#contacto' },
] as const;