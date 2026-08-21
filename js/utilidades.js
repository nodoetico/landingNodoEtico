// Utilidades generales del proyecto

/**
 * Función debounce para limitar la frecuencia de ejecución
 */
export function debounce(funcion, espera = 100) {
  let temporizador;
  return function ejecutar(...argumentos) {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => funcion.apply(this, argumentos), espera);
  };
}

/**
 * Función throttle para limitar la frecuencia de ejecución
 */
export function throttle(funcion, limite = 100) {
  let ultimaEjecucion = 0;
  return function ejecutar(...argumentos) {
    const ahora = Date.now();
    if (ahora - ultimaEjecucion >= limite) {
      funcion.apply(this, argumentos);
      ultimaEjecucion = ahora;
    }
  };
}

/**
 * Detectar si el elemento está visible en el viewport
 */
export function estaEnViewport(elemento, margen = 0) {
  const rectangulo = elemento.getBoundingClientRect();
  return (
    rectangulo.top <= (window.innerHeight || document.documentElement.clientHeight) - margen &&
    rectangulo.bottom >= margen &&
    rectangulo.left <= (window.innerWidth || document.documentElement.clientWidth) - margen &&
    rectangulo.right >= margen
  );
}

/**
 * Obtener el porcentaje de scroll de la página
 */
export function obtenerPorcentajeScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return scrollTop / scrollHeight;
}

/**
 * Suavizar scroll a un elemento
 */
export function scrollSuaveHacia(elemento, compensacion = 0) {
  const elementoTop = elemento.getBoundingClientRect().top + window.pageYOffset;
  const destinoTop = elementoTop - compensacion;
  
  window.scrollTo({
    top: destinoTop,
    behavior: 'smooth',
  });
}

/**
 * Suavizar scroll a una posición
 */
export function scrollSuaveA(posicion) {
  window.scrollTo({
    top: posicion,
    behavior: 'smooth',
  });
}

/**
 * Obtener el valor de una variable CSS
 */
export function obtenerVariableCSS(variable) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}

/**
 * Establecer el valor de una variable CSS
 */
export function establecerVariableCSS(variable, valor) {
  document.documentElement.style.setProperty(variable, valor);
}

/**
 * Formatear un número con separadores de miles
 */
export function formatearNumero(numero) {
  return new Intl.NumberFormat('es-AR').format(numero);
}

/**
 * Formatear una fecha en formato local
 */
export function formatearFecha(fecha) {
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(fecha));
}

/**
 * Generar un ID único
 */
export function generarIdUnico() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validar si un email es válido
 */
export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validar si un teléfono es válido
 */
export function validarTelefono(telefono) {
  const regex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
  return regex.test(telefono.replace(/\s/g, ''));
}

/**
 * Sanitizar texto para prevenir XSS
 */
export function sanitizarTexto(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

/**
 * Crear elemento con clases
 */
export function crearElementoConClases(tag, clases = []) {
  const elemento = document.createElement(tag);
  if (clases.length > 0) {
    elemento.classList.add(...clases);
  }
  return elemento;
}

/**
 * Agregar event listener de forma segura
 */
export function agregarEventListenerSeguro(elemento, evento, manejador, opciones) {
  if (elemento && typeof elemento.addEventListener === 'function') {
    elemento.addEventListener(evento, manejador, opciones);
    return () => elemento.removeEventListener(evento, manejador, opciones);
  }
  return () => {};
}

/**
 * Detectar dispositivo móvil
 */
export function detectarMovil() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Detectar si es touch device
 */
export function detectarTouch() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Obtener parámetros de URL
 */
export function obtenerParametrosURL() {
  const parametros = new URLSearchParams(window.location.search);
  const resultado = {};
  for (const [clave, valor] of parametros) {
    resultado[clave] = valor;
  }
  return resultado;
}

/**
 * Establecer parámetro en URL sin recargar
 */
export function establecerParametroURL(clave, valor) {
  const url = new URL(window.location);
  url.searchParams.set(clave, valor);
  window.history.replaceState({}, '', url);
}

/**
 * Copiar texto al portapapeles
 */
export async function copiarAlPortapapeles(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch (error) {
    console.error('Error al copiar:', error);
    return false;
  }
}

/**
 * Esperar un tiempo determinado
 */
export function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Ejecutar función cuando el DOM esté listo
 */
export function cuandoDOMListo(funcion) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', funcion);
  } else {
    funcion();
  }
}