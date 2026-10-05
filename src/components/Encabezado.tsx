'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ENLACES_NAVEGACION } from '@/lib/config';
import LogotipoMarca from './LogotipoMarca';

/**
 * Identificador del panel de menú móvil.
 * Lo referencia el botón con `aria-controls`.
 */
const ID_MENU = 'menu-navegacion';

/**
 * Encabezado de navegación principal
 * Barra superior fija con logo, menú responsive y fondo al hacer scroll
 */
export default function Encabezado() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  /**
   * Mide la posición de scroll para activar el fondo translúcido.
   */
  useEffect(() => {
    const manejarScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', manejarScroll, { passive: true });
    return () => window.removeEventListener('scroll', manejarScroll);
  }, []);

  /**
   * Mientras el menú móvil está abierto:
   * bloquea el scroll del body y permite cerrarlo con Escape.
   */
  useEffect(() => {
    if (!menuAbierto) return;

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const manejarEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuAbierto(false);
    };
    document.addEventListener('keydown', manejarEscape);

    return () => {
      document.body.style.overflow = overflowPrevio;
      document.removeEventListener('keydown', manejarEscape);
    };
  }, [menuAbierto]);

  const fondoConScroll = scrollY > 50
    ? 'bg-fondo/90 backdrop-blur-xl border-b border-borde-sutil'
    : 'bg-transparent';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${fondoConScroll}`}
    >
      {/* Enlace de salto: permite llegar al contenido con el teclado. */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-neon-azul focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        Saltar al contenido
      </a>

      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <a href="#inicio" aria-label="NODO ÉTICO - ir al inicio">
          <LogotipoMarca preload />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {ENLACES_NAVEGACION.map((enlace) => (
            <li key={enlace.nombre}>
              <a
                href={enlace.href}
                className="relative text-sm font-medium text-texto-secundario transition-colors hover:text-neon-azul"
              >
                {enlace.nombre}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
          aria-controls={ID_MENU}
        >
          <motion.span
            animate={menuAbierto ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-6 rounded-full bg-texto-principal"
          />
          <motion.span
            animate={menuAbierto ? { opacity: 0 } : { opacity: 1 }}
            className="h-0.5 w-6 rounded-full bg-texto-principal"
          />
          <motion.span
            animate={menuAbierto ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-6 rounded-full bg-texto-principal"
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            id={ID_MENU}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-fondo/98 backdrop-blur-xl md:hidden"
          >
            {ENLACES_NAVEGACION.map((enlace) => (
              <a
                key={enlace.nombre}
                href={enlace.href}
                onClick={() => setMenuAbierto(false)}
                className="text-2xl font-medium text-texto-principal transition-colors hover:text-neon-azul"
              >
                {enlace.nombre}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}