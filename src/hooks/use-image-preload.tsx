"use client";

import { useEffect } from 'react';

export function useImagePreload(images: string[], priority = false) {
  useEffect(() => {
    if (!priority || images.length === 0) return;

    // Preload critical images
    images.slice(0, 6).forEach((src) => {
      if (src && src !== '/placeholder.svg') {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      }
    });

    // Create Image objects for additional preloading
    const imageObjects = images.slice(0, 12).map((src) => {
      if (src && src !== '/placeholder.svg') {
        const img = new Image();
        img.src = src;
        return img;
      }
      return null;
    }).filter(Boolean);

    return () => {
      // Cleanup preload links on unmount
      const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
      preloadLinks.forEach((link) => {
        if (images.includes(link.getAttribute('href') || '')) {
          document.head.removeChild(link);
        }
      });
    };
  }, [images, priority]);
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}
