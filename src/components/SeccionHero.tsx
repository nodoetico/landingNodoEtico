'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MENSAJE_WHATSAPP, enlaceWhatsApp } from '@/lib/config';

/**
 * Distancia máxima (px) a la que se dibuja la línea que une dos partículas.
 */
const DISTANCIA_UNION = 150;

/**
 * Área (px²) por partícula. Menor cantidad de partículas = mejor rendimiento.
 */
const AREA_POR_PARTICULA = 15000;
const MAXIMO_PARTICULAS = 80;

/**
 * Componente individual de partícula del fondo tecnológico.
 */
interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tamano: number;
  opacidad: number;
}

/**
 * Sección Hero principal
 * Muestra el título impactante, subtítulo, CTAs y fondo con partículas conectadas
 */
export default function SeccionHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respeta la preferencia del sistema de reducir el movimiento.
    const reducirMovimiento = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let animacionId = 0;
    let activo = true;
    let particulas: Particula[] = [];

    /**
     * Ajusta el tamaño del canvas al del contenedor y escala por la
     * densidad de píxeles del dispositivo para que no se vea borroso
     * en pantallas retina o de alta resolución.
     */
    const inicializar = () => {
      const escala = Math.min(window.devicePixelRatio || 1, 2);
      const ancho = canvas.clientWidth;
      const alto = canvas.clientHeight;

      canvas.width = Math.floor(ancho * escala);
      canvas.height = Math.floor(alto * escala);
      // A partir de acá se dibuja en coordenadas CSS (no en píxeles físicos).
      ctx.setTransform(escala, 0, 0, escala, 0, 0);

      const cantidad = Math.min(
        Math.floor((ancho * alto) / AREA_POR_PARTICULA),
        MAXIMO_PARTICULAS
      );

      particulas = Array.from({ length: cantidad }, () => ({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        tamano: Math.random() * 2 + 0.5,
        opacidad: Math.random() * 0.5 + 0.1,
      }));

      return { ancho, alto };
    };

    let dim = inicializar();

    /**
     * Dibuja un único fotograma: mueve las partículas, las hace rebotar
     * contra los bordes y las conecta entre sí si están cerca.
     */
    const dibujar = () => {
      const { ancho, alto } = dim;
      ctx.clearRect(0, 0, ancho, alto);

      particulas.forEach((particula, i) => {
        particula.x += particula.vx;
        particula.y += particula.vy;

        if (particula.x < 0 || particula.x > ancho) particula.vx *= -1;
        if (particula.y < 0 || particula.y > alto) particula.vy *= -1;

        ctx.beginPath();
        ctx.arc(particula.x, particula.y, particula.tamano, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 216, ${particula.opacidad})`;
        ctx.fill();

        for (let j = i + 1; j < particulas.length; j++) {
          const dx = particula.x - particulas[j].x;
          const dy = particula.y - particulas[j].y;
          const distancia = Math.sqrt(dx * dx + dy * dy);

          if (distancia < DISTANCIA_UNION) {
            ctx.beginPath();
            ctx.moveTo(particula.x, particula.y);
            ctx.lineTo(particulas[j].x, particulas[j].y);
            ctx.strokeStyle = `rgba(0, 180, 216, ${
              0.1 * (1 - distancia / DISTANCIA_UNION)
            })`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
    };

    /**
     * Bucle de animación. Se detiene solo si el componente se desmonta.
     */
    const animar = () => {
      dibujar();
      animacionId = requestAnimationFrame(animar);
    };

    /**
     * Redimensiona y reinicia el fondo.
     * Se usa un temporizador para no redibujar en cada píxel del resize.
     */
    let temporizadorResize: ReturnType<typeof setTimeout>;
    const manejarResize = () => {
      clearTimeout(temporizadorResize);
      temporizadorResize = setTimeout(() => {
        dim = inicializar();
        dibujar();
      }, 150);
    };

    /**
     * Pausa el bucle cuando la pestaña no está a la vista.
     * Evita consumir CPU y batería en segundo plano.
     */
    const manejarVisibilidad = () => {
      if (document.hidden) {
        cancelAnimationFrame(animacionId);
      } else if (activo) {
        animacionId = requestAnimationFrame(animar);
      }
    };

    dibujar();

    if (!reducirMovimiento) {
      animacionId = requestAnimationFrame(animar);
      window.addEventListener('resize', manejarResize);
      document.addEventListener('visibilitychange', manejarVisibilidad);
    }

    return () => {
      activo = false;
      cancelAnimationFrame(animacionId);
      clearTimeout(temporizadorResize);
      window.removeEventListener('resize', manejarResize);
      document.removeEventListener('visibilitychange', manejarVisibilidad);
    };
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full"
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-fondo/50 to-fondo" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-azul/20 bg-neon-azul/5 px-4 py-1.5 text-sm text-neon-azul">
            <span className="h-2 w-2 animate-pulse rounded-full bg-neon-azul" />
            Innovación · IA · Automatización
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Transformamos tu negocio con
          <span className="block bg-gradient-to-r from-neon-azul via-neon-violeta to-neon-cyan bg-clip-text text-transparent">
            Inteligencia Artificial
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-texto-secundario sm:text-xl"
        >
          Automatización inteligente, desarrollo de software premium y sistemas
          empresariales diseñados para escalar tu empresa al siguiente nivel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contacto"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-neon-azul px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-neon-cyan"
          >
            <span className="relative z-10">Solicitar propuesta</span>
            <svg
              className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>

          <a
            href={enlaceWhatsApp(MENSAJE_WHATSAPP)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-borde-sutil px-8 py-3.5 text-sm font-semibold text-texto-principal transition-all hover:border-neon-verde/50 hover:text-neon-verde"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Hablar por WhatsApp
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-texto-secundario"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}