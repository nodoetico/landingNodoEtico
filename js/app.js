// Archivo principal de la aplicación
import { inicializarNavegacion } from './navegacion.js';
import { crearBotonWhatsApp } from '../componentes/boton-whatsapp.js';
import { crearPieDePagina } from '../componentes/pie-de-pagina.js';
import { inicializarAnimacionesScroll } from './animaciones.js';
import { inicializarFormularioPresupuesto, crearFormularioPresupuesto } from '../componentes/formulario-presupuesto.js';
import { crearSistemaParticulas } from '../componentes/particulas.js';
import { configuracionEmpresa } from '../configuracion/empresa.js';
import servicios from '../datos/servicios.js';
import proyectos from '../datos/proyectos.js';
import pasosTrabajo from '../datos/pasos-trabajo.js';
import { crearTarjetaServicio } from '../componentes/tarjeta-servicio.js';
import { crearTarjetaProyecto } from '../componentes/tarjeta-proyecto.js';
import { crearIcono } from '../componentes/icono.js';
import { configuracionContacto } from '../configuracion/contacto.js';
import configuracionRedes from '../configuracion/redes.js';
import { scrollSuaveHacia, cuandoDOMListo, debounce } from './utilidades.js';

class AplicacionLanding {
  constructor() {
    this.navegacion = null;
    this.particulas = null;
    this.animaciones = null;
    
    this.inicializar();
  }
  
  async inicializar() {
    // Esperar a que el DOM esté listo
    await new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
    
    this.configurarSEO();
    this.configurarMetas();
    this.renderizarSecciones();
    this.inicializarComponentes();
    this.configurarSmoothScroll();
    this.configurarPerformance();
  }
  
  configurarSEO() {
    document.title = `${configuracionEmpresa.nombre} - ${configuracionEmpresa.descripcionCorta}`;
    
    // Meta description
    let metaDescripcion = document.querySelector('meta[name="description"]');
    if (!metaDescripcion) {
      metaDescripcion = document.createElement('meta');
      metaDescripcion.name = 'description';
      document.head.appendChild(metaDescripcion);
    }
    metaDescripcion.content = configuracionEmpresa.descripcionLarga;
    
    // Open Graph
    this.configurarOpenGraph();
    
    // Twitter Cards
    this.configurarTwitterCards();
  }
  
  configurarOpenGraph() {
    const metasOG = [
      { property: 'og:title', content: `${configuracionEmpresa.nombre} - ${configuracionEmpresa.descripcionCorta}` },
      { property: 'og:description', content: configuracionEmpresa.descripcionLarga },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'es_AR' },
      { property: 'og:site_name', content: configuracionEmpresa.nombre },
    ];
    
    metasOG.forEach(({ property, content }) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
  }
  
  configurarTwitterCards() {
    const metasTwitter = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${configuracionEmpresa.nombre} - ${configuracionEmpresa.descripcionCorta}` },
      { name: 'twitter:description', content: configuracionEmpresa.descripcionLarga },
    ];
    
    metasTwitter.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
  }
  
  configurarMetas() {
    // Viewport
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    viewport.content = 'width=device-width, initial-scale=1.0';
    
    // Theme color
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.name = 'theme-color';
      document.head.appendChild(themeColor);
    }
    themeColor.content = configuracionEmpresa.colores.primario;
    
    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
  }
  
  renderizarSecciones() {
    const main = document.querySelector('main') || document.createElement('main');
    main.id = 'contenido-principal';
    
    // Hero
    main.appendChild(this.crearSeccionHero());
    
    // Quiénes somos
    main.appendChild(this.crearSeccionQuienesSomos());
    
    // Servicios
    main.appendChild(this.crearSeccionServicios());
    
    // Proyectos
    main.appendChild(this.crearSeccionProyectos());
    
    // Cómo trabajamos
    main.appendChild(this.crearSeccionProceso());
    
    // Propuesta de valor
    main.appendChild(this.crearSeccionPropuestaValor());
    
    // Presupuesto
    main.appendChild(this.crearSeccionPresupuesto());
    
    // Contacto
    main.appendChild(this.crearSeccionContacto());
    
    if (!document.querySelector('main')) {
      document.body.appendChild(main);
    }
    
    // Footer
    document.body.appendChild(crearPieDePagina());
    
    // Botón WhatsApp
    const botonWhatsApp = crearBotonWhatsApp();
    if (botonWhatsApp) {
      document.body.appendChild(botonWhatsApp);
    }
  }
  
  crearSeccionHero() {
    const seccion = document.createElement('section');
    seccion.id = 'inicio';
    seccion.className = 'hero';
    seccion.setAttribute('aria-label', 'Inicio');
    
    seccion.innerHTML = `
      <div class="hero__fondo">
        <canvas id="hero-canvas" class="hero__canvas"></canvas>
      </div>
      
      <div class="hero__contenido">
        <span class="hero__etiqueta" data-animacion="aparecer">Soluciones de Software</span>
        
        <h1 class="hero__titulo" data-animacion="aparecer" data-animacion-retraso="100">
          Tecnología inteligente para transformar
          <span class="hero__titulo-acento">ideas en soluciones reales</span>
        </h1>
        
        <p class="hero__subtitulo" data-animacion="aparecer" data-animacion-retraso="200">
          Desarrollamos software, sistemas inteligentes y automatización para empresas que buscan innovar con calidad y confiabilidad.
        </p>
        
        <div class="hero__acciones" data-animacion="aparecer" data-animacion-retraso="300">
          <a href="#presupuesto" class="boton boton--primario boton--grande">
            Solicitar presupuesto
          </a>
          <a href="#servicios" class="boton boton--secundario boton--grande">
            Conocer servicios
          </a>
        </div>
      </div>
      
      <div class="hero__scroll-indicador" aria-hidden="true">
        <span>Scroll</span>
        ${crearIcono('chevron-down', 20)}
      </div>
    `;
    
    return seccion;
  }
  
  crearSeccionQuienesSomos() {
    const seccion = document.createElement('section');
    seccion.id = 'quienes-somos';
    seccion.className = 'seccion quienes-somos';
    seccion.setAttribute('aria-labelledby', 'quienes-somos-titulo');
    
    seccion.innerHTML = `
      <div class="contenedor">
        <div class="seccion__encabezado" data-animacion="aparecer">
          <span class="seccion__etiqueta">Quiénes somos</span>
          <h2 id="quienes-somos-titulo" class="seccion__titulo">Nodo Ético</h2>
          <p class="seccion__subtitulo">Desarrollamos tecnología seria, moderna y pensada para resolver problemas reales.</p>
        </div>
        
        <div class="quienes-somos__contenido">
          <div class="quienes-somos__texto" data-animacion="aparecer-izquierda">
            <p class="quienes-somos__parrafo">
              ${configuracionEmpresa.descripcionLarga}
            </p>
            <p class="quienes-somos__destacado">
              ${configuracionEmpresa.filosofia}
            </p>
          </div>
          
          <div class="quienes-somos__valores" data-animacion="aparecer-derecha">
            <div class="quienes-somos__valor">
              <div class="quienes-somos__valor-icono">
                ${crearIcono('zap', 24)}
              </div>
              <div class="quienes-somos__valor-texto">
                <h3 class="quienes-somos__valor-titulo">Enfoque Tecnológico</h3>
                <p class="quienes-somos__valor-descripcion">${configuracionEmpresa.enfoque}</p>
              </div>
            </div>
            
            <div class="quienes-somos__valor">
              <div class="quienes-somos__valor-icono">
                ${crearIcono('target', 24)}
              </div>
              <div class="quienes-somos__valor-texto">
                <h3 class="quienes-somos__valor-titulo">Compromiso</h3>
                <p class="quienes-somos__valor-descripcion">Cada proyecto es único. Trabajamos de la mano con nuestros clientes para garantizar resultados que superen expectativas.</p>
              </div>
            </div>
            
            <div class="quienes-somos__valor">
              <div class="quienes-somos__valor-icono">
                ${crearIcono('shield', 24)}
              </div>
              <div class="quienes-somos__valor-texto">
                <h3 class="quienes-somos__valor-titulo">Calidad</h3>
                <p class="quienes-somos__valor-descripcion">Código limpio, arquitectura escalable y buenas prácticas. No hacemos atajos.</p>
              </div>
            </div>
            
            <div class="quienes-somos__valor">
              <div class="quienes-somos__valor-icono">
                ${crearIcono('users', 24)}
              </div>
              <div class="quienes-somos__valor-texto">
                <h3 class="quienes-somos__valor-titulo">Cercanía</h3>
                <p class="quienes-somos__valor-descripcion">Comunicación clara, transparencia total y acompañamiento continuo durante todo el proyecto.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    return seccion;
  }
  
  crearSeccionServicios() {
    const seccion = document.createElement('section');
    seccion.id = 'servicios';
    seccion.className = 'seccion servicios';
    seccion.setAttribute('aria-labelledby', 'servicios-titulo');
    
    const tarjetasHTML = servicios
      .filter(servicio => servicio.activo)
      .map((servicio, indice) => `
        <div data-animacion="aparecer" data-animacion-retraso="${indice * 100}">
          ${this.crearTarjetaServicioHTML(servicio)}
        </div>
      `).join('');
    
    seccion.innerHTML = `
      <div class="contenedor">
        <div class="seccion__encabezado" data-animacion="aparecer">
          <span class="seccion__etiqueta">Servicios</span>
          <h2 id="servicios-titulo" class="seccion__titulo">Soluciones que impulsan tu negocio</h2>
          <p class="seccion__subtitulo">Ofrecemos un ecosistema completo de servicios tecnológicos diseñados para resolver problemas reales.</p>
        </div>
        
        <div class="grid-tarjetas">
          ${tarjetasHTML}
        </div>
      </div>
    `;
    
    return seccion;
  }
  
  crearTarjetaServicioHTML(servicio) {
    return `
      <article class="tarjeta-servicio" data-servicio-id="${servicio.id}">
        <div class="tarjeta-servicio__contenido">
          <div class="tarjeta-servicio__icono-contenedor" aria-hidden="true">
            ${crearIcono(servicio.icono, 32, 'tarjeta-servicio__icono')}
          </div>
          <h3 class="tarjeta-servicio__titulo">${servicio.titulo}</h3>
          <p class="tarjeta-servicio__descripcion">${servicio.descripcion}</p>
          <ul class="tarjeta-servicio__caracteristicas" aria-label="Características">
            ${servicio.caracteristicas.map(caracteristica => `
              <li class="tarjeta-servicio__caracteristica">
                ${crearIcono('check-square', 14, 'tarjeta-servicio__icono-caracteristica')}
                <span>${caracteristica}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        <div class="tarjeta-servicio__borde" aria-hidden="true"></div>
      </article>
    `;
  }
  
  crearSeccionProyectos() {
    const seccion = document.createElement('section');
    seccion.id = 'proyectos';
    seccion.className = 'seccion proyectos';
    seccion.setAttribute('aria-labelledby', 'proyectos-titulo');
    
    const tarjetasHTML = proyectos
      .filter(proyecto => proyecto.activo)
      .map((proyecto, indice) => `
        <div data-animacion="aparecer" data-animacion-retraso="${(indice % 2) * 150}">
          ${this.crearTarjetaProyectoHTML(proyecto)}
        </div>
      `).join('');
    
    seccion.innerHTML = `
      <div class="contenedor">
        <div class="seccion__encabezado" data-animacion="aparecer">
          <span class="seccion__etiqueta">Proyectos</span>
          <h2 id="proyectos-titulo" class="seccion__titulo">Soluciones que generan resultados</h2>
          <p class="seccion__subtitulo">Cada proyecto es una historia de éxito. Conocé cómo ayudamos a nuestros clientes a alcanzar sus objetivos.</p>
        </div>
        
        <div class="proyectos__grid">
          ${tarjetasHTML}
        </div>
      </div>
    `;
    
    return seccion;
  }
  
  crearTarjetaProyectoHTML(proyecto) {
    let imagenHTML = '';
    if (proyecto.imagen) {
      imagenHTML = `
        <div class="tarjeta-proyecto__imagen-contenedor">
          <img
            class="tarjeta-proyecto__imagen"
            src="assets/imagenes/${proyecto.imagen}"
            alt="${proyecto.titulo} - Proyecto de Nodo Ético"
            loading="lazy"
            width="600"
            height="400"
            onerror="this.style.display='none'"
          />
          <div class="tarjeta-proyecto__imagen-overlay" aria-hidden="true"></div>
        </div>
      `;
    }
    
    return `
      <article class="tarjeta-proyecto" data-proyecto-id="${proyecto.id}">
        <div class="tarjeta-proyecto__contenido">
          ${imagenHTML}
          <div class="tarjeta-proyecto__informacion">
            <span class="tarjeta-proyecto__categoria">${proyecto.categoria}</span>
            <h3 class="tarjeta-proyecto__titulo">${proyecto.titulo}</h3>
            <p class="tarjeta-proyecto__descripcion">${proyecto.descripcion}</p>
            
            <div class="tarjeta-proyecto__tecnologias">
              ${proyecto.tecnologias.map(tecnologia => `
                <span class="tarjeta-proyecto__tecnologia">${tecnologia}</span>
              `).join('')}
            </div>
            
            <div class="tarjeta-proyecto__detalles">
              ${proyecto.problema ? `
                <div class="tarjeta-proyecto__detalle">
                  <h4 class="tarjeta-proyecto__detalle-titulo">
                    ${crearIcono('search', 16, 'tarjeta-proyecto__detalle-icono')}
                    Problema
                  </h4>
                  <p class="tarjeta-proyecto__detalle-texto">${proyecto.problema}</p>
                </div>
              ` : ''}
              
              ${proyecto.resultado ? `
                <div class="tarjeta-proyecto__detalle">
                  <h4 class="tarjeta-proyecto__detalle-titulo">
                    ${crearIcono('trending-up', 16, 'tarjeta-proyecto__detalle-icono')}
                    Resultado
                  </h4>
                  <p class="tarjeta-proyecto__detalle-texto">${proyecto.resultado}</p>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </article>
    `;
  }
  
  crearSeccionProceso() {
    const seccion = document.createElement('section');
    seccion.id = 'proceso';
    seccion.className = 'seccion proceso';
    seccion.setAttribute('aria-labelledby', 'proceso-titulo');
    
    const pasosHTML = pasosTrabajo.map((paso, indice) => `
      <div class="proceso__paso" data-animacion="aparecer" data-animacion-retraso="${indice * 100}">
        <span class="proceso__paso-numero">${paso.numero}</span>
        <div class="proceso__paso-icono">
          ${crearIcono(paso.icono, 24)}
        </div>
        <h3 class="proceso__paso-titulo">${paso.titulo}</h3>
        <p class="proceso__paso-descripcion">${paso.descripcion}</p>
      </div>
    `).join('');
    
    seccion.innerHTML = `
      <div class="contenedor">
        <div class="seccion__encabezado" data-animacion="aparecer">
          <span class="seccion__etiqueta" style="color: var(--color-acento);">Proceso</span>
          <h2 id="proceso-titulo" class="seccion__titulo">Cómo trabajamos</h2>
          <p class="seccion__subtitulo">Un proceso claro, transparente y enfocado en resultados.</p>
        </div>
        
        <div class="proceso__timeline">
          ${pasosHTML}
        </div>
      </div>
    `;
    
    return seccion;
  }
  
  crearSeccionPropuestaValor() {
    const seccion = document.createElement('section');
    seccion.id = 'propuesta-valor';
    seccion.className = 'seccion propuesta-valor';
    seccion.setAttribute('aria-labelledby', 'propuesta-valor-titulo');
    
    const items = [
      {
        icono: 'code',
        titulo: 'Desarrollo personalizado',
        descripcion: 'Software a medida, sin plantillas genéricas. Cada línea de código está pensada para tu negocio.',
      },
      {
        icono: 'shield',
        titulo: 'Arquitectura escalable',
        descripcion: 'Sistemas diseñados para crecer con tu empresa. Sin límites técnicos.',
      },
      {
        icono: 'smartphone',
        titulo: 'Diseño responsive',
        descripcion: 'Experiencias perfectas en cualquier dispositivo. Mobile first, siempre.',
      },
      {
        icono: 'zap',
        titulo: 'Tecnología moderna',
        descripcion: 'Utilizamos las últimas tecnologías para garantizar rendimiento y confiabilidad.',
      },
      {
        icono: 'settings',
        titulo: 'Automatización',
        descripcion: 'Procesos automatizados que liberan tiempo y reducen errores.',
      },
      {
        icono: 'brain',
        titulo: 'Inteligencia artificial',
        descripcion: 'IA integrada para potenciar la toma de decisiones y automatizar operaciones.',
      },
      {
        icono: 'users',
        titulo: 'Acompañamiento',
        descripcion: 'No te dejamos solo. Estamos presentes en cada etapa del proyecto.',
      },
      {
        icono: 'trending-up',
        titulo: 'Mantenimiento y evolución',
        descripcion: 'Tu producto evoluciona constantemente. Soporte y mejoras continuas.',
      },
    ];
    
    const itemsHTML = items.map((item, indice) => `
      <div class="propuesta-valor__item" data-animacion="aparecer" data-animacion-retraso="${indice * 80}">
        <div class="propuesta-valor__item-icono" aria-hidden="true">
          ${crearIcono(item.icono, 32)}
        </div>
        <h3 class="propuesta-valor__item-titulo">${item.titulo}</h3>
        <p class="propuesta-valor__item-descripcion">${item.descripcion}</p>
      </div>
    `).join('');
    
    seccion.innerHTML = `
      <div class="contenedor">
        <div class="seccion__encabezado" data-animacion="aparecer">
          <span class="seccion__etiqueta">Propuesta de valor</span>
          <h2 id="propuesta-valor-titulo" class="seccion__titulo">¿Por qué Nodo Ético?</h2>
          <p class="seccion__subtitulo">No solo desarrollamos software. Creamos soluciones que generan valor real para tu negocio.</p>
        </div>
        
        <div class="propuesta-valor__grid">
          ${itemsHTML}
        </div>
      </div>
    `;
    
    return seccion;
  }
  
  crearSeccionPresupuesto() {
    const seccion = document.createElement('section');
    seccion.id = 'presupuesto';
    seccion.className = 'seccion presupuesto';
    seccion.setAttribute('aria-labelledby', 'presupuesto-titulo');
    
    const formulario = crearFormularioPresupuesto();
    
    seccion.innerHTML = `
      <div class="contenedor">
        <div class="seccion__encabezado" data-animacion="aparecer">
          <span class="seccion__etiqueta">Presupuesto</span>
          <h2 id="presupuesto-titulo" class="seccion__titulo">Solicitar presupuesto</h2>
          <p class="seccion__subtitulo">Contanos sobre tu proyecto. Nosotros nos encargamos del resto.</p>
        </div>
        
        <div data-animacion="aparecer" data-animacion-retraso="100">
          <!-- El formulario se insertará aquí -->
        </div>
      </div>
    `;
    
    // Insertar formulario
    const contenedorFormulario = seccion.querySelector('[data-animacion]');
    contenedorFormulario.appendChild(formulario);
    
    return seccion;
  }
  
  crearSeccionContacto() {
    const seccion = document.createElement('section');
    seccion.id = 'contacto';
    seccion.className = 'seccion contacto';
    seccion.setAttribute('aria-labelledby', 'contacto-titulo');
    
    seccion.innerHTML = `
      <div class="contenedor">
        <div class="contacto__contenido">
          <div class="contacto__info" data-animacion="aparecer-izquierda">
            <div class="contacto__cta">
              <h2 id="contacto-titulo" class="contacto__cta-titulo">
                ¿Tenés una idea? Hagámosla realidad.
              </h2>
              <p class="contacto__cta-texto">
                Estamos listos para escuchar tu proyecto y convertirlo en una solución tecnológica de alto nivel.
              </p>
            </div>
            
            <div class="contacto__canales">
              <a href="https://wa.me/${configuracionContacto.whatsapp.numero}" class="contacto__canal" target="_blank" rel="noopener noreferrer">
                <div class="contacto__canal-icono">
                  ${crearIcono('message-circle', 24)}
                </div>
                <div class="contacto__canal-texto">
                  <span class="contacto__canal-titulo">WhatsApp</span>
                  <span class="contacto__canal-valor">Contactanos por WhatsApp</span>
                </div>
              </a>
              
              <a href="mailto:${configuracionContacto.email.direccion}" class="contacto__canal">
                <div class="contacto__canal-icono">
                  ${crearIcono('mail', 24)}
                </div>
                <div class="contacto__canal-texto">
                  <span class="contacto__canal-titulo">Email</span>
                  <span class="contacto__canal-valor">${configuracionContacto.email.direccion}</span>
                </div>
              </a>
              
              <a href="${configuracionContacto.telefono.enlace}" class="contacto__canal">
                <div class="contacto__canal-icono">
                  ${crearIcono('phone', 24)}
                </div>
                <div class="contacto__canal-texto">
                  <span class="contacto__canal-titulo">Teléfono</span>
                  <span class="contacto__canal-valor">${configuracionContacto.telefono.numero}</span>
                </div>
              </a>
              
              <div class="contacto__canal">
                <div class="contacto__canal-icono">
                  ${crearIcono('globe', 24)}
                </div>
                <div class="contacto__canal-texto">
                  <span class="contacto__canal-titulo">Ubicación</span>
                  <span class="contacto__canal-valor">${configuracionContacto.ubicacion.ciudad}, ${configuracionContacto.ubicacion.pais}</span>
                </div>
              </div>
            </div>
            
            ${configuracionRedes && configuracionRedes.length > 0 ? `
              <div class="contacto__redes">
                ${configuracionRedes.filter(red => red.activa).map(red => `
                  <a href="${red.url}" class="contacto__red-boton" target="_blank" rel="noopener noreferrer" aria-label="${red.nombre}">
                    ${crearIcono(red.icono, 20)}
                  </a>
                `).join('')}
              </div>
            ` : ''}
          </div>
          
          <div class="contacto__mapa" data-animacion="aparecer-derecha">
            <div class="contacto__mapa-placeholder">
              <div class="contacto__mapa-placeholder-icono">
                ${crearIcono('globe', 32)}
              </div>
              <p class="contacto__mapa-placeholder-texto">Trabajamos de manera remota con clientes de toda Latinoamérica y el mundo.</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    return seccion;
  }
  
  inicializarComponentes() {
    // Navegación
    this.navegacion = inicializarNavegacion();
    
    // Animaciones
    this.animaciones = inicializarAnimacionesScroll();
    
    // Formulario de presupuesto
    const formulario = document.getElementById('formulario-presupuesto');
    if (formulario) {
      inicializarFormularioPresupuesto(formulario);
    }
    
    // Partículas
    this.inicializarParticulas();
  }
  
  inicializarParticulas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    // Verificar si el usuario prefiere reducir movimiento
    const reduccionMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduccionMovimiento) return;
    
    this.particulas = crearSistemaParticulas(canvas, {
      cantidadParticulas: window.innerWidth < 768 ? 30 : 60,
      interaccionRaton: window.innerWidth >= 768,
    });
    
    this.particulas.iniciar();
  }
  
  configurarSmoothScroll() {
    // Smooth scroll para enlaces internos
    document.addEventListener('click', (evento) => {
      const enlace = evento.target.closest('a[href^="#"]');
      if (!enlace) return;
      
      const idDestino = enlace.getAttribute('href');
      if (idDestino === '#') return;
      
      const elementoDestino = document.querySelector(idDestino);
      if (!elementoDestino) return;
      
      evento.preventDefault();
      
      const alturaHeader = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--altura-header')) || 70;
      
      window.scrollTo({
        top: elementoDestino.offsetTop - alturaHeader,
        behavior: 'smooth',
      });
      
      // Actualizar URL sin recargar
      history.pushState(null, null, idDestino);
    });
  }
  
  configurarPerformance() {
    // Lazy loading para imágenes
    if ('loading' in HTMLImageElement.prototype) {
      const imagenes = document.querySelectorAll('img[loading="lazy"]');
      imagenes.forEach(imagen => {
        if (imagen.dataset.src) {
          imagen.src = imagen.dataset.src;
        }
      });
    }
    
    // Preload de fuentes críticas
    const preloadFuentes = [
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap', as: 'font', type: 'font/woff2', crossorigin: true },
    ];
    
    preloadFuentes.forEach(fuente => {
      const link = document.createElement('link');
      link.rel = 'preload';
      Object.entries(fuente).forEach(([clave, valor]) => {
        link.setAttribute(clave, valor);
      });
      document.head.appendChild(link);
    });
  }
}

// Inicializar aplicación
const app = new AplicacionLanding();

export default AplicacionLanding;