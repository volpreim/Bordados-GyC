import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import "./Objetivo.css";

const Objetivos = () => {
  const [filter, setFilter] = useState('TODOS');

  // Base de datos de tus trabajos
  const proyectos = [
    {
      id: 1,
      nombre: "Bordado",
      categoria: "TEXTIL",
      descripcion: "Acabado de alta densidad con hilos reforzados para prendas de gala.",
      whatsappMsg: "Hola G&C! 👋 Me interesa el bordado en *Casacas de Cuero* que vi en su web.",
      image: "/src/assets/OWhatsApp Image 2026-05-08 at 8.55.10 AM.jpeg"
    },
    {
      id: 2,
      nombre: "Relieve 3D",
      categoria: "ACCESORIOS",
      descripcion: "Logotipos con volumen para marcas de ropa urbana y eventos.",
      whatsappMsg: "Hola G&C! 👋 Quisiera información sobre las *Gorras 3D* que vi en su portafolio.",
      image: "/src/assets/WhatsApp Image 2026-05-08 at 8.55.10 AM.jpeg"
    },
    {
      id: 3,
      nombre: "Parches Termoadhesivos",
      categoria: "PARCHES",
      descripcion: "Parches personalizados listos para pegar en cualquier prenda textil.",
      whatsappMsg: "Hola G&C! 👋 Me gustaría cotizar *Parches personalizados*.",
      image: "/assets/p3.jpg"
    },
    {
      id: 4,
      nombre: "Parches Termoadhesivos",
      categoria: "PARCHES",
      descripcion: "Parches personalizados listos para pegar en cualquier prenda textil.",
      whatsappMsg: "Hola G&C! 👋 Me gustaría cotizar *Parches personalizados*.",
      image: "/assets/p3.jpg"
    },
    {
      id: 5,
      nombre: "Parches Termoadhesivos",
      categoria: "PARCHES",
      descripcion: "Parches personalizados listos para pegar en cualquier prenda textil.",
      whatsappMsg: "Hola G&C! 👋 Me gustaría cotizar *Parches personalizados*.",
      image: "/assets/p3.jpg"
    }
  ];

  const handleOrder = (mensaje) => {
    const nro = "51912845767";
    // encodeURIComponent asegura que los espacios y emojis viajen bien por la URL
    window.open(`https://wa.me/${nro}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  const filtrados = filter === 'TODOS' ? proyectos : proyectos.filter(p => p.categoria === filter);

  return (
    <div className="objetivos-container">

      {/* HERO SECCIÓN: CENTRADO Y RESPONSIVO */}
     <section className="mission-hero">
  {/* Efecto de escaneo láser sutil */}
  <div className="mission-scanner-line"></div>
  <div className="mission-overlay-radial"></div>
  
  <div className="mission-content-frame">
    <span className="mission-tag-status">REGISTRO_OPERATIVO // ACCESO_CONCEDIDO</span>
    <h1 className="mission-title-display">NUESTROS OBJETIVOS</h1>
    <div className="mission-divider-tech">
      <span className="line"></span>
      <span className="dot"></span>
      <span className="line"></span>
    </div>
    <p className="mission-subtitle-display">PORTAFOLIO DE PRECISIÓN COMPUTARIZADA</p>
  </div>
</section>
      {/* CONTENIDO PRINCIPAL */}
      <div className="portfolio-wrapper">
        <header className="objetivos-header">
          <span className="header-tag">CALIDAD GARANTIZADA</span>
          <h2 className="header-main-title">Nuestro Portafolio</h2>
          <p className="header-desc">
            Explora nuestra galería de trabajos ejecutados con tecnología de precisión.
          </p>
          <div className="header-line"></div>
        </header>

        {/* FILTROS */}
        <nav className="filter-group">
          {['TODOS', 'TEXTIL', 'ACCESORIOS', 'PARCHES'].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* GRILLA DE PRODUCTOS */}
        <section className="portfolio-grid">
          {filtrados.map((item) => (
            <article className="product-card" key={item.id}>
              <div className="product-image">
                <img src={item.image} alt={item.nombre} loading="lazy" />
                <div className="category-label">{item.categoria}</div>
              </div>

              <div className="product-info">
                <h3>{item.nombre}</h3>
                <p>{item.descripcion}</p>

                <button
                  className="btn-whatsapp-order"
                  onClick={() => handleOrder(item.whatsappMsg)}
                >
                  CONSULTAR POR WHATSAPP <Send size={16} />
                </button>
              </div>
            </article>
          ))}
        </section>

        
      </div>
      <footer className="main-footer">
  <div className="footer-top">
    <div className="footer-brand-section">
      <h2 className="footer-logo">G & C <span>BORDADOS</span></h2>
      <p className="footer-description">
        Tecnología de precisión y arte textil. Más de 2 años liderando el mercado de bordados computarizados con acabados de alta definición.
      </p>
      <div className="footer-socials">
        {/* Aquí puedes poner links a tus redes si tienes */}
        <span className="social-tag">SISTEMA_OPERATIVO_V2.6</span>
      </div>
    </div>

    <div className="footer-links-group">
      <h4 className="footer-title">Navegación</h4>
      <ul className="footer-list">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/nosotros">Nosotros</Link></li>
        <li><Link to="/objetivos">Proyectos</Link></li>
        <li><Link to="/servicios">Servicios</Link></li>
      </ul>
    </div>

    <div className="footer-contact-info">
      <h4 className="footer-title">Contacto Directo</h4>
      <ul className="footer-list">
        <li>📍 Lima, Perú</li>
        <li>📞 +51 912 845 767</li>
        <li>✉️ 1557714@gmail.com</li>
        <li className="status-online">● STATUS: ONLINE</li>
      </ul>
    </div>
  </div>

  <div className="footer-bottom">
    <div className="footer-copy">
      © {new Date().getFullYear()} BORDADOS G & C. TODOS LOS DERECHOS RESERVADOS.
    </div>
  </div>
</footer>
    </div>

    
  );
};

export default Objetivos;