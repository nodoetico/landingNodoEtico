'use client';

import { motion } from 'framer-motion';

/**
 * Valores diferenciales de NODO ÉTICO
 */
const valores = [
  {
    titulo: 'Escalabilidad',
    descripcion: 'Arquitecturas diseñadas para crecer contigo, desde MVP hasta sistemas enterprise.',
    icono: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    titulo: 'Tecnología Moderna',
    descripcion: 'Stack tecnológico de vanguardia: React, Next.js, Node.js, Python, IA y Cloud.',
    icono: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    titulo: 'Desarrollo Ético',
    descripcion: 'Compromiso con la transparencia, privacidad de datos y prácticas de IA responsables.',
    icono: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    titulo: 'Optimización de Procesos',
    descripcion: 'Identificamos cuellos de botella y automatizamos flujos para maximizar eficiencia.',
    icono: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    titulo: 'Arquitectura Sólida',
    descripcion: 'Sistemas robustos con microservicios, alta disponibilidad y tolerancia a fallos.',
    icono: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    titulo: 'Diseño Profesional',
    descripcion: 'Interfaces modernas con experiencia de usuario premium y diseño responsivo.',
    icono: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
];

/**
 * Sección "Por qué elegirnos"
 * Muestra los valores diferenciales con animaciones
 */
export default function SeccionPorQueElegirnos() {
  return (
    <section
      id="por-que-elegirnos"
      className="relative scroll-mt-24 py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-violeta/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Por qué{' '}
            <span className="bg-gradient-to-r from-neon-violeta to-neon-azul bg-clip-text text-transparent">
              elegirnos
            </span>
            ?
          </h2>
          <p className="mx-auto max-w-2xl text-texto-secundario">
            Combinamos talento, tecnología y ética para crear soluciones que
            realmente transforman empresas.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {valores.map((valor, indice) => (
            <motion.article
              key={valor.titulo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: indice * 0.1 }}
              className="group flex gap-4 rounded-2xl border border-borde-sutil bg-superficie/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neon-violeta/30 hover:bg-superficie"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-violeta/10 text-neon-violeta transition-colors group-hover:bg-neon-violeta/20">
                {valor.icono}
              </div>
              <div>
                <h3 className="mb-1.5 font-semibold text-texto-principal">
                  {valor.titulo}
                </h3>
                <p className="text-sm leading-relaxed text-texto-secundario">
                  {valor.descripcion}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
