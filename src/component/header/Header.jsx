// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import styles from './Header.module.css'; // Import CSS module
import useScrollDirection from '../../hooks/useScrollDirection'; // Custom Hook yang akan kita buat

function Header() {
  const scrollDirection = useScrollDirection(); // Ambil arah scroll dari custom hook
  const [activeMenu, setActiveMenu] = useState('home'); // State untuk menu aktif

  // Style untuk visibility header berdasarkan arah scroll
  const headerVisibility = scrollDirection === 'down' ? styles.hidden : styles.visible;

  // Style untuk background transparan
  const headerBg = scrollDirection === 'up' ? styles.transparentBg : '';

  return (
    <header className={`${styles.header} ${headerVisibility} ${headerBg}`}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>M RIZA BUCCHARELLI</div> {/* Ganti dengan logo atau nama proyekmu */}
        <ul className={styles.navList}>
          <li className={activeMenu === 'home' ? styles.active : ''} onClick={() => setActiveMenu('home')}>
            <a href="#home">Home</a>
          </li>
          <li className={activeMenu === 'ideas' ? styles.active : ''} onClick={() => setActiveMenu('ideas')}>
            <a href="#ideas">Ideas</a>
          </li>
          {/* Tambahkan menu lain jika ada */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;