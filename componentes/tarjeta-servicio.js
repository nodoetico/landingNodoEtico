// Componente de tarjeta de servicio reutilizable
import { crearIcono } from './icono.js';

export function crearTarjetaServicio({
  id,
  titulo,
  descripcion,
  icono,
  caracteristicas = [],
  activo = true,
} = {}) {
  if (!activo) return null;
  
  const elemento = document.createElement('article');
  elemento.className = 'tarjeta-servicio';
  elemento.setAttribute('data-servicio-id', id);
  elemento.setAttribute('role', 'article');
  elemento.setAttribute('aria-labelledby', `servicio-titulo-${id}`);
  
  let caracteristicasHTML = '';
  if (caracteristicas.length > 0) {
    caracteristicasHTML = `
      <ul class="tarjeta-servicio__caracteristicas" aria-label="Características del servicio">
        ${caracteristicas.map(caracteristica => `
          <li class="tarjeta-servicio__caracteristica">
            ${crearIcono('check-square', 14, 'tarjeta-servicio__icono-caracteristica')}
            <span>${caracteristica}</span>
          </li>
        `).join('')}
      </ul>
    `;
  }
  
  elemento.innerHTML = `
    <div class="tarjeta-servicio__contenido">
      <div class="tarjeta-servicio__icono-contenedor" aria-hidden="true">
        ${crearIcono(icono, 32, 'tarjeta-servicio__icono')}
      </div>
      <h3 class="tarjeta-servicio__titulo" id="servicio-titulo-${id}">${titulo}</h3>
      <p class="tarjeta-servicio__descripcion">${descripcion}</p>
      ${caracteristicasHTML}
    </div>
    <div class="tarjeta-servicio__borde" aria-hidden="true"></div>
  `;
  
  return elemento;
}

export function renderizarServicios(servicios) {
  const contenedor = document.createDocumentFragment();
  
  servicios.forEach(servicio => {
    const tarjeta = crearTarjetaServicio(servicio);
    if (tarjeta) {
      contenedor.appendChild(tarjeta);
    }
  });
  
  return contenedor;
}

export default crearTarjetaServicio;