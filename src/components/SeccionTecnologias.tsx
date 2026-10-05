'use client';

import { motion } from 'framer-motion';

/**
 * Tecnologías del stack principal.
 * Solo se declara lo que efectivamente se muestra en pantalla:
 * nombre, categoría y el color del degradado de cada insignia.
 */
const tecnologias = [
  { nombre: 'React', categoria: 'Frontend', color: 'from-sky-400 to-blue-600' },
  { nombre: 'Next.js', categoria: 'Framework', color: 'from-zinc-300 to-zinc-500' },
  { nombre: 'Node.js', categoria: 'Backend', color: 'from-green-400 to-emerald-600' },
  { nombre: 'Python', categoria: 'Backend', color: 'from-yellow-400 to-yellow-600' },
  { nombre: 'TypeScript', categoria: 'Lenguaje', color: 'from-blue-400 to-indigo-600' },
  { nombre: 'TailwindCSS', categoria: 'Frontend', color: 'from-cyan-400 to-teal-500' },
  { nombre: 'PostgreSQL', categoria: 'Base de Datos', color: 'from-blue-500 to-indigo-700' },
  { nombre: 'MongoDB', categoria: 'Base de Datos', color: 'from-green-400 to-green-600' },
  { nombre: 'Docker', categoria: 'DevOps', color: 'from-sky-400 to-blue-600' },
  { nombre: 'AWS', categoria: 'Cloud', color: 'from-orange-400 to-orange-600' },
  { nombre: 'Redis', categoria: 'Cache', color: 'from-red-400 to-red-600' },
  { nombre: 'GraphQL', categoria: 'API', color: 'from-pink-400 to-rose-600' },
  { nombre: 'Framer Motion', categoria: 'Animación', color: 'from-purple-400 to-violet-600' },
  { nombre: 'Prisma', categoria: 'ORM', color: 'from-teal-400 to-teal-600' },
  { nombre: 'GitHub Actions', categoria: 'CI/CD', color: 'from-gray-300 to-gray-500' },
  { nombre: 'IA/ML', categoria: 'Inteligencia Artificial', color: 'from-violet-400 to-purple-600' },
];

/**
 * Sección de Tecnologías
 * Insignias del stack tecnológico con su categoría y color propio
 */
export default function SeccionTecnologias() {
  return (
    <section
      id="tecnologias"
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
            Stack{' '}
            <span className="bg-gradient-to-r from-neon-cyan to-neon-azul bg-clip-text text-transparent">
              Tecnológico
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-texto-secundario">
            Utilizamos las tecnologías más modernas y robustas del mercado para
            construir soluciones de alto rendimiento.
          </p>
        </motion.div>

        <ul className="flex flex-wrap justify-center gap-3">
          {tecnologias.map((tech, indice) => (
            <motion.li
              key={tech.nombre}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: indice * 0.04 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group relative cursor-default"
            >
              <div className="flex items-center gap-2.5 rounded-xl border border-borde-sutil bg-superficie px-4 py-2.5 transition-all duration-300 hover:border-neon-cyan/30 hover:shadow-[0_0_20px_-8px_rgba(34,211,238,0.2)]">
                {/* Punto de color con el degradado propio de cada tecnología. */}
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br ${tech.color}`}
                />
                <span className="text-sm font-medium text-texto-principal">
                  {tech.nombre}
                </span>
                <span className="rounded-md bg-neon-cyan/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neon-cyan">
                  {tech.categoria}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}