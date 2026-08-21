// Componente de campo de formulario reutilizable
export function crearCampoFormulario({
  id,
  tipo = 'texto',
  etiqueta,
  placeholder = '',
  requerido = false,
  valorPredeterminado = '',
  opciones = [], // Para selects
  filaMultiples = false, // Para textareas
  filas = 4, // Para textareas
  mensajeError = '',
  descripcion = null,
  deshabilitado = false,
  validacion = null, // Función de validación personalizada
} = {}) {
  const contenedor = document.createElement('div');
  contenedor.className = 'campo-formulario';
  
  const idUnico = `campo-${id}`;
  const idError = `${idUnico}-error`;
  const idDescripcion = `${idUnico}-descripcion`;
  
  let campoHTML = '';
  
  const atributosComunes = `
    id="${idUnico}"
    name="${id}"
    ${placeholder ? `placeholder="${placeholder}"` : ''}
    ${requerido ? 'required aria-required="true"' : ''}
    ${deshabilitado ? 'disabled' : ''}
    ${descripcion ? `aria-describedby="${idDescripcion}"` : ''}
    ${mensajeError ? `aria-invalid="false" aria-errormessage="${idError}"` : ''}
  `;
  
  switch (tipo) {
    case 'textarea':
      campoHTML = `
        <textarea
          ${atributosComunes}
          class="campo-formulario__campo campo-formulario__campo--textarea"
          rows="${filaMultiples ? filas : filas}"
          data-validacion="${validacion ? 'personalizada' : ''}"
        >${valorPredeterminado}</textarea>
      `;
      break;
      
    case 'select':
      const opcionesHTML = opciones.map(opcion => `
        <option value="${typeof opcion === 'object' ? opcion.valor : opcion}" ${typeof opcion === 'object' && opcion.seleccionado ? 'selected' : ''}>
          ${typeof opcion === 'object' ? opcion.etiqueta : opcion}
        </option>
      `).join('');
      
      campoHTML = `
        <select
          ${atributosComunes}
          class="campo-formulario__campo campo-formulario__campo--select"
          data-validacion="${validacion ? 'personalizada' : ''}"
        >
          <option value="" disabled ${!valorPredeterminado ? 'selected' : ''}>${placeholder || 'Seleccionar...'}</option>
          ${opcionesHTML}
        </select>
      `;
      break;
      
    default:
      campoHTML = `
        <input
          type="${tipo}"
          ${atributosComunes}
          value="${valorPredeterminado}"
          class="campo-formulario__campo campo-formulario__campo--${tipo}"
          data-validacion="${validacion ? 'personalizada' : ''}"
        />
      `;
  }
  
  contenedor.innerHTML = `
    <label for="${idUnico}" class="campo-formulario__etiqueta">
      ${etiqueta}
      ${requerido ? '<span class="campo-formulario__obligatorio" aria-label="obligatorio">*</span>' : ''}
    </label>
    ${campoHTML}
    ${descripcion ? `<span id="${idDescripcion}" class="campo-formulario__descripcion">${descripcion}</span>` : ''}
    <span id="${idError}" class="campo-formulario__error" role="alert" aria-live="polite"></span>
  `;
  
  return contenedor;
}

export function renderizarCampoFormulario(configuracion) {
  return crearCampoFormulario(configuracion);
}

export default crearCampoFormulario;