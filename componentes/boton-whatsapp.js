// Componente de botón flotante de WhatsApp
import { crearIcono } from './icono.js';
import { configuracionContacto } from '../configuracion/contacto.js';

export function crearBotonWhatsApp({
  mostrar = true,
  posicion = 'derecha-abajo', // derecha-abajo, izquierda-abajo
  textoAlternativo = 'Contactar por WhatsApp',
} = {}) {
  if (!mostrar) return null;
  
  const { numero, mensajePredeterminado } = configuracionContacto.whatsapp;
  
  const elemento = document.createElement('a');
  elemento.href = `https://wa.me/${numero}?text=${encodeURIComponent(mensajePredeterminado)}`;
  elemento.target = '_blank';
  elemento.rel = 'noopener noreferrer';
  elemento.className = `boton-whatsapp boton-whatsapp--${posicion}`;
  elemento.setAttribute('aria-label', textoAlternativo);
  elemento.title = textoAlternativo;
  
  elemento.innerHTML = `
    <span class="boton-whatsapp__icono" aria-hidden="true">
      ${crearIcono('message-circle', 28)}
    </span>
    <span class="boton-whatsapp__pulso" aria-hidden="true"></span>
  `;
  
  return elemento;
}

export function inicializarBotonWhatsApp() {
  const contenedor = document.createElement('div');
  contenedor.className = 'boton-whatsapp-contenedor';
  
  const boton = crearBotonWhatsApp();
  if (boton) {
    contenedor.appendChild(boton);
  }
  
  return contenedor;
}

export default crearBotonWhatsApp;