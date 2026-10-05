'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { enlaceWhatsApp } from '@/lib/config';

/**
 * Estado inicial del formulario de contacto
 */
const estadoInicial = {
  nombre: '',
  empresa: '',
  correo: '',
  whatsapp: '',
  mensaje: '',
  // Campo trampa anti-spam (honeypot): invisible para el usuario,
  // pero los bots automáticos lo completan.
  sitioWeb: '',
};

type EstadoFormulario = typeof estadoInicial;
type ErroresFormulario = Partial<Record<keyof EstadoFormulario, string>>;

/**
 * Sección de Contacto
 * Formulario profesional con validaciones y diseño elegante
 * Envía los datos a /api/contacto, que los reenvía por correo con Resend
 */
export default function SeccionContacto() {
  const [formulario, setFormulario] = useState<EstadoFormulario>(estadoInicial);
  const [errores, setErrores] = useState<ErroresFormulario>({});
  // Error del formulario completo (red o servidor), no de un campo puntual.
  const [errorGeneral, setErrorGeneral] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  /**
   * Maneja cambios en los campos del formulario.
   * Al escribir se limpia el error del campo y el error general.
   */
  const manejarCambio = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
    setErrorGeneral('');
    if (errores[name as keyof ErroresFormulario]) {
      setErrores((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * Valida todos los campos del formulario.
   * @returns `true` si no hay errores.
   */
  const validarFormulario = (): boolean => {
    const nuevosErrores: ErroresFormulario = {};

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    if (!formulario.empresa.trim()) {
      nuevosErrores.empresa = 'La empresa es obligatoria';
    }

    if (!formulario.correo.trim()) {
      nuevosErrores.correo = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo.trim())) {
      nuevosErrores.correo = 'Ingresa un correo válido';
    }

    if (
      formulario.whatsapp &&
      !/^\+?[\d\s()-]{7,20}$/.test(formulario.whatsapp.trim())
    ) {
      nuevosErrores.whatsapp = 'Ingresa un número válido (ej: +5493885788043)';
    }

    if (!formulario.mensaje.trim()) {
      nuevosErrores.mensaje = 'El mensaje es obligatorio';
    } else if (formulario.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  /**
   * Maneja el envío del formulario.
   * Valida en el cliente y delega el envío a la API del servidor.
   */
  const manejarEnvio = async (e: FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setEnviando(true);
    setErrorGeneral('');

    try {
      const respuesta = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formulario),
      });

      if (!respuesta.ok) {
        const error = await respuesta.json().catch(() => ({}));
        throw new Error(error.error || "Error al enviar el mensaje");
      }

      setEnviado(true);
      setFormulario(estadoInicial);

      setTimeout(() => setEnviado(false), 5000);
    } catch (error) {
      setErrorGeneral(
        error instanceof Error
          ? error.message
          : 'Error al enviar el mensaje. Intentá de nuevo.'
      );
    } finally {
      setEnviando(false);
    }
  };

  /**
   * Genera el mensaje de WhatsApp predefinido con los datos ya escritos.
   */
  const mensajeWhatsApp = enlaceWhatsApp(
    [
      'Hola NODO ÉTICO, quiero solicitar un presupuesto para mi empresa.',
      formulario.empresa ? `Empresa: ${formulario.empresa}` : '',
      formulario.mensaje ? `\n${formulario.mensaje}` : '',
    ]
      .filter(Boolean)
      .join('\n')
  );

  return (
    <section id="contacto" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-azul/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Contáctanos
          </h2>
          <p className="mx-auto max-w-2xl text-texto-secundario">
            Cuéntanos sobre tu proyecto y te enviaremos una propuesta
            personalizada en menos de 48 horas.
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl">
          {enviado ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-neon-verde/30 bg-neon-verde/5 p-12 text-center"
              role="status"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neon-verde/10">
                <svg
                  className="h-8 w-8 text-neon-verde"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-texto-principal">
                ¡Mensaje enviado!
              </h3>
              <p className="text-texto-secundario">
                Gracias por contactarnos. Te responderemos a la brevedad.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={manejarEnvio}
              // La validación la hacemos nosotros para poder mostrar
              // los mensajes en español.
              noValidate
              className="space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <CampoFormulario
                  label="Nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  valor={formulario.nombre}
                  error={errores.nombre}
                  onChange={manejarCambio}
                />
                <CampoFormulario
                  label="Empresa"
                  name="empresa"
                  type="text"
                  autoComplete="organization"
                  placeholder="Tu empresa"
                  valor={formulario.empresa}
                  error={errores.empresa}
                  onChange={manejarCambio}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <CampoFormulario
                  label="Correo electrónico"
                  name="correo"
                  type="email"
                  autoComplete="email"
                  placeholder="correo@ejemplo.com"
                  valor={formulario.correo}
                  error={errores.correo}
                  onChange={manejarCambio}
                />
                <CampoFormulario
                  label="WhatsApp (opcional)"
                  name="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+5493885788043"
                  valor={formulario.whatsapp}
                  error={errores.whatsapp}
                  onChange={manejarCambio}
                />
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="mb-2 block text-sm font-medium text-texto-principal"
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  value={formulario.mensaje}
                  onChange={manejarCambio}
                  aria-invalid={Boolean(errores.mensaje)}
                  aria-describedby={
                    errores.mensaje ? 'mensaje-error' : undefined
                  }
                  className={`w-full resize-none rounded-xl border bg-superficie px-4 py-3 text-sm text-texto-principal placeholder-texto-secundario transition-colors focus:border-neon-azul focus:outline-none focus:ring-1 focus:ring-neon-azul/50 ${
                    errores.mensaje
                      ? 'border-red-500/50'
                      : 'border-borde-sutil'
                  }`}
                />
                {errores.mensaje && (
                  <p id="mensaje-error" className="mt-1.5 text-xs text-red-400">
                    {errores.mensaje}
                  </p>
                )}
              </div>

              {/* Honeypot: oculto para personas, relleno para bots. */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="sitioWeb">Sitio web</label>
                <input
                  id="sitioWeb"
                  name="sitioWeb"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formulario.sitioWeb}
                  onChange={manejarCambio}
                />
              </div>

              {/* Error general del formulario (red o servidor). */}
              {errorGeneral && (
                <p
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errorGeneral}
                </p>
              )}

              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  type="submit"
                  disabled={enviando}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-neon-azul px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-neon-cyan disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {enviando ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </>
                  )}
                </button>

                <a
                  href={mensajeWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-borde-sutil px-8 py-3.5 text-sm font-semibold text-texto-principal transition-all hover:border-neon-verde/50 hover:text-neon-verde"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Componente reutilizable para campos de formulario.
 * Asocia cada error con su campo mediante `aria-describedby`.
 */
function CampoFormulario({
  label,
  name,
  type,
  autoComplete,
  placeholder,
  valor,
  error,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  placeholder: string;
  valor: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const idError = `${name}-error`;

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-texto-principal"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={valor}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? idError : undefined}
        className={`w-full rounded-xl border bg-superficie px-4 py-3 text-sm text-texto-principal placeholder-texto-secundario transition-colors focus:border-neon-azul focus:outline-none focus:ring-1 focus:ring-neon-azul/50 ${
          error ? 'border-red-500/50' : 'border-borde-sutil'
        }`}
      />
      {error && (
        <p id={idError} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}