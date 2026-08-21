# Landing Page — Nodo Ético

Landing page profesional para **Nodo Ético**, una empresa dedicada al desarrollo de soluciones de software, sistemas inteligentes, automatización y tecnología aplicada.

## Características Principales

- **Diseño Mobile First**: Experiencia optimizada para dispositivos móviles
- **Sistema de Partículas**: Animaciones tecnológicas en el header/hero
- **Formulario de Presupuesto**: Integración directa con WhatsApp
- **Botón Flotante de WhatsApp**: Acceso rápido para contactar
- **SEO Optimizado**: Meta tags, Open Graph, estructura semántica
- **Accesibilidad**: HTML semántico, focus visible, contraste adecuado
- **Rendimiento**: Animaciones optimizadas, lazy loading
- **Responsive**: Funciona en todos los tamaños de pantalla (320px - 1920px+)

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Flexbox, Grid, `clamp()`, animations
- **JavaScript ES6+**: Módulos, clases, Canvas API
- **Sin dependencias externas**: Código puro y optimizado

## Estructura del Proyecto

```
landingNodoEtico/
├── index.html                    # Archivo principal
├── configuracion/                # Configuración centralizada
│   ├── contacto.js              # Datos de contacto (WhatsApp, email, etc.)
│   ├── empresa.js               # Información empresarial
│   ├── navegacion.js            # Menú de navegación
│   └── redes.js                 # Redes sociales
├── componentes/                  # Componentes reutilizables
│   ├── boton.js                 # Botón genérico
│   ├── boton-whatsapp.js        # Botón flotante de WhatsApp
│   ├── campo-formulario.js      # Campo de formulario
│   ├── formulario-presupuesto.js # Formulario completo
│   ├── icono.js                 # Sistema de iconos SVG
│   ├── particulas.js            # Sistema de partículas animadas
│   ├── pie-de-pagina.js         # Footer
│   ├── tarjeta-proyecto.js      # Tarjeta de proyecto
│   └── tarjeta-servicio.js      # Tarjeta de servicio
├── datos/                        # Datos estructurados
│   ├── pasosTrabajo.js          # Proceso de trabajo
│   ├── proyectos.js             # Proyectos realizados
│   └── servicios.js             # Servicios ofrecidos
├── css/                          # Estilos
│   ├── estilos-animaciones.css  # Animaciones y transiciones
│   ├── estilos-base.css         # Variables y estilos globales
│   ├── estilos-componentes.css  # Estilos de componentes
│   ├── estilos-responsive.css   # Media queries
│   └── estilos-secciones.css    # Estilos por sección
├── js/                           # JavaScript
│   ├── app.js                   # Aplicación principal
│   ├── animaciones.js           # Animaciones al scroll
│   ├── navegacion.js            # Lógica del header
│   └── utilidades.js            # Funciones auxiliares
├── assets/                       # Recursos estáticos
│   ├── iconos/                  # Iconos SVG
│   └── imagenes/                # Imágenes del proyecto
└── README.md                     # Esta documentación
```

## Cómo Instalar

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/landingNodoEtico.git
   cd landingNodoEtico
   ```

2. **Abrir en navegador:**
   - Simplemente abre `index.html` en tu navegador favorito.
   - No se requiere servidor local, pero se recomienda para módulos ES6.

3. **Usar un servidor local (recomendado):**
   
   **Con Node.js (instalado previamente):**
   ```bash
   # Si no tienes Node.js, descárgalo desde https://nodejs.org
   
   # Usando npx (recomendado - no requiere instalación)
   npx serve .
   
   # O usando http-server
   npx http-server .
   
   # O instalar globalmente
   npm install -g serve
   serve .
   ```
   
   **Con Python:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Con VS Code:**
   - Instala la extensión "Live Server"
   - Clic derecho en `index.html` → "Open with Live Server"

4. **Abrir en el navegador:**
   ```
   http://localhost:3000  (para serve)
   http://localhost:8000  (para Python)
   http://localhost:5500  (para Live Server)
   ```

## Cómo Ejecutar en Desarrollo

```bash
# Si usas Live Server en VS Code:
# 1. Instala la extensión "Live Server"
# 2. Abre index.html
# 3. Clic derecho → "Open with Live Server"

