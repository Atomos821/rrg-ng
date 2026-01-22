import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  speedY: number;
  density: number;
  color: string;
  opacity: number;
  decay: number;
  shape: { x: number, y: number }[]; // Les sommets du polygone (escarbille)
  angle: number; // Angle de rotation actuel
  spin: number; // Vitesse de rotation
}

@Component({
  selector: 'app-particles-background',
  imports: [],
  templateUrl: './particles-background.html',
  styleUrl: './particles-background.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParticlesBackground implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number = 0;
  private width: number = 0;
  private height: number = 0;
  private globalAngle = 0;

  // Configuration de l'effet
  private readonly PARTICLE_COUNT = 250;

  private readonly COLORS = [
    '#FF4500', '#FF4500', // OrangeRed
    '#FF2200',            // Red
    '#FF8C00', '#FF8C00', // DarkOrange
    '#FFD700',            // Gold
    '#FFFACD'             // LemonChiffon (Cendres)
  ];

  ngOnInit() {
    this.initCanvas();
    this.createParticles();
    this.animate();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.initCanvas();
    // Optionnel : recréer les particules ou laisser le canvas s'adapter
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d')!;
  }

  private createParticles() {
    this.particles = [];
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles.push(this.generateParticle(true));
    }
  }

  // Génère un polygone irrégulier pour simuler un éclat
  private generateShape(size: number): { x: number, y: number }[] {
    const points = [];
    const vertexCount = Math.floor(Math.random() * 3) + 3; // 3 à 5 sommets

    for (let i = 0; i < vertexCount; i++) {
      const angle = (Math.PI * 2 * i) / vertexCount;
      const r = size * (0.5 + Math.random() * 0.5);
      points.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r
      });
    }
    return points;
  }

  private generateParticle(randomY: boolean = false): Particle {
    // Distribution centrée (cloche)
    const r1 = Math.random();
    const r2 = Math.random();
    const centeredRandom = (r1 + r2) / 2;
    const x = (centeredRandom * 0.8 + 0.1) * this.width;

    const size = Math.random() * 3 + 1.5;

    return {
      x: x,
      baseX: x,
      y: randomY ? Math.random() * this.height : this.height + 20,
      size: size,
      shape: this.generateShape(size),
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.05,

      speedY: Math.random() * 0.7 + 0.2,
      density: (Math.random() * 30) + 1,
      color: this.COLORS[Math.floor(Math.random() * this.COLORS.length)],
      opacity: Math.random() * 0.8 + 0.2,
      decay: Math.random() * 0.002 + 0.0005
    };
  }

  private animate() {
    // Nettoyage complet pour chaque frame
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Mode de fusion pour l'effet lumineux (feu)
    this.ctx.globalCompositeOperation = 'lighter';

    this.globalAngle += 0.01;

    this.particles.forEach((p, index) => {
      p.y -= p.speedY;
      // Oscillation sinusoïdale
      p.x = p.baseX + Math.sin(this.globalAngle + p.density) * 20;
      p.angle += p.spin;
      p.opacity -= p.decay;

      // Respawn si invisible ou hors écran (haut)
      if (p.opacity <= 0 || p.y < -50) {
        this.particles[index] = this.generateParticle(false);
      } else {
        // Dessin
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.angle);

        this.ctx.beginPath();
        if (p.shape.length > 0) {
          this.ctx.moveTo(p.shape[0].x, p.shape[0].y);
          for (let i = 1; i < p.shape.length; i++) {
            this.ctx.lineTo(p.shape[i].x, p.shape[i].y);
          }
        }
        this.ctx.closePath();

        this.ctx.fillStyle = this.hexToRgba(p.color, p.opacity);

        // Glow
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = p.color;

        this.ctx.fill();
        this.ctx.restore();
      }
    });

    this.ctx.globalCompositeOperation = 'source-over';
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
