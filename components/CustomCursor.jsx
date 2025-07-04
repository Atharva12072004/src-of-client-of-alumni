import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const CustomCursor = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // ✅ Inject global CSS to hide default cursor everywhere
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
      html, body, iframe, a, button, div, span, canvas, svg {
        cursor: none !important;
      }
      .MuiDialog-root {
        cursor: none !important;
      }
      .MuiDialog-paper {
        cursor: none !important;
      }
      .MuiBackdrop-root {
        cursor: none !important;
      }
      .MuiModal-root {
        cursor: none !important;
      }
      .MuiDialog-container {
        cursor: none !important;
      }
      [role="dialog"] {
        cursor: none !important;
      }
      .MuiPaper-root {
        cursor: none !important;
      }
      canvas[style*="zIndex"] {
        z-index: 9999999 !important;
      }
      .custom-cursor {
        z-index: 9999999 !important;
      }
    `;
    document.head.appendChild(style);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse move: add new particles
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setIsActive(true);

      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const cauchy = cauchyRandom(0, 25);
        const distance = Math.abs(cauchy);

        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * distance * 0.02,
          vy: Math.sin(angle) * distance * 0.02,
          life: 70,
          maxLife: 70,
          size: Math.random() * 6 + 4,
          hue: 330 + Math.random() * 20, // pink tones
        });
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    const cauchyRandom = (location, scale) => {
      const u = Math.random() - 0.5;
      return location + scale * Math.tan(Math.PI * u);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animate sparkles/trails
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        const alpha = p.life / p.maxLife;
        const size = p.size * alpha;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2);
        gradient.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${alpha * 0.8})`);
        gradient.addColorStop(0.5, `hsla(${p.hue + 10}, 70%, 60%, ${alpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${p.hue + 20}, 60%, 50%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsl(${p.hue}, 80%, 70%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        return p.life > 0;
      });

      // Main glowing circle
      if (isActive) {
        const time = Date.now() * 0.005;
        const pulseSize = 28 + Math.sin(time) * 6;
        const hue = 330 + (time * 10) % 20;

        const glow = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          pulseSize * 2
        );

        glow.addColorStop(0, `hsla(${hue}, 90%, 75%, 0.9)`);
        glow.addColorStop(0.3, `hsla(${hue + 10}, 80%, 65%, 0.6)`);
        glow.addColorStop(0.7, `hsla(${hue + 20}, 70%, 55%, 0.3)`);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = `hsla(${hue}, 100%, 85%, 0.8)`;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      document.head.removeChild(style);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isActive]);

  const cursorElement = (
    <canvas
      ref={canvasRef}
      className="custom-cursor fixed inset-0 pointer-events-none"
      style={{ 
        background: 'transparent',
        zIndex: 9999999,
        position: 'fixed'
      }}
    />
  );

  // Use portal to render at document body level
  return createPortal(cursorElement, document.body);
};

export default CustomCursor;