# Si usas Node.js:
npx serve .
```

## Cómo Construir para Producción

Este proyecto utiliza JavaScript puro sin necesidad de compilación. Para producción:

1. **Minificar CSS:**
   ```bash
   # Usando cssnano (instalar previamente: npm install -g cssnano-cli)
   cssnano css/estilos-base.css css/estilos-base.min.css
   cssnano css/estilos-componentes.css css/estilos-componentes.min.css
   cssnano css/estilos-secciones.css css/estilos-secciones.min.css
   cssnano css/estilos-animaciones.css css/estilos-animaciones.min.css
   cssnano css/estilos-responsive.css css/estilos-responsive.min.css
   ```

2. **Minificar JavaScript:**
   ```bash
   # Usando terser (instalar previamente: npm install -g terser)
   terser js/app.js -o js/app.min.js -c -m
   terser js/utilidades.js -o js/utilidades.min.js -c -m
   terser js/navegacion.js -o js/navegacion.min.js -c -m
   terser js/animaciones.js -o js/animaciones.min.js -c -m
   ```

3. **Optimizar imágenes:**
   - Usar formato WebP cuando sea posible
   - Compresión con herramientas como TinyPNG o Squoosh
   - Implementar lazy loading (ya implementado)

4. **Subir a hosting:**
   - Netlify, Vercel, GitHub Pages, o cualquier hosting estático

## Cómo Cambiar el Número de WhatsApp

1. Abrir el archivo `configuracion/contacto.js`
2. Modificar el valor de `numero`:
   ```javascript
   whatsapp: {
     numero: '5491112345678', // Tu número en formato internacional
     mensajePredeterminado: 'Hola Nodo Ético...',
   }
   ```
3. Guardar los cambios
4. ¡Listo! El cambio se reflejará automáticamente en todo el sitio

**IMPORTANTE:** El número debe estar en formato internacional sin espacios ni guiones. Ejemplo: `5491112345678` (Argentina).

## Cómo Modificar los Servicios

1. Abrir el archivo `datos/servicios.js`
2. Editar el array `servicios`:
   ```javascript
   export const servicios = [
     {
       id: 'mi-servicio',
       titulo: 'Nombre del Servicio',
       descripcion: 'Descripción del servicio...',
       icono: 'code', // Ver iconos disponibles en componentes/icono.js
       caracteristicas: [
         'Característica 1',
         'Característica 2',
       ],
       activo: true, // true para mostrar, false para ocultar
     },
     // Agregar más servicios aquí...
   ];
   ```
3. Guardar los cambios

## Cómo Agregar Proyectos

1. Abrir el archivo `datos/proyectos.js`
2. Editar el array `proyectos`:
   ```javascript
   export const proyectos = [
     {
       id: 'mi-proyecto',
       titulo: 'Nombre del Proyecto',
       descripcion: 'Descripción del proyecto...',
       categoria: 'Categoría',
       imagen: 'nombre-imagen.jpg', // Colocar en assets/imagenes/
       tecnologias: ['React', 'Node.js'],
       problema: 'Problema que resolvió...',
       resultado: 'Resultado obtenido...',
       enlace: '#',
       activo: true,
     },
     // Agregar más proyectos aquí...
   ];
   ```
3. Si el proyecto tiene imagen, colocarla en `assets/imagenes/`
4. Guardar los cambios

## Cómo Modificar Datos de Contacto

1. Abrir el archivo `configuracion/contacto.js`
2. Modificar los valores necesarios:
   ```javascript
   export const configuracionContacto = {
     whatsapp: {
       numero: '5491112345678',
       mensajePredeterminado: 'Hola Nodo Ético...',
     },
     email: {
       direccion: 'tu@email.com',
     },
     telefono: {
       numero: '+54 9 11 1234-5678',
       enlace: 'tel:+5491112345678',
     },
     ubicacion: {
       ciudad: 'Tu Ciudad',
       pais: 'Tu País',
     },
   };
   ```
3. Guardar los cambios

## Cómo Personalizar las Partículas

1. Abrir el archivo `componentes/particulas.js`
2. Modificar la configuración en la función constructora:
   ```javascript
   this.configuracion = {
     cantidadParticulas: 80,        // Cantidad de partículas
     velocidadMaxima: 0.5,          // Velocidad máxima
     tamanoMinimo: 1,               // Tamaño mínimo
     tamanoMaximo: 3,               // Tamaño máximo
     distanciaConexion: 120,        // Distancia para conexiones
     colorPrincipal: 'rgba(59, 130, 246, 0.5)',  // Azul
     colorSecundario: 'rgba(6, 182, 212, 0.5)', // Cyan
     interaccionRaton: true,        // Reaccionar al cursor
   };
   ```
3. Guardar los cambios

**Nota:** En dispositivos móviles, automáticamente se reducen las partículas para mejor rendimiento.

## Cómo Agregar Nuevas Secciones

1. Abrir `js/app.js`
2. Crear un nuevo método `crearSeccionNueva()`:
   ```javascript
   crearSeccionNueva() {
     const seccion = document.createElement('section');
     seccion.id = 'nueva-seccion';
     seccion.className = 'seccion';
     seccion.setAttribute('aria-labelledby', 'nueva-seccion-titulo');
     
     seccion.innerHTML = `
       <div class="contenedor">
         <div class="seccion__encabezado" data-animacion="aparecer">
           <span class="seccion__etiqueta">Etiqueta</span>
           <h2 id="nueva-seccion-titulo" class="seccion__titulo">Título</h2>
           <p class="seccion__subtitulo">Subtítulo</p>
         </div>
         
         <div data-animacion="aparecer">
           <!-- Contenido de la sección -->
         </div>
       </div>
     `;
     
     return seccion;
   }
   ```
3. Llamar al método en `renderizarSecciones()`:
   ```javascript
   // Después de otras secciones
   main.appendChild(this.crearSeccionNueva());
   ```
4. Agregar estilos específicos en `css/estilos-secciones.css`
5. Agregar enlace de navegación en `configuracion/navegacion.js`

## Configuración de Colores

Los colores se definen en `css/estilos-base.css`:

```css
:root {
  --color-primario: #0f172a;    /* Azul oscuro profundo */
  --color-secundario: #3b82f6;  /* Azul tecnológico */
  --color-acento: #06b6d4;      /* Cyan luminoso */
  --color-fondo: #ffffff;       /* Blanco limpio */
  --color-fondo-oscuro: #0f172a; /* Secciones oscuras */
  --color-texto: #1e293b;       /* Texto principal */
  --color-texto-claro: #64748b; /* Texto secundario */
}
```

## Solución de Problemas

### Las partículas no aparecen
- Verificar que no se tenga activada la opción "Reducir movimiento" en el sistema
- Abrir consola del navegador (F12) y buscar errores
- Verificar que `hero-canvas` exista en el DOM

### El formulario no funciona
- Verificar que JavaScript esté habilitado
- Abrir consola del navegador para ver errores
- Validar que el número de WhatsApp esté correctamente configurado

### El menú móvil no abre
- Verificar que los eventos de JavaScript se estén cargando
- Revisar la consola del navegador

### Imágenes no cargan
- Verificar que las imágenes estén en `assets/imagenes/`
- Comprobar que los nombres coincidan con los definidos en `datos/proyectos.js`

## Rendimiento

- **Partículas adaptativas**: Se reducen automáticamente en móviles
- **Lazy loading**: Imágenes se cargan bajo demanda
- **Animaciones eficientes**: Usan `transform` y `opacity`
- **prefers-reduced-motion**: Respeta preferencias del usuario
- **Sin dependencias**: Código puro sin librerías externas

## Accesibilidad

- HTML semántico
- Labels correctamente asociados
- Focus visible
- Contraste adecuado
- Navegación por teclado
- aria-labels donde es necesario

## SEO

- Meta description optimizada
- Open Graph para redes sociales
- Twitter Cards
- Estructura de headings correcta (único H1)
- URLs limpias
- robots.txt y sitemap.xml recomendados

## Navegadores Soportados

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

## Licencia

© 2024 Nodo Ético. Todos los derechos reservados.

---

**Desarrollado con ❤️ por Nodo Ético**