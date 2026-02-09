/**
 * Neural Network Canvas Background Animation
 * Creates an animated particle system with connections
 */

class NeuralCanvas {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.warn(`Canvas with id "${canvasId}" not found`);
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];

    // Configuration
    this.config = {
      particleCount: options.particleCount || 80,
      particleSize: options.particleSize || 2,
      connectionDistance: options.connectionDistance || 150,
      particleSpeed: options.particleSpeed || 0.3,
      particleColor: options.particleColor || 'rgba(0, 240, 255, 0.6)',
      connectionColor: options.connectionColor || 'rgba(0, 240, 255, 0.2)',
      opacity: options.opacity || 0.3,
      enableMouseInteraction: options.enableMouseInteraction !== false
    };

    this.mouse = { x: null, y: null, radius: 150 };
    this.animationFrame = null;

    this.init();
  }

  init() {
    this.setCanvasSize();
    this.createParticles();
    this.setupEventListeners();
    this.animate();
  }

  setCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.particleSpeed,
        vy: (Math.random() - 0.5) * this.config.particleSpeed,
        size: Math.random() * this.config.particleSize + 1
      });
    }
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.setCanvasSize();
      this.createParticles();
    });

    if (this.config.enableMouseInteraction) {
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      });

      window.addEventListener('mouseout', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }
  }

  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.config.particleColor;
      this.ctx.fill();
    });
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.config.connectionDistance) {
          const opacity = (1 - distance / this.config.connectionDistance) * this.config.opacity;
          this.ctx.beginPath();
          this.ctx.strokeStyle = this.config.connectionColor.replace(/[\d.]+\)$/g, `${opacity})`);
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  updateParticles() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off walls
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.vx = -particle.vx;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.vy = -particle.vy;
      }

      // Mouse interaction - repel particles
      if (this.config.enableMouseInteraction && this.mouse.x !== null) {
        const dx = particle.x - this.mouse.x;
        const dy = particle.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouse.radius) {
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * 0.2;
          particle.vy += Math.sin(angle) * force * 0.2;
        }
      }

      // Damping to prevent particles from moving too fast
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Ensure minimum movement
      if (Math.abs(particle.vx) < 0.1) particle.vx = (Math.random() - 0.5) * this.config.particleSpeed;
      if (Math.abs(particle.vy) < 0.1) particle.vy = (Math.random() - 0.5) * this.config.particleSpeed;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawConnections();
    this.drawParticles();
    this.updateParticles();

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    window.removeEventListener('resize', this.setCanvasSize);
    window.removeEventListener('mousemove', this.setupEventListeners);
  }
}

// Initialize neural canvas when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const heroCanvas = document.getElementById('neural-canvas');
  if (heroCanvas) {
    new NeuralCanvas('neural-canvas', {
      particleCount: 80,
      particleSize: 2,
      connectionDistance: 150,
      particleSpeed: 0.3,
      opacity: 0.3,
      enableMouseInteraction: true
    });
  }
});
