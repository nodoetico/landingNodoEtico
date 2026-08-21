// Componente de pie de página
import { crearIcono } from './icono.js';
import { configuracionEmpresa } from '../configuracion/empresa.js';
import { configuracionContacto } from '../configuracion/contacto.js';
import { configuracionRedes, mostrarRedesEnFooter } from '../configuracion/redes.js';
import { configuracionNavegacion } from '../configuracion/navegacion.js';

export function crearPieDePagina() {
  const footer = document.createElement('footer');
  footer.className = 'pie-de-pagina';
  footer.setAttribute('role', 'contentinfo');
  
  const navegacionFiltrada = configuracionNavegacion.filter(item => item.activa);
  const redesFiltradas = configuracionRedes.filter(red => red.activa);
  
  footer.innerHTML = `
    <div class="pie-de-pagina__contenedor">
      <div class="pie-de-pagina__superior">
        <div class="pie-de-pagina__marca">
          <div class="pie-de-pagina__logo">
            <span class="pie-de-pagina__logo-texto">${configuracionEmpresa.nombre}</span>
          </div>
          <p class="pie-de-pagina__descripcion">${configuracionEmpresa.descripcionCorta}</p>
          ${mostrarRedesEnFooter && redesFiltradas.length > 0 ? `
            <div class="pie-de-pagina__redes" aria-label="Redes sociales">
              ${redesFiltradas.map(red => `
                <a
                  href="${red.url}"
                  class="pie-de-pagina__red-enlace"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="${red.nombre}"
                >
                  ${crearIcono(red.icono, 20)}
                </a>
              `).join('')}
            </div>
          ` : ''}
        </div>
        
        <div class="pie-de-pagina__navegacion">
          <h4 class="pie-de-pagina__titulo-seccion">Navegación</h4>
          <nav aria-label="Navegación del pie de página">
            <ul class="pie-de-pagina__lista">
              ${navegacionFiltrada.map(item => `
                <li class="pie-de-pagina__item">
                  <a href="${item.enlace}" class="pie-de-pagina__enlace">${item.etiqueta}</a>
                </li>
              `).join('')}
            </ul>
          </nav>
        </div>
        
        <div class="pie-de-pagina__servicios">
          <h4 class="pie-de-pagina__titulo-seccion">Servicios</h4>
          <ul class="pie-de-pagina__lista">
            <li class="pie-de-pagina__item">Desarrollo de Software</li>
            <li class="pie-de-pagina__item">Aplicaciones Móviles</li>
            <li class="pie-de-pagina__item">Sistemas Web</li>
            <li class="pie-de-pagina__item">Automatización</li>
            <li class="pie-de-pagina__item">Inteligencia Artificial</li>
          </ul>
        </div>
        
        <div class="pie-de-pagina__contacto">
          <h4 class="pie-de-pagina__titulo-seccion">Contacto</h4>
          <ul class="pie-de-pagina__lista">
            <li class="pie-de-pagina__item">
              <a href="mailto:${configuracionContacto.email.direccion}" class="pie-de-pagina__enlace">
                ${crearIcono('mail', 16)}
                <span>${configuracionContacto.email.direccion}</span>
              </a>
            </li>
            <li class="pie-de-pagina__item">
              <a href="${configuracionContacto.telefono.enlace}" class="pie-de-pagina__enlace">
                ${crearIcono('phone', 16)}
                <span>${configuracionContacto.telefono.numero}</span>
              </a>
            </li>
            <li class="pie-de-pagina__item">
              <a
                href="https://wa.me/${configuracionContacto.whatsapp.numero}"
                class="pie-de-pagina__enlace"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${crearIcono('message-circle', 16)}
                <span>WhatsApp</span>
              </a>
            </li>
            <li class="pie-de-pagina__item pie-de-pagina__item--ubicacion">
              ${crearIcono('globe', 16)}
              <span>${configuracionContacto.ubicacion.ciudad}, ${configuracionContacto.ubicacion.pais}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="pie-de-pagina__inferior">
        <div class="pie-de-pagina__copyright">
          <p>&copy; ${new Date().getFullYear()} ${configuracionEmpresa.nombre}. Todos los derechos reservados.</p>
        </div>
        <div class="pie-de-pagina__legales">
          <a href="#" class="pie-de-pagina__enlace-legal">Política de privacidad</a>
          <a href="#" class="pie-de-pagina__enlace-legal">Términos y condiciones</a>
        </div>
      </div>
    </div>
  `;
  
  return footer;
}

export default crearPieDePagina;