import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: windowSize.width <= 480,
    isTablet: windowSize.width > 480 && windowSize.width <= 768,
    isDesktop: windowSize.width > 768,
    width: windowSize.width,
    height: windowSize.height
  };
};
