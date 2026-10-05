/**
 * Catálogo de servicios de NODO ÉTICO.
 * Se mantiene fuera de los componentes para poder reutilizar los datos
 * (por ejemplo, en los datos estructurados JSON-LD para buscadores)
 * sin arrastrar los iconos JSX.
 */
export const SERVICIOS = [
  {
    titulo: 'Desarrollo de Software',
    descripcion:
      'Aplicaciones web y móviles a medida con arquitectura moderna y escalable.',
  },
  {
    titulo: 'Automatización Inteligente',
    descripcion:
      'Optimizamos procesos repetitivos con workflows automatizados y robótica de software.',
  },
  {
    titulo: 'IA Aplicada',
    descripcion:
      'Modelos de machine learning, procesamiento de lenguaje natural y visión computacional.',
  },
  {
    titulo: 'Sistemas Empresariales',
    descripcion:
      'ERP, CRM y plataformas de gestión empresarial personalizadas para tu industria.',
  },
  {
    titulo: 'Integraciones',
    descripcion:
      'Conectamos tus herramientas favoritas con APIs robustas y middleware inteligente.',
  },
  {
    titulo: 'Soluciones SaaS',
    descripcion:
      'Plataformas cloud-native multi-tenant con facturación recurrente y escalabilidad horizontal.',
  },
  {
    titulo: 'Bots Inteligentes',
    descripcion:
      'Chatbots con IA conversacional, asistentes virtuales y automatización de atención al cliente.',
  },
  {
    titulo: 'Plataformas Personalizadas',
    descripcion:
      'Marketplaces, dashboards, portales web y aplicaciones business-to-business a medida.',
  },
] as const;