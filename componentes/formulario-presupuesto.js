// Componente de formulario de presupuesto
import { crearCampoFormulario } from './campo-formulario.js';
import { crearBoton } from './boton.js';
import { configuracionContacto } from '../configuracion/contacto.js';

const camposFormulario = [
  {
    id: 'nombre',
    tipo: 'texto',
    etiqueta: 'Nombre completo',
    placeholder: 'Tu nombre',
    requerido: true,
    validacion: (valor) => valor.trim().length >= 2,
    mensajeError: 'Por favor, ingresá tu nombre (mínimo 2 caracteres).',
  },
  {
    id: 'empresa',
    tipo: 'texto',
    etiqueta: 'Empresa / Organización',
    placeholder: 'Nombre de tu empresa (opcional)',
    requerido: false,
  },
  {
    id: 'email',
    tipo: 'email',
    etiqueta: 'Email',
    placeholder: 'tu@email.com',
    requerido: true,
    validacion: (valor) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(valor);
    },
    mensajeError: 'Por favor, ingresá un email válido.',
  },
  {
    id: 'telefono',
    tipo: 'tel',
    etiqueta: 'Teléfono / WhatsApp',
    placeholder: '+54 9 11 1234-5678',
    requerido: true,
    validacion: (valor) => {
      const regex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
      return regex.test(valor.replace(/\s/g, ''));
    },
    mensajeError: 'Por favor, ingresá un número de teléfono válido.',
  },
  {
    id: 'tipo-proyecto',
    tipo: 'select',
    etiqueta: 'Tipo de proyecto',
    requerido: true,
    opciones: [
      { valor: 'sistema-web', etiqueta: 'Sistema web' },
      { valor: 'aplicacion-movil', etiqueta: 'Aplicación móvil' },
      { valor: 'software-empresarial', etiqueta: 'Software empresarial' },
      { valor: 'automatizacion', etiqueta: 'Automatización' },
      { valor: 'inteligencia-artificial', etiqueta: 'Inteligencia artificial' },
      { valor: 'landing-page', etiqueta: 'Landing page' },
      { valor: 'tienda-online', etiqueta: 'Tienda online' },
      { valor: 'otro', etiqueta: 'Otro' },
    ],
    validacion: (valor) => valor !== '',
    mensajeError: 'Por favor, seleccioná el tipo de proyecto.',
  },
  {
    id: 'presupuesto-estimado',
    tipo: 'texto',
    etiqueta: 'Presupuesto estimado (opcional)',
    placeholder: 'Ej: $500.000 - $1.000.000',
    requerido: false,
  },
  {
    id: 'descripcion-proyecto',
    tipo: 'textarea',
    etiqueta: 'Descripción del proyecto',
    placeholder: 'Contanos sobre tu proyecto. ¿Qué necesitás? ¿Cuáles son los objetivos?',
    requerido: true,
    filaMultiples: true,
    filas: 6,
    validacion: (valor) => valor.trim().length >= 10,
    mensajeError: 'Por favor, describí tu proyecto (mínimo 10 caracteres).',
  },
  {
    id: 'plazo-estimado',
    tipo: 'texto',
    etiqueta: 'Plazo estimado (opcional)',
    placeholder: 'Ej: 3 meses, 6 meses',
    requerido: false,
  },
];

export function crearFormularioPresupuesto() {
  const formulario = document.createElement('form');
  formulario.className = 'formulario-presupuesto';
  formulario.id = 'formulario-presupuesto';
  formulario.setAttribute('novalidate', '');
  
  const camposHTML = camposFormulario.map(campo => {
    const elementoCampo = crearCampoFormulario(campo);
    return `<div class="formulario-presupuesto__campo">${elementoCampo.outerHTML}</div>`;
  }).join('');
  
  formulario.innerHTML = `
    <div class="formulario-presupuesto__encabezado">
      <h3 class="formulario-presupuesto__titulo">Contanos sobre tu proyecto</h3>
      <p class="formulario-presupuesto__subtitulo">
        Completá el formulario y te contactaremos pronto para discutir tu proyecto.
      </p>
    </div>
    <div class="formulario-presupuesto__campos">
      ${camposHTML}
    </div>
    <div class="formulario-presupuesto__acciones">
      <div id="formulario-presupuesto-exito" class="formulario-presupuesto__mensaje formulario-presupuesto__mensaje--exito" role="alert" aria-live="polite" style="display: none;">
        <p>¡Formulario enviado correctamente! Se abrirá WhatsApp para continuar la conversación.</p>
      </div>
      <div id="formulario-presupuesto-error" class="formulario-presupuesto__mensaje formulario-presupuesto__mensaje--error" role="alert" aria-live="polite" style="display: none;">
        <p>Ha ocurrido un error. Por favor, intentá nuevamente.</p>
      </div>
      <button type="submit" class="boton boton--primario boton--grande formulario-presupuesto__boton">
        <span class="boton__texto">Solicitar presupuesto</span>
      </button>
    </div>
  `;
  
  return formulario;
}

export function inicializarFormularioPresupuesto(formulario) {
  if (!formulario) return;
  
  const campos = formulario.querySelectorAll('.campo-formulario__campo');
  const mensajeExito = formulario.querySelector('#formulario-presupuesto-exito');
  const mensajeError = formulario.querySelector('#formulario-presupuesto-error');
  
  // Validación en tiempo real
  campos.forEach(campo => {
    campo.addEventListener('blur', () => {
      validarCampo(campo);
    });
    
    campo.addEventListener('input', () => {
      if (campo.getAttribute('aria-invalid') === 'true') {
        validarCampo(campo);
      }
    });
  });
  
  // Envío del formulario
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    
    let formularioValido = true;
    
    campos.forEach(campo => {
      if (!validarCampo(campo)) {
        formularioValido = false;
      }
    });
    
    if (!formularioValido) {
      mostrarMensaje(mensajeError, true);
      return;
    }
    
    // Ocultar mensajes anteriores
    ocultarMensajes(formulario);
    
    // Recopilar datos
    const datosFormulario = new FormData(formulario);
    const datos = {};
    
    datosFormulario.forEach((valor, clave) => {
      datos[clave] = valor;
    });
    
    // Construir mensaje de WhatsApp
    const mensaje = construirMensajeWhatsApp(datos);
    
    // Abrir WhatsApp
    const { numero } = configuracionContacto.whatsapp;
    const urlWhatsApp = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    
    // Mostrar mensaje de éxito
    mostrarMensaje(mensajeExito, true);
    
    // Abrir WhatsApp después de un breve momento
    setTimeout(() => {
      window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');
    }, 500);
    
    // Limpiar formulario después de un momento
    setTimeout(() => {
      formulario.reset();
      ocultarMensajes(formulario);
    }, 2000);
  });
}

function validarCampo(campo) {
  const valor = campo.value;
  const esRequerido = campo.hasAttribute('required');
  const validacion = campo.getAttribute('data-validacion');
  const campoContenedor = campo.closest('.campo-formulario');
  const elementoError = campoContenedor?.querySelector('.campo-formulario__error');
  
  // Limpiar error anterior
  if (elementoError) {
    elementoError.textContent = '';
    elementoError.style.display = 'none';
  }
  campo.setAttribute('aria-invalid', 'false');
  
  // Validar requerido
  if (esRequerido && (!valor || valor.trim() === '')) {
    mostrarErrorCampo(campo, 'Este campo es obligatorio.');
    return false;
  }
  
  // Validar con función personalizada
  if (validacion === 'personalizada' && valor) {
    const campoConfig = camposFormulario.find(c => c.id === campo.name);
    if (campoConfig && campoConfig.validacion && !campoConfig.validacion(valor)) {
      mostrarErrorCampo(campo, campoConfig.mensajeError);
      return false;
    }
  }
  
  return true;
}

function mostrarErrorCampo(campo, mensaje) {
  const campoContenedor = campo.closest('.campo-formulario');
  const elementoError = campoContenedor?.querySelector('.campo-formulario__error');
  
  if (elementoError) {
    elementoError.textContent = mensaje;
    elementoError.style.display = 'block';
  }
  
  campo.setAttribute('aria-invalid', 'true');
}

function mostrarMensaje(elemento, mostrar) {
  if (elemento) {
    elemento.style.display = mostrar ? 'block' : 'none';
  }
}

function ocultarMensajes(formulario) {
  const mensajes = formulario.querySelectorAll('.formulario-presupuesto__mensaje');
  mensajes.forEach(mensaje => {
    mensaje.style.display = 'none';
  });
}

function construirMensajeWhatsApp(datos) {
  const { nombre, empresa, email, telefono, 'tipo-proyecto': tipoProyecto, 'presupuesto-estimado': presupuesto, 'descripcion-proyecto': descripcion, 'plazo-estimado': plazo } = datos;
  
  const tipoProyectoFormateado = tipoProyecto.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  let mensaje = `Hola Nodo Ético.\n\nQuisiera solicitar un presupuesto.\n\n`;
  mensaje += `Nombre: ${nombre}\n`;
  
  if (empresa) {
    mensaje += `Empresa: ${empresa}\n`;
  }
  
  mensaje += `Email: ${email}\n`;
  mensaje += `WhatsApp: ${telefono}\n`;
  mensaje += `Tipo de proyecto: ${tipoProyectoFormateado}\n`;
  
  if (presupuesto) {
    mensaje += `Presupuesto estimado: ${presupuesto}\n`;
  }
  
  mensaje += `Descripción: ${descripcion}\n`;
  
  if (plazo) {
    mensaje += `Plazo: ${plazo}\n`;
  }
  
  mensaje += `\nQuedo atento/a.`;
  
  return mensaje;
}

export default crearFormularioPresupuesto;