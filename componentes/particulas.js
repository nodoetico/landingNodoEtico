// Componente de sistema de partículas animadas
export class SistemaParticulas {
  constructor(canvas, opciones = {}) {
    this.canvas = canvas;
    this.contexto = canvas.getContext('2d');
    this.particulas = [];
    this.animacionActiva = false;
    this.ultimoTiempo = 0;
    this.tiempoAcumulado = 0;
    this.ratonX = 0;
    this.ratonY = 0;
    this.ratonActivo = false;
    this.reduccionMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.esMovil = window.innerWidth < 768;
    
    // Configuración por defecto
    this.configuracion = {
      cantidadParticulas: this.esMovil ? 30 : 80,
      velocidadMaxima: 0.5,
      tamanoMinimo: 1,
      tamanoMaximo: 3,
      distanciaConexion: this.esMovil ? 80 : 120,
      colorPrincipal: 'rgba(59, 130, 246, 0.5)',   // Azul
      colorSecundario: 'rgba(6, 182, 212, 0.5)',   // Cyan
      colorConexion: 'rgba(59, 130, 246, 0.15)',
      interaccionRaton: true,
      frecuenciaActualizacion: this.esMovil ? 2 : 1, // frames
      ...opciones,
    };
    
    // Si hay reducción de movimiento, reducir partículas
    if (this.reduccionMovimiento) {
      this.configuracion.cantidadParticulas = Math.floor(this.configuracion.cantidadParticulas * 0.3);
      this.configuracion.velocidadMaxima *= 0.3;
    }
    
    this.inicializar();
  }
  
  inicializar() {
    this.redimensionar();
    this.crearParticulas();
    this.configurarEventos();
  }
  
  redimensionar() {
    const contenedor = this.canvas.parentElement;
    const rect = contenedor.getBoundingClientRect();
    
    // Usar devicePixelRatio para nitidez en pantallas HiDPI
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    this.contexto.scale(dpr, dpr);
    
    this.ancho = rect.width;
    this.alto = rect.height;
  }
  
  crearParticulas() {
    this.particulas = [];
    
    for (let i = 0; i < this.configuracion.cantidadParticulas; i++) {
      this.particulas.push(this.crearParticula());
    }
  }
  
  crearParticula() {
    const esAzul = Math.random() > 0.5;
    const color = esAzul ? this.configuracion.colorPrincipal : this.configuracion.colorSecundario;
    
    return {
      x: Math.random() * this.ancho,
      y: Math.random() * this.alto,
      tamano: Math.random() * (this.configuracion.tamanoMaximo - this.configuracion.tamanoMinimo) + this.configuracion.tamanoMinimo,
      velocidadX: (Math.random() - 0.5) * this.configuracion.velocidadMaxima,
      velocidadY: (Math.random() - 0.5) * this.configuracion.velocidadMaxima,
      color: color,
      opacidad: Math.random() * 0.5 + 0.3,
      pulso: Math.random() * Math.PI * 2,
      velocidadPulso: Math.random() * 0.02 + 0.01,
    };
  }
  
  configurarEventos() {
    // Redimensionar
    this.manejadorRedimension = this.redimensionar.bind(this);
    window.addEventListener('resize', this.manejadorRedimension);
    
    // Movimiento del ratón (solo en desktop)
    if (!this.esMovil && this.configuracion.interaccionRaton) {
      this.manejadorRatonMover = (evento) => {
        const rect = this.canvas.getBoundingClientRect();
        this.ratonX = evento.clientX - rect.left;
        this.ratonY = evento.clientY - rect.top;
        this.ratonActivo = true;
      };
      
      this.manejadorRatonSalir = () => {
        this.ratonActivo = false;
      };
      
      this.canvas.addEventListener('mousemove', this.manejadorRatonMover);
      this.canvas.addEventListener('mouseleave', this.manejadorRatonSalir);
    }
    
    // Preferencias de movimiento
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.manejadorCambioMovimiento = (evento) => {
      this.reduccionMovimiento = evento.matches;
      if (this.reduccionMovimiento) {
        this.configuracion.cantidadParticulas = Math.floor(this.configuracion.cantidadParticulas * 0.3);
        this.configuracion.velocidadMaxima *= 0.3;
        this.crearParticulas();
      }
    };
    mediaQuery.addEventListener('change', this.manejadorCambioMovimiento);
  }
  
  actualizar(deltaTiempo) {
    const factorDelta = deltaTiempo / 16.67; // Normalizar a 60fps
    
    this.particulas.forEach(particula => {
      // Actualizar posición
      particula.x += particula.velocidadX * factorDelta;
      particula.y += particula.velocidadY * factorDelta;
      
      // Actualizar pulso
      particula.pulso += particula.velocidadPulso * factorDelta;
      
      // Rebotar en bordes
      if (particula.x < 0 || particula.x > this.ancho) {
        particula.velocidadX *= -1;
        particula.x = Math.max(0, Math.min(this.ancho, particula.x));
      }
      
      if (particula.y < 0 || particula.y > this.alto) {
        particula.velocidadY *= -1;
        particula.y = Math.max(0, Math.min(this.alto, particula.y));
      }
      
      // Interacción con el ratón
      if (this.ratonActivo && this.configuracion.interaccionRaton) {
        const deltaX = this.ratonX - particula.x;
        const deltaY = this.ratonY - particula.y;
        const distancia = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distancia < 100) {
          const fuerza = (100 - distancia) / 100 * 0.02;
          particula.velocidadX -= deltaX * fuerza * factorDelta;
          particula.velocidadY -= deltaY * fuerza * factorDelta;
          
          // Limitar velocidad
          const velocidad = Math.sqrt(particula.velocidadX ** 2 + particula.velocidadY ** 2);
          const velocidadMaxima = this.configuracion.velocidadMaxima * 3;
          
          if (velocidad > velocidadMaxima) {
            particula.velocidadX = (particula.velocidadX / velocidad) * velocidadMaxima;
            particula.velocidadY = (particula.velocidadY / velocidad) * velocidadMaxima;
          }
        }
      }
      
      // Aplicar fricción
      particula.velocidadX *= 0.999;
      particula.velocidadY *= 0.999;
      
      // Mantener velocidad mínima
      const velocidad = Math.sqrt(particula.velocidadX ** 2 + particula.velocidadY ** 2);
      if (velocidad < 0.1) {
        particula.velocidadX += (Math.random() - 0.5) * 0.1;
        particula.velocidadY += (Math.random() - 0.5) * 0.1;
      }
    });
  }
  
  dibujar() {
    this.contexto.clearRect(0, 0, this.ancho, this.alto);
    
    // Dibujar conexiones
    this.dibujarConexiones();
    
    // Dibujar partículas
    this.particulas.forEach(particula => {
      const opacidadPulsante = particula.opacidad + Math.sin(particula.pulso) * 0.2;
      
      this.contexto.beginPath();
      this.contexto.arc(particula.x, particula.y, particula.tamano, 0, Math.PI * 2);
      this.contexto.fillStyle = particula.color.replace(/[\d.]+\)$/, `${Math.max(0, Math.min(1, opacidadPulsante)})`);
      this.contexto.fill();
    });
  }
  
  dibujarConexiones() {
    const distanciaMaxima = this.configuracion.distanciaConexion;
    
    for (let i = 0; i < this.particulas.length; i++) {
      for (let j = i + 1; j < this.particulas.length; j++) {
        const particulaA = this.particulas[i];
        const particulaB = this.particulas[j];
        
        const deltaX = particulaA.x - particulaB.x;
        const deltaY = particulaA.y - particulaB.y;
        const distancia = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distancia < distanciaMaxima) {
          const opacidad = (1 - distancia / distanciaMaxima) * 0.3;
          
          this.contexto.beginPath();
          this.contexto.moveTo(particulaA.x, particulaA.y);
          this.contexto.lineTo(particulaB.x, particulaB.y);
          this.contexto.strokeStyle = this.configuracion.colorConexion.replace(/[\d.]+\)$/, `${opacidad})`);
          this.contexto.lineWidth = 0.5;
          this.contexto.stroke();
        }
      }
    }
  }
  
  bucleAnimacion(tiempo) {
    if (!this.animacionActiva) return;
    
    const deltaTiempo = tiempo - this.ultimoTiempo;
    this.ultimoTiempo = tiempo;
    
    this.tiempoAcumulado += deltaTiempo;
    
    // Controlar frecuencia de actualización
    if (this.tiempoAcumulado >= 16.67 * this.configuracion.frecuenciaActualizacion) {
      this.tiempoAcumulado = 0;
      this.actualizar(deltaTiempo);
      this.dibujar();
    }
    
    requestAnimationFrame(this.bucleAnimacion.bind(this));
  }
  
  iniciar() {
    if (this.animacionActiva) return;
    
    this.animacionActiva = true;
    this.ultimoTiempo = performance.now();
    this.tiempoAcumulado = 0;
    requestAnimationFrame(this.bucleAnimacion.bind(this));
  }
  
  detener() {
    this.animacionActiva = false;
  }
  
  destruir() {
    this.detener();
    window.removeEventListener('resize', this.manejadorRedimension);
    
    if (this.manejadorRatonMover) {
      this.canvas.removeEventListener('mousemove', this.manejadorRatonMover);
    }
    
    if (this.manejadorRatonSalir) {
      this.canvas.removeEventListener('mouseleave', this.manejadorRatonSalir);
    }
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.removeEventListener('change', this.manejadorCambioMovimiento);
  }
}

export function crearSistemaParticulas(canvas, opciones = {}) {
  return new SistemaParticulas(canvas, opciones);
}

export default SistemaParticulas;