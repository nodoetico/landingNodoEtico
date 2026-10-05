import { Resend } from "resend";
import { EMAIL_CONTACTO } from "@/lib/config";

/**
 * Límite de envíos por IP para frenar el spam.
 * Guarda en memoria un registro simple: suficiente para una landing
 * de un solo servidor. En un entorno serverless distribuido
 * convendría reemplazarlo por Upstash Redis o similar.
 */
const LIMITE_POR_IP = 5;
const VENTANA_MS = 10 * 60 * 1000; // 10 minutos
const enviosPorIp = new Map<string, number[]>();

/**
 * Indica si una IP ya superó el límite de envíos en la ventana actual.
 */
function exceedsLimite(ip: string): boolean {
  const ahora = Date.now();
  const recientes = (enviosPorIp.get(ip) ?? []).filter(
    (marca) => ahora - marca < VENTANA_MS
  );

  if (recientes.length >= LIMITE_POR_IP) {
    enviosPorIp.set(ip, recientes);
    return true;
  }

  recientes.push(ahora);
  enviosPorIp.set(ip, recientes);
  return false;
}

/**
 * Escapa los caracteres especiales del HTML.
 * Sin esto, un mensaje con `<script>` se inyectaría tal cual en el correo.
 */
function escaparHtml(valor: string): string {
  return valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Normaliza un valor recibido: recorta, corta y escapa.
 * @param valor Texto del cliente.
 * @param maximo Longitud máxima permitida.
 */
function limpiar(valor: unknown, maximo: number): string {
  return escaparHtml(String(valor ?? "").trim().slice(0, maximo));
}

/**
 * Maneja el envío del formulario de contacto
 * POST /api/contacto
 * Recibe los datos del formulario y envía un correo vía Resend
 */
export async function POST(request: Request) {
  try {
    // --- Anti-spam: límite de frecuencia por IP ---
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "desconocida";

    if (exceedsLimite(ip)) {
      return Response.json(
        { error: "Demasiados envíos. Intentá de nuevo en unos minutos." },
        { status: 429 }
      );
    }

    // --- Anti-spam: honeypot ---
    // Campo invisible para humanos; los bots lo completan siempre.
    const cuerpo = await request.json();
    if (cuerpo?.sitioWeb) {
      // Se responde con éxito para no darle pistas al bot.
      return Response.json({ mensaje: "Mensaje enviado correctamente" });
    }

    const { nombre, empresa, correo, whatsapp, mensaje } = cuerpo ?? {};

    // --- Validación de campos obligatorios ---
    const nombreLimpio = String(nombre ?? "").trim();
    const empresaLimpia = String(empresa ?? "").trim();
    const correoLimpio = String(correo ?? "").trim();
    const mensajeLimpio = String(mensaje ?? "").trim();

    if (!nombreLimpio || !empresaLimpia || !correoLimpio || !mensajeLimpio) {
      return Response.json(
        { error: "Todos los campos obligatorios deben estar completos" },
        { status: 400 }
      );
    }

    if (nombreLimpio.length > 120 || empresaLimpia.length > 120) {
      return Response.json(
        { error: "El nombre o la empresa son demasiado extensos" },
        { status: 400 }
      );
    }

    if (mensajeLimpio.length > 4000) {
      return Response.json(
        { error: "El mensaje es demasiado extenso" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
      return Response.json(
        { error: "El correo electrónico no es válido" },
        { status: 400 }
      );
    }

    // WhatsApp es opcional, pero si viene debe ser un teléfono válido.
    const whatsappLimpio = String(whatsapp ?? "").trim();
    if (whatsappLimpio && !/^\+?[\d\s()-]{7,20}$/.test(whatsappLimpio)) {
      return Response.json(
        { error: "El número de WhatsApp no es válido" },
        { status: 400 }
      );
    }

    // La configuración del servicio se verifica recién después de validar
    // la petición: un formulario mal completado debe recibir un 400,
    // no un 500 que lo confunda con una caída del servidor.
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Falta la variable RESEND_API_KEY en el entorno.");
      return Response.json(
        { error: "API de correo no configurada. Contacta al administrador." },
        { status: 500 }
      );
    }

    // Todo el contenido se escapa antes de inyectarse en el HTML del correo.
    const contenidoHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00b4d8;">Nuevo contacto desde NODO ÉTICO</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #222; font-weight: bold; background: #111;">Nombre</td>
            <td style="padding: 10px; border: 1px solid #222; background: #111;">${limpiar(nombreLimpio, 120)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #222; font-weight: bold; background: #111;">Empresa</td>
            <td style="padding: 10px; border: 1px solid #222; background: #111;">${limpiar(empresaLimpia, 120)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #222; font-weight: bold; background: #111;">Correo</td>
            <td style="padding: 10px; border: 1px solid #222; background: #111;">${limpiar(correoLimpio, 120)}</td>
          </tr>
          ${
            whatsappLimpio
              ? `
          <tr>
            <td style="padding: 10px; border: 1px solid #222; font-weight: bold; background: #111;">WhatsApp</td>
            <td style="padding: 10px; border: 1px solid #222; background: #111;">${limpiar(whatsappLimpio, 20)}</td>
          </tr>
          `
              : ""
          }
          <tr>
            <td style="padding: 10px; border: 1px solid #222; font-weight: bold; background: #111;" colspan="2">Mensaje</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #222; background: #111;" colspan="2">${limpiar(mensajeLimpio, 4000)}</td>
          </tr>
        </table>
      </div>
    `;

    const resend = new Resend(apiKey);

    // El remitente debe ser un dominio verificado en Resend.
    // Sin esta variable se usa la dirección de prueba de la cuenta.
    const remitente =
      process.env.RESEND_EMAIL_REMITENTE ?? "NODO ÉTICO <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from: remitente,
      to: [process.env.RESEND_EMAIL_DESTINO ?? EMAIL_CONTACTO],
      replyTo: correoLimpio,
      subject: `Nuevo contacto de ${limpiar(nombreLimpio, 60)} - ${limpiar(empresaLimpia, 60)}`,
      html: contenidoHtml,
    });

    if (error) {
      console.error("Error al enviar correo con Resend:", error);
      return Response.json(
        { error: "Error al enviar el mensaje. Intentá de nuevo." },
        { status: 500 }
      );
    }

    return Response.json({
      mensaje: "Mensaje enviado correctamente",
      id: data?.id,
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}