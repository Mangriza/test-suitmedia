// src/components/Banner/Banner.jsx
import React, { useRef, useState, useEffect } from 'react';
import styles from './Banner.module.css';

function Banner({ imageUrl, title, description }) {
  const bannerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Parallax: gambar bergerak lebih lambat dari scroll
      const scrollY = window.scrollY;
      // Clamp agar tidak pernah negatif
      setScrollPosition(Math.max(0, scrollY * 0.5));
    };
    window.addEventListener('scroll', handleScroll);
    // Reset posisi saat mount
    setScrollPosition(0);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.bannerContainer} ref={bannerRef}>
      <div
        className={styles.bannerImage}
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translateY(${scrollPosition}px)`,
        }}
      >
        <div className={styles.bannerOverlay}></div>
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>{title}</h1>
          <p className={styles.bannerDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
