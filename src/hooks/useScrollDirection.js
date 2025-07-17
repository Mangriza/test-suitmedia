// src/hooks/useScrollDirection.js
import { useState, useEffect } from 'react';

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      if (scrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (scrollY < lastScrollY) {
        setScrollDirection('up');
      }
      setLastScrollY(scrollY); 
    };

    window.addEventListener('scroll', updateScrollDirection); 
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [lastScrollY]); 

  return scrollDirection;
}

export default useScrollDirection;