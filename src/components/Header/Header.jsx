// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import useScrollDirection from '../../hooks/useScrollDirection';
import { useNavigate, Link } from 'react-router-dom';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fabMenuOpen, setFabMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 700 : false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
      if (window.innerWidth > 700) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    // Trigger on mount
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <>
      <header className={`${styles.header} ${headerVisibility} ${headerBg}`}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <img src="/logo-suitmedia.png" alt="logo" style={{height:120, marginRight:0, verticalAlign:'middle', display:'block'}} />
          </div>
          <nav>
            <ul className={styles.navList}>
              {menuItems.map(item => (
                <li key={item.key} className={activeMenu === item.key ? styles.active : ''}>
                  {item.key === 'ideas' ? (
                    <Link to="/" onClick={() => setActiveMenu(item.key)}>{item.label}</Link>
                  ) : (
                    <a href={item.href} onClick={() => setActiveMenu(item.key)}>{item.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      {isMobile && (
        <>
          <button
            className={styles.fab}
            aria-label="Main Action"
            onClick={() => setFabMenuOpen(open => !open)}
          >
            <span className={styles.fabIcon}>☰</span>
          </button>
          {fabMenuOpen && (
            <div className={styles.fabMenu}>
              <ul>
                {menuItems.map(item => (
                  <li key={item.key}>
                    {item.key === 'ideas' ? (
                      <Link
                        to="/"
                        onClick={() => { setFabMenuOpen(false); setActiveMenu(item.key); }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => { setFabMenuOpen(false); setActiveMenu(item.key); }}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Header; 