import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Navbar.css';

const Navbar = () => {
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);

  // 1. Sesión de Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Cerrar panel de perfil al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfilePanel(false);
      }
    };
    if (showProfilePanel) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfilePanel]);

  // 4. Bloquear scroll del body cuando el menú mobile está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const closeAll = () => {
    setIsOpen(false);
    setShowProfilePanel(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>

      {/* Logo */}
      <Link to="/" className="nav-logo-container" onClick={closeAll}>
        <img src="/src/assets/Logo.png" alt="Logo Empresa" className="nav-logo-img" />
        <span className="nav-logo-text">BORDADOS G & C</span>
      </Link>

      {/* Botón hamburguesa */}
      <div
        className={`nav-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* nav-center: links + perfil/login siempre juntos */}
      <div className={`nav-center ${isOpen ? 'active' : ''}`}>

        {/* Links de navegación */}
        <ul className="nav-links">
          <li><Link to="/"          onClick={closeAll}>Inicio</Link></li>
          <li><Link to="/nosotros"  onClick={closeAll}>Nosotros</Link></li>
          <li><Link to="/vision"    onClick={closeAll}>Visión</Link></li>
          <li><Link to="/objetivos" onClick={closeAll}>Objetivos</Link></li>

          {/* Login visible dentro del menú mobile si no hay usuario */}
          {!user && (
            <li className="nav-login-mobile">
              <Link to="/Login" className="btn-login" onClick={closeAll}>LOGIN</Link>
            </li>
          )}
        </ul>

        {/* Perfil o Login — al costado de los links en desktop, debajo en mobile */}
        {user ? (
          <div className="user-profile-container" ref={profileRef}>
            <div
              className="user-profile-trigger"
              onClick={() => setShowProfilePanel(!showProfilePanel)}
            >
              <div className="user-avatar-circle">
                {user.user_metadata.nombre_operador?.charAt(0).toUpperCase() || 'O'}
              </div>
              <span className="user-name-min">
                {user.user_metadata.nombre_operador || 'OPERADOR'}
              </span>
            </div>

            {showProfilePanel && (
              <div className="profile-dropdown-panel">
                <div className="dropdown-header">
                  <p className="status-badge">SISTEMA ACTIVO</p>
                  <h4>{user.user_metadata.nombre_operador}</h4>
                  <span>{user.email}</span>
                </div>

                <div className="dropdown-divider"></div>

                <ul className="dropdown-menu">
                  <li>
                    <Link to="/PerfilCliente" onClick={closeAll}>Mi Expediente</Link>
                  </li>
                  <li>
                    <Link to="/ajustes" onClick={closeAll}>Ajustes</Link>
                  </li>
                </ul>

                <button
                  className="btn-logout-panel"
                  onClick={() => {
                    supabase.auth.signOut();
                    closeAll();
                  }}
                >
                  CERRAR CONEXIÓN
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Login en desktop — oculto en mobile (ya aparece dentro del ul) */
          <div className="nav-login-desktop">
            <Link to="/Login" className="btn-login" onClick={closeAll}>LOGIN</Link>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;