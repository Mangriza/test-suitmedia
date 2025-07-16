// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import useScrollDirection from '../../hooks/useScrollDirection';

const menuItems = [
  { key: 'work', label: 'Work', href: '#work' },
  { key: 'about', label: 'About', href: '#about' },
  { key: 'services', label: 'Services', href: '#services' },
  { key: 'ideas', label: 'Ideas', href: '#ideas' },
  { key: 'careers', label: 'Careers', href: '#careers' },
  { key: 'contact', label: 'Contact', href: '#contact' },
];

function Header() {
  const scrollDirection = useScrollDirection();
  const [activeMenu, setActiveMenu] = useState('ideas');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const found = menuItems.find(item => item.key === hash);
      setActiveMenu(found ? found.key : 'ideas');
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const headerVisibility = scrollDirection === 'down' ? styles.hidden : styles.visible;
  const headerBg = scrollDirection === 'up' ? styles.transparentBg : '';

  return (
    <header className={`${styles.header} ${headerVisibility} ${headerBg}`}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src="/vite.svg" alt="logo" style={{height:32, marginRight:10, verticalAlign:'middle'}} />
          suit<span style={{color:'#fff'}}>media</span>
        </div>
        <nav>
          <ul className={styles.navList}>
            {menuItems.map(item => (
              <li key={item.key} className={activeMenu === item.key ? styles.active : ''}>
                <a href={item.href} onClick={() => setActiveMenu(item.key)}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header; 