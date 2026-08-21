// Lógica de navegación y header
import { crearIcono } from '../componentes/icono.js';
import { configuracionNavegacion, mostrarBotonPresupuestoEnHeader, textoBotonPresupuesto } from '../configuracion/navegacion.js';

export class Navegacion {
  constructor() {
    this.encabezado = null;
    this.botonMenu = null;
    this.menuMovil = null;
    this.estaAbierto = false;
    this.ultimaPosicionScroll = 0;
    this.esMovil = window.innerWidth < 1024;
    
    this.inicializar();
  }
  
  inicializar() {
    this.crearEncabezado();
    this.configurarEventos();
    this.actualizarEstadoScroll();
  }
  
  crearEncabezado() {
    this.encabezado = document.createElement('header');
    this.encabezado.className = 'encabezado';
    this.encabezado.setAttribute('role', 'banner');
    
    const navegacionFiltrada = configuracionNavegacion.filter(item => item.activa);
    
    this.encabezado.innerHTML = `
      <div class="encabezado__contenedor">
        <a href="#inicio" class="encabezado__marca" aria-label="Nodo Ético - Ir al inicio">
          <span class="encabezado__logo">Nodo<span class="encabezado__logo-acento">Ético</span></span>
        </a>
        
        <nav class="encabezado__navegacion" aria-label="Navegación principal">
          <ul class="encabezado__lista" role="menubar">
            ${navegacionFiltrada.map(item => `
              <li role="none">
                <a href="${item.enlace}" class="encabezado__enlace ${item.id === 'inicio' ? 'encabezado__enlace--activa' : ''}" role="menuitem" data-nav-id="${item.id}">
                  ${item.etiqueta}
                </a>
              </li>
            `).join('')}
          </ul>
        </nav>
        
        <div class="encabezado__acciones">
          ${mostrarBotonPresupuestoEnHeader ? `
            <a href="#presupuesto" class="boton boton--primario boton--pequeno">
              ${textoBotonPresupuesto}
            </a>
          ` : ''}
        </div>
        
        <button
          class="encabezado__boton-menu"
          aria-label="Abrir menú de navegación"
          aria-expanded="false"
          aria-controls="menu-movil"
        >
          ${crearIcono('menu', 24)}
        </button>
      </div>
    `;
    
    // Crear menú móvil
    this.crearMenuMovil(navegacionFiltrada);
    
    document.body.prepend(this.encabezado);
    document.body.prepend(this.crearEstilosHeader());
    
    this.botonMenu = this.encabezado.querySelector('.encabezado__boton-menu');
  }
  
  crearMenuMovil(navegacion) {
    this.menuMovil = document.createElement('div');
    this.menuMovil.className = 'encabezado__menu-movil';
    this.menuMovil.id = 'menu-movil';
    this.menuMovil.setAttribute('aria-hidden', 'true');
    
    this.menuMovil.innerHTML = `
      <div class="encabezado__menu-movil-contenido">
        <nav aria-label="Navegación móvil">
          <ul class="encabezado__menu-movil-lista" role="menu">
            ${navegacion.map(item => `
              <li role="none">
                <a href="${item.enlace}" class="encabezado__menu-movil-enlace ${item.id === 'inicio' ? 'encabezado__menu-movil-enlace--activa' : ''}" role="menuitem" data-nav-movil-id="${item.id}">
                  ${item.etiqueta}
                </a>
              </li>
            `).join('')}
          </ul>
        </nav>
        
        <div class="encabezado__menu-movil-acciones">
          ${mostrarBotonPresupuestoEnHeader ? `
            <a href="#presupuesto" class="boton boton--primario boton--grande encabezado__menu-movil-boton">
              ${textoBotonPresupuesto}
            </a>
          ` : ''}
        </div>
      </div>
    `;
    
    this.encabezado.appendChild(this.menuMovil);
  }
  
  crearEstilosHeader() {
    const estilos = document.createElement('style');
    estilos.textContent = `
      body {
        padding-top: var(--altura-header);
      }
    `;
    return estilos;
  }
  
  configurarEventos() {
    // Botón menú móvil
    if (this.botonMenu) {
      this.botonMenu.addEventListener('click', () => {
        this.alternarMenu();
      });
    }
    
    // Cerrar menú al hacer clic en enlaces
    const enlacesMenuMovil = this.menuMovil.querySelectorAll('a');
    enlacesMenuMovil.forEach(enlace => {
      enlace.addEventListener('click', () => {
        this.cerrarMenu();
      });
    });
    
    // Scroll para header
    window.addEventListener('scroll', () => {
      this.manejarScroll();
    }, { passive: true });
    
    // Redimensionar
    window.addEventListener('resize', () => {
      this.manejarRedimension();
    });
    
    // Tecla Escape para cerrar menú
    document.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape' && this.estaAbierto) {
        this.cerrarMenu();
      }
    });
    
    // Actualizar enlace activo en scroll
    this.configurarScrollSpy();
  }
  
  alternarMenu() {
    this.estaAbierto = !this.estaAbierto;
    
    this.menuMovil.classList.toggle('encabezado__menu-movil--abierto', this.estaAbierto);
    this.menuMovil.setAttribute('aria-hidden', !this.estaAbierto);
    this.botonMenu.setAttribute('aria-expanded', this.estaAbierto);
    
    // Cambiar icono del botón
    const icono = this.estaAbierto ? 'x-circle' : 'menu';
    this.botonMenu.innerHTML = crearIcono(icono, 24);
    this.botonMenu.setAttribute('aria-label', this.estaAbierto ? 'Cerrar menú' : 'Abrir menú');
    
    // Bloquear scroll del body
    document.body.style.overflow = this.estaAbierto ? 'hidden' : '';
    
    // Focus trap
    if (this.estaAbierto) {
      const primerEnlace = this.menuMovil.querySelector('a');
      if (primerEnlace) primerEnlace.focus();
    }
  }
  
  cerrarMenu() {
    if (!this.estaAbierto) return;
    this.alternarMenu();
  }
  
  manejarScroll() {
    this.actualizarEstadoScroll();
    this.actualizarEnlaceActivo();
  }
  
  actualizarEstadoScroll() {
    const posicionActual = window.pageYOffset || document.documentElement.scrollTop;
    
    // Agregar/quitar sombra
    this.encabezado.classList.toggle('encabezado--scrolled', posicionActual > 10);
    
    this.ultimaPosicionScroll = posicionActual;
  }
  
  manejarRedimension() {
    const nuevoEsMovil = window.innerWidth < 1024;
    
    if (this.esMovil !== nuevoEsMovil) {
      this.esMovil = nuevoEsMovil;
      
      if (!this.esMovil && this.estaAbierto) {
        this.cerrarMenu();
      }
    }
  }
  
  configurarScrollSpy() {
    const enlaces = this.encabezado.querySelectorAll('.encabezado__enlace');
    const secciones = [];
    
    enlaces.forEach(enlace => {
      const idSeccion = enlace.getAttribute('href')?.replace('#', '');
      const seccion = document.getElementById(idSeccion);
      if (seccion) {
        secciones.push({ enlace, seccion, id: idSeccion });
      }
    });
    
    const observer = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          const idSeccion = entrada.target.id;
          
          // Actualizar enlace activo
          enlaces.forEach(enlace => {
            const esActivo = enlace.getAttribute('href') === `#${idSeccion}`;
            enlace.classList.toggle('encabezado__enlace--activa', esActivo);
          });
          
          // Actualizar enlace activo en menú móvil
          const enlacesMovil = this.menuMovil.querySelectorAll('.encabezado__menu-movil-enlace');
          enlacesMovil.forEach(enlace => {
            const esActivo = enlace.getAttribute('href') === `#${idSeccion}`;
            enlace.classList.toggle('encabezado__menu-movil-enlace--activa', esActivo);
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0,
    });
    
    secciones.forEach(({ seccion }) => {
      observer.observe(seccion);
    });
  }
  
  actualizarEnlaceActivo() {
    const secciones = configuracionNavegacion
      .filter(item => item.activa)
      .map(item => ({
        id: item.id,
        elemento: document.getElementById(item.id),
      }))
      .filter(({ elemento }) => elemento);
    
    const scrollPosicion = window.pageYOffset + 150;
    
    let seccionActiva = null;
    
    secciones.forEach(({ id, elemento }) => {
      const topo = elemento.offsetTop;
      const abajo = topo + elemento.offsetHeight;
      
      if (scrollPosicion >= topo && scrollPosicion < abajo) {
        seccionActiva = id;
      }
    });
    
    if (seccionActiva) {
      const enlaces = this.encabezado.querySelectorAll('.encabezado__enlace');
      enlaces.forEach(enlace => {
        const esActivo = enlace.getAttribute('href') === `#${seccionActiva}`;
        enlace.classList.toggle('encabezado__enlace--activa', esActivo);
      });
      
      const enlacesMovil = this.menuMovil.querySelectorAll('.encabezado__menu-movil-enlace');
      enlacesMovil.forEach(enlace => {
        const esActivo = enlace.getAttribute('href') === `#${seccionActiva}`;
        enlace.classList.toggle('encabezado__menu-movil-enlace--activa', esActivo);
      });
    }
  }
  
  destruir() {
    if (this.encabezado) {
      this.encabezado.remove();
    }
  }
}

export function inicializarNavegacion() {
  return new Navegacion();
}

export default Navegacion;