'use client';

import { motion } from 'framer-motion';
import { SERVICIOS } from '@/lib/servicios';

/**
 * Iconos SVG indexados por título de servicio.
 * Se mantienen aparte de los datos para que `SERVICIOS` pueda
 * consumirse también desde el JSON-LD, donde no hay JSX.
 */
const ICONOS: Record<string, React.ReactNode> = {
  'Desarrollo de Software': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  'Automatización Inteligente': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  'IA Aplicada': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  'Sistemas Empresariales': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Integraciones: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  ),
  'Soluciones SaaS': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  'Bots Inteligentes': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  'Plataformas Personalizadas': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  ),
};

/**
 * Componente individual de servicio con efecto hover
 */
function TarjetaServicio({
  titulo,
  descripcion,
  icono,
  indice,
}: {
  titulo: string;
  descripcion: string;
  icono: React.ReactNode;
  indice: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: indice * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-borde-sutil bg-superficie p-6 transition-all duration-300 hover:border-neon-azul/30 hover:shadow-[0_0_30px_-10px_rgba(0,180,216,0.15)] sm:p-8"
    >
      <div className="mb-4 inline-flex rounded-xl bg-neon-azul/10 p-3 text-neon-azul transition-colors group-hover:bg-neon-azul/20">
        {icono}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-texto-principal">
        {titulo}
      </h3>
      <p className="text-sm leading-relaxed text-texto-secundario">
        {descripcion}
      </p>
    </motion.article>
  );
}

/**
 * Sección de Servicios
 * Grid de tarjetas con todos los servicios que ofrece NODO ÉTICO
 */
export default function SeccionServicios() {
  return (
    <section
      id="servicios"
      className="relative scroll-mt-24 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Servicios{' '}
            <span className="bg-gradient-to-r from-neon-azul to-neon-violeta bg-clip-text text-transparent">
              Premium
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-texto-secundario">
            Ofrecemos soluciones tecnológicas integrales diseñadas para impulsar
            la transformación digital de tu empresa.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICIOS.map((servicio, indice) => (
            <TarjetaServicio
              key={servicio.titulo}
              titulo={servicio.titulo}
              descripcion={servicio.descripcion}
              icono={ICONOS[servicio.titulo]}
              indice={indice}
            />
          ))}
        </div>
      </div>
    </section>
  );
}