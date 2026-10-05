# NODO ÉTICO — Landing Page

Landing page de **NODO ÉTICO · Sistemas Inteligentes**, una startup de
inteligencia artificial, automatización y desarrollo de software.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript** estricto
- **Tailwind CSS 4** (tema oscuro con variables CSS)
- **Framer Motion** para animaciones
- **Resend** para el envío del formulario de contacto

## Puesta en marcha

```bash
npm install
cp .env.local.example .env.local   # y completar los valores
npm run dev
```

El sitio queda disponible en [http://localhost:3000](http://localhost:3000).

### Variables de entorno

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_DOMINIO` | Dominio público. Se usa en SEO, Open Graph, sitemap y JSON-LD. |
| `NEXT_PUBLIC_WHATSAPP_NUMERO` | WhatsApp en formato internacional, solo dígitos (`5493885788043`). |
| `NEXT_PUBLIC_EMAIL_CONTACTO` | Correo institucional mostrado en el pie de página. |
| `NEXT_PUBLIC_FACEBOOK` / `_INSTAGRAM` / `_LINKEDIN` / `_GITHUB` | Redes sociales. Si se dejan vacías, no se renderizan. |
| `RESEND_API_KEY` | Clave de Resend. **Requerida** para que el formulario funcione. |
| `RESEND_EMAIL_DESTINO` | Correo que recibe los mensajes del formulario. |
| `RESEND_EMAIL_REMITENTE` | Remitente. Debe ser un dominio **verificado** en Resend. |

## Estructura

```
src/
├── app/
│   ├── api/contacto/route.ts   # Endpoint del formulario (Resend)
│   ├── icon.png                # Ícono de la app
│   ├── apple-icon.png          # Ícono de iOS
│   ├── favicon.ico
│   ├── opengraph-image.tsx     # Vista previa para redes sociales
│   ├── robots.ts               # robots.txt
│   ├── sitemap.ts              # sitemap.xml
│   ├── globals.css             # Tema, paleta y estilos base
│   ├── layout.tsx              # Metadatos, fuentes y tema
│   └── page.tsx                # Ensambla las secciones
├── assets/                     # Logo optimizado (importado por next/image)
├── components/                 # Una sección por componente
└── lib/
    ├── config.ts               # Datos de contacto, redes y navegación
    └── servicios.ts            # Catálogo de servicios (compartido con el JSON-LD)
```

### Convención de datos

`src/lib/config.ts` es la **única fuente de verdad** para el teléfono, el
correo, las redes sociales y los enlaces de navegación. Ningún componente
debe hardcodear esos datos: se leen de ahí para que un cambio se aplique en
todo el sitio de una sola vez.

## Formulario de contacto

`POST /api/contacto` valida en el servidor, aplica un límite de 5 envíos por
IP cada 10 minutos y descarta los envíos que completan el campo trampa
`sitioWeb` (honeypot). El remitente del correo se toma de
`RESEND_EMAIL_REMITENTE`; sin esa variable cae en la dirección de prueba de
Resend, que **solo entrega correos al propio remitente**.

## Scripts

```bash
npm run dev     # servidor de desarrollo
npm run build   # build de producción
npm run start   # servidor de producción
npm run lint    # ESLint
```

## Logotipos

Los originales están en `LOGO/`. El logo en uso es
`src/assets/logo-claro.png` (blanco, para el tema oscuro) y su copia pública
`public/logo-nodo-etico.png`, usada como URL del logo en el JSON-LD.