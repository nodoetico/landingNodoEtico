// Sistema de animaciones al hacer scroll
import { debounce } from './utilidades.js';

export class AnimacionesScroll {
  constructor() {
    this.elementosAnimados = [];
    this.observador = null;
    this.reduccionMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.inicializar();
  }
  
  inicializar() {
    if (this.reduccionMovimiento) return;
    
    this.crearObservador();
    this.configurarEventos();
    this.animarElementosExistentes();
  }
  
  crearObservador() {
    const opciones = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1,
    };
    
    this.observador = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          const elemento = entrada.target;
          const retraso = parseInt(elemento.dataset.animacionRetraso) || 0;
          
          setTimeout(() => {
            elemento.classList.add(elemento.dataset.animacionClase || 'animacion-aparecer--visible');
          }, retraso);
          
          this.observador.unobserve(elemento);
        }
      });
    }, opciones);
  }
  
  configurarEventos() {
    // Recalcular en resize
    const manejarResize = debounce(() => {
      this.animarElementosExistentes();
    }, 200);
    
    window.addEventListener('resize', manejarResize);
    
    // Observar cambios en preferencias de movimiento
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', (evento) => {
      this.reduccionMovimiento = evento.matches;
      if (this.reduccionMovimiento) {
        this.desactivarTodasLasAnimaciones();
      }
    });
  }
  
  animarElementosExistentes() {
    // Buscar todos los elementos con clase de animación
    const selectores = [
      '[data-animacion]',
      '.animacion-aparecer',
      '.animacion-aparecer-izquierda',
      '.animacion-aparecer-derecha',
      '.animacion-escalar',
    ];
    
    selectores.forEach(selector => {
      const elementos = document.querySelectorAll(selector);
      elementos.forEach(elemento => this.observar(elemento));
    });
  }
  
  observar(elemento) {
    if (!elemento || this.reduccionMovimiento) return;
    
    // Determinar tipo de animación
    const tipoAnimacion = elemento.dataset.animacion || 'aparecer';
    const retraso = elemento.dataset.animacionRetraso || 0;
    
    // Asignar clase de animación si no tiene
    if (!elemento.dataset.animacionClase) {
      const claseAnimacion = this.obtenerClaseAnimacion(tipoAnimacion);
      elemento.dataset.animacionClase = claseAnimacion;
      elemento.classList.add(claseAnimacion);
    }
    
    if (retraso) {
      elemento.dataset.animacionRetraso = retraso;
    }
    
    this.observador.observe(elemento);
    this.elementosAnimados.push(elemento);
  }
  
  obtenerClaseAnimacion(tipo) {
    const mapeo = {
      'aparecer': 'animacion-aparecer',
      'aparecer-izquierda': 'animacion-aparecer-izquierda',
      'aparecer-derecha': 'animacion-aparecer-derecha',
      'escalar': 'animacion-escalar',
    };
    
    return mapeo[tipo] || 'animacion-aparecer';
  }
  
  desactivarTodasLasAnimaciones() {
    this.elementosAnimados.forEach(elemento => {
      elemento.classList.add('animacion-aparecer--visible');
    });
  }
  
  destruir() {
    if (this.observador) {
      this.observador.disconnect();
    }
    this.elementosAnimados = [];
  }
}

// Función para registrar elementos individualmente
export function registrarAnimacionScroll(elemento, opciones = {}) {
  const animaciones = new AnimacionesScroll();
  animaciones.observar(elemento);
  return animaciones;
}

// Inicializar animaciones cuando el DOM esté listo
export function inicializarAnimacionesScroll() {
  return new AnimacionesScroll();
}

export default AnimacionesScroll;