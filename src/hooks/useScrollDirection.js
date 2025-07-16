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
      setLastScrollY(scrollY); // Update posisi scroll terakhir
    };

    window.addEventListener('scroll', updateScrollDirection); // Tambahkan event listener
    // Cleanup function: hapus event listener saat komponen unmount
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [lastScrollY]); // Dependensi: hanya re-run jika lastScrollY berubah

  return scrollDirection;
}

export default useScrollDirection;