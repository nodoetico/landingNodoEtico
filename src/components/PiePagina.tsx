import LogotipoMarca from './LogotipoMarca';
import {
  EMAIL_CONTACTO,
  ENLACES_NAVEGACION,
  LEMA,
  NOMBRE,
  REDES_SOCIALES,
  WHATSAPP_MOSTRAR,
} from '@/lib/config';

/**
 * Definición de una red social del pie de página.
 */
interface RedSocial {
  nombre: keyof typeof REDES_SOCIALES;
  etiqueta: string;
  color: string;
  path: string;
}

/**
 * Iconos de las redes sociales configuradas.
 * Cada red sin URL en la configuración no se renderiza.
 */
const REDES: RedSocial[] = [
  {
    nombre: 'facebook',
    etiqueta: 'Facebook',
    color: 'hover:border-sky-400/50 hover:text-sky-400',
    path: 'M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0022 12z',
  },
  {
    nombre: 'instagram',
    etiqueta: 'Instagram',
    color: 'hover:border-neon-violeta/50 hover:text-neon-violeta',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    nombre: 'linkedin',
    etiqueta: 'LinkedIn',
    color: 'hover:border-neon-azul/50 hover:text-neon-azul',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    nombre: 'github',
    etiqueta: 'GitHub',
    color: 'hover:border-neon-cyan/50 hover:text-neon-cyan',
    path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
];

/**
 * Pie de página
 * Logo, navegación, contacto, redes sociales y derechos reservados
 */
export default function PiePagina() {
  const anioActual = new Date().getFullYear();

  // Solo se muestran las redes que tengan URL configurada.
  const redesActivas = REDES.flatMap((red) => {
    const url = REDES_SOCIALES[red.nombre];
    return url
      ? [{ etiqueta: red.etiqueta, color: red.color, url, path: red.path }]
      : [];
  });

  return (
    <footer className="border-t border-borde-sutil bg-superficie">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#inicio" aria-label={`${NOMBRE} - ir al inicio`}>
              <LogotipoMarca />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-texto-secundario">
              Innovación, inteligencia artificial y automatización para
              transformar tu negocio.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-texto-principal">
              Navegación
            </h4>
            <ul className="space-y-3">
              {ENLACES_NAVEGACION.map((enlace) => (
                <li key={enlace.nombre}>
                  <a
                    href={enlace.href}
                    className="text-sm text-texto-secundario transition-colors hover:text-neon-azul"
                  >
                    {enlace.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-texto-principal">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${EMAIL_CONTACTO}`}
                  className="text-sm text-texto-secundario transition-colors hover:text-neon-azul"
                >
                  {EMAIL_CONTACTO}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_MOSTRAR.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-texto-secundario transition-colors hover:text-neon-verde"
                >
                  {WHATSAPP_MOSTRAR}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-texto-principal">
              Redes
            </h4>
            <ul className="flex gap-4">
              {redesActivas.map((red) => (
                <li key={red.etiqueta}>
                  <a
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border border-borde-sutil text-texto-secundario transition-all ${red.color}`}
                    aria-label={red.etiqueta}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d={red.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-borde-sutil pt-8 text-center">
          <p className="text-sm text-texto-secundario">
            &copy; {anioActual} {NOMBRE} - {LEMA}. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}