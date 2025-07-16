// src/components/Banner/Banner.jsx
import React, { useRef, useEffect } from 'react';
import styles from './Banner.module.css';

const Banner = ({ imageUrl, children }) => {
  const bannerRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const scrolled = window.scrollY;
        const y = Math.min(scrolled * 0.4, 120);
        bannerRef.current.style.backgroundPosition = `40% ${y}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={styles.banner}
      ref={bannerRef}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className={styles.bannerContent}>
        {children}
      </div>
    </div>
  );
};

export default Banner;
