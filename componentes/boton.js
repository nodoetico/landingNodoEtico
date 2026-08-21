// Componente de botón reutilizable
import { crearIcono } from './icono.js';

export function crearBoton({
  texto = 'Botón',
  variante = 'primario', // primario, secundario, fantasma, peligro
  tamano = 'mediano', // pequeno, mediano, grande
  iconoIzquierda = null,
  iconoDerecha = null,
  enlace = null,
  tipo = 'button',
  clasesAdicionales = [],
  deshabilitado = false,
  cargando = false,
  ariaLabel = null,
  onClick = null,
} = {}) {
  const elemento = document.createElement(enlace ? 'a' : 'button');
  
  const clases = ['boton', `boton--${variante}`, `boton--${tamano}`, ...clasesAdicionales];
  
  if (cargando) clases.push('boton--cargando');
  if (deshabilitado) clases.push('boton--deshabilitado');
  
  elemento.className = clases.join(' ');
  
  if (enlace) {
    elemento.href = enlace;
  } else {
    elemento.type = tipo;
  }
  
  if (deshabilitado) {
    elemento.setAttribute('aria-disabled', 'true');
    if (!enlace) elemento.disabled = true;
  }
  
  if (ariaLabel) {
    elemento.setAttribute('aria-label', ariaLabel);
  }
  
  if (onClick && !deshabilitado) {
    elemento.addEventListener('click', onClick);
  }
  
  let contenidoHTML = '';
  
  if (cargando) {
    contenidoHTML += `
      <span class="boton__cargando" aria-hidden="true">
        <svg class="boton__spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-dasharray="31.42" stroke-dashoffset="10"/>
        </svg>
      </span>
      <span class="boton__texto boton__texto--oculto">Cargando...</span>
    `;
  } else {
    if (iconoIzquierda) {
      contenidoHTML += `<span class="boton__icono boton__icono--izquierda" aria-hidden="true">${crearIcono(iconoIzquierda, 18)}</span>`;
    }
    
    contenidoHTML += `<span class="boton__texto">${texto}</span>`;
    
    if (iconoDerecha) {
      contenidoHTML += `<span class="boton__icono boton__icono--derecha" aria-hidden="true">${crearIcono(iconoDerecha, 18)}</span>`;
    }
  }
  
  elemento.innerHTML = contenidoHTML;
  
  return elemento;
}

export function renderizarBoton(configuracion) {
  return crearBoton(configuracion);
}

export default crearBoton;