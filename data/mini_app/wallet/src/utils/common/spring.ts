// https://webkit.org/demos/spring/spring.js

export class SpringSolver {
  m_w0: number;
  m_zeta: number;
  m_wd: number;
  m_A: number;
  m_B: number;

  constructor({
    mass,
    stiffness,
    damping,
    initialVelocity,
  }: {
    mass: number;
    stiffness: number;
    damping: number;
    initialVelocity: number;
  }) {
    this.m_w0 = Math.sqrt(stiffness / mass);
    this.m_zeta = damping / (2 * Math.sqrt(stiffness * mass));

    if (this.m_zeta < 1) {
      // Under-damped.
      this.m_wd = this.m_w0 * Math.sqrt(1 - this.m_zeta * this.m_zeta);
      this.m_A = 1;
      this.m_B = (this.m_zeta * this.m_w0 + -initialVelocity) / this.m_wd;
    } else {
      // Critically damped (ignoring over-damped case for now).
      this.m_wd = 0;
      this.m_A = 1;
      this.m_B = -initialVelocity + this.m_w0;
    }
  }

  solve(t: number) {
    if (this.m_zeta < 1) {
      // Under-damped
      t =
        Math.exp(-t * this.m_zeta * this.m_w0) *
        (this.m_A * Math.cos(this.m_wd * t) +
          this.m_B * Math.sin(this.m_wd * t));
    } else {
      // Critically damped (ignoring over-damped case for now).
      t = (this.m_A + this.m_B * t) * Math.exp(-t * this.m_w0);
    }

    // Map range from [1..0] to [0..1].
    return 1 - t;
  }
}

export function animate({
  duration = 1000,
  draw,
  springParams = { mass: 1, stiffness: 500, damping: 35, initialVelocity: 0 },
}: {
  duration: number;
  draw: (params: { progress: number; isDone: boolean }) => void;
  springParams?: {
    mass: number;
    stiffness: number;
    damping: number;
    initialVelocity: number;
  };
}) {
  const springSolver = new SpringSolver(springParams);
  const start = performance.now();

  function animatePart() {
    requestAnimationFrame((time) => {
      let timeFraction = (time - start) / duration;

      if (timeFraction > 1) {
        timeFraction = 1;
      }

      const progress = springSolver.solve(timeFraction);

      draw({ progress, isDone: timeFraction === 1 });

      if (timeFraction < 1) {
        animatePart();
      }
    });
  }

  animatePart();
}
