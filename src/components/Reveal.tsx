import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  /** stagger delay in ms */
  delay?: number;
  className?: string;
}

/**
 * Fades + slides content up the first time it scrolls into view.
 * Respects prefers-reduced-motion via the CSS base layer.
 */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={
        visible
          ? { animation: `fade-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both` }
          : { opacity: 0 }
      }
    >
      {children}
    </div>
  );
};
