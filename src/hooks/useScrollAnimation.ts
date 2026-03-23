import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (
  animationCallback: (gsapInstance: typeof gsap, scrollTrigger: typeof ScrollTrigger) => gsap.core.Timeline | gsap.core.Tween | void,
  deps: React.DependencyList = []
) => {
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const result = animationCallback(gsap, ScrollTrigger);
      if (result) {
        animationRef.current = result;
      }
    });

    return () => {
      ctx.revert();
    };
  }, deps);

  return animationRef;
};

export const useParallax = (
  elementRef: React.RefObject<HTMLElement>,
  speed: number = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical'
) => {
  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    const tween = gsap.to(element, {
      [direction === 'vertical' ? 'y' : 'x']: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === element) {
          st.kill();
        }
      });
    };
  }, [elementRef, speed, direction]);
};

export const useRevealAnimation = (
  elementRef: React.RefObject<HTMLElement>,
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
  } = {}
) => {
  const {
    y = 50,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    ease = 'power3.out',
  } = options;

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const children = element.querySelectorAll('.reveal-item');
    
    const targets = children.length > 0 ? children : element;

    gsap.set(targets, { y, opacity });

    const tween = gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
    };
  }, [elementRef, y, opacity, duration, delay, stagger, ease]);
};

export default useScrollAnimation;
