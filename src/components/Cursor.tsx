"use client";
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [onLink, setOnLink] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mobile = window.matchMedia('(pointer: coarse)').matches;
    setIsMobile(mobile);
    if (mobile) return;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(calc(${pos.current.x}px - 50%), calc(${pos.current.y}px - 50%), 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%), 0)`;
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select');
      setOnLink(!!isInteractive);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div
          className={`rounded-full bg-primary-600 transition-all duration-200 ${
            clicking ? 'w-4 h-4 opacity-70' : onLink ? 'w-3 h-3' : 'w-2 h-2'
          }`}
        />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-300"
        style={{ opacity: visible ? 0.6 : 0 }}
      >
        <div
          className={`rounded-full border-2 border-primary-500 transition-all duration-300 ${
            onLink ? 'w-10 h-10 opacity-80' : clicking ? 'w-6 h-6' : 'w-8 h-8'
          }`}
        />
      </div>
    </>
  );
}
