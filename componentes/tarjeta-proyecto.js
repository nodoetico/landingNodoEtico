// Componente de tarjeta de proyecto reutilizable
import { crearIcono } from './icono.js';

export function crearTarjetaProyecto({
  id,
  titulo,
  descripcion,
  categoria,
  imagen,
  tecnologias = [],
  problema,
  resultado,
  enlace,
  activo = true,
} = {}) {
  if (!activo) return null;
  
  const elemento = document.createElement('article');
  elemento.className = 'tarjeta-proyecto';
  elemento.setAttribute('data-proyecto-id', id);
  elemento.setAttribute('role', 'article');
  elemento.setAttribute('aria-labelledby', `proyecto-titulo-${id}`);
  
  let tecnologiasHTML = '';
  if (tecnologias.length > 0) {
    tecnologiasHTML = `
      <div class="tarjeta-proyecto__tecnologias">
        ${tecnologias.map(tecnologia => `
          <span class="tarjeta-proyecto__tecnologia">${tecnologia}</span>
        `).join('')}
      </div>
    `;
  }
  
  let imagenHTML = '';
  if (imagen) {
    imagenHTML = `
      <div class="tarjeta-proyecto__imagen-contenedor">
        <img
          class="tarjeta-proyecto__imagen"
          src="assets/imagenes/${imagen}"
          alt="${titulo} - Proyecto de Nodo Ético"
          loading="lazy"
          width="600"
          height="400"
        />
        <div class="tarjeta-proyecto__imagen-overlay" aria-hidden="true"></div>
      </div>
    `;
  }
  
  let detallesHTML = '';
  if (problema || resultado) {
    detallesHTML = `
      <div class="tarjeta-proyecto__detalles">
        ${problema ? `
          <div class="tarjeta-proyecto__detalle">
            <h4 class="tarjeta-proyecto__detalle-titulo">
              ${crearIcono('search', 16, 'tarjeta-proyecto__detalle-icono')}
              Problema
            </h4>
            <p class="tarjeta-proyecto__detalle-texto">${problema}</p>
          </div>
        ` : ''}
        ${resultado ? `
          <div class="tarjeta-proyecto__detalle">
            <h4 class="tarjeta-proyecto__detalle-titulo">
              ${crearIcono('trending-up', 16, 'tarjeta-proyecto__detalle-icono')}
              Resultado
            </h4>
            <p class="tarjeta-proyecto__detalle-texto">${resultado}</p>
          </div>
        ` : ''}
      </div>
    `;
  }
  
  elemento.innerHTML = `
    <div class="tarjeta-proyecto__contenido">
      ${imagenHTML}
      <div class="tarjeta-proyecto__informacion">
        <span class="tarjeta-proyecto__categoria">${categoria}</span>
        <h3 class="tarjeta-proyecto__titulo" id="proyecto-titulo-${id}">${titulo}</h3>
        <p class="tarjeta-proyecto__descripcion">${descripcion}</p>
        ${tecnologiasHTML}
        ${detallesHTML}
        ${enlace ? `
          <a href="${enlace}" class="tarjeta-proyecto__enlace" target="_blank" rel="noopener noreferrer">
            <span>Ver proyecto</span>
            ${crearIcono('external-link', 16)}
          </a>
        ` : ''}
      </div>
    </div>
  `;
  
  return elemento;
}

export function renderizarProyectos(proyectos) {
  const contenedor = document.createDocumentFragment();
  
  proyectos.forEach(proyecto => {
    const tarjeta = crearTarjetaProyecto(proyecto);
    if (tarjeta) {
      contenedor.appendChild(tarjeta);
    }
  });
  
  return contenedor;
}

export default crearTarjetaProyecto;