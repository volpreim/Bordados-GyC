import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Zap, ShieldCheck, Globe, Cpu, Award  } from 'lucide-react';
import LogoLoop from '../components/LogoLoop/LogoLoop';
import "./Vision.css";

const MisionVision = () => {

  const pilaresEstrategicos = [
  { id: 1, icon: <Cpu size={28} />, title: "INNOVACIÓN", desc: "IA en patrones de bordado." },
  { id: 2, icon: <Zap size={28} />, title: "AGILIDAD", desc: "Reducción de tiempos 40%." },
  { id: 3, icon: <ShieldCheck size={28} />, title: "RESISTENCIA", desc: "Hilos industriales 100%." },
  { id: 4, icon: <Award size={28} />, title: "EXCELENCIA", desc: "Estándares Premium." },
  { id: 5, icon: <Globe size={28} />, title: "EXPANSIÓN", desc: "Logística Nacional." }
];
  return (
      

    <div className="mv-page">

      <section className="vision-hero">
        <div className="vision-scanner-line"></div>
  <div className="vision-overlay"></div>
  <div className="vision-content">
    
    <span className="vision-tag">ESTRATEGIA_OPERATIVA // V.2.6</span>
    <h1 className="vision-title-main">MISIÓN Y VISIÓN</h1>
    <div className="vision-divide"></div>
    <p className="vision-subtitle">EL FUTURO DEL BORDADO COMPUTARIZADO</p>
  </div>
</section>

      {/* SECCIÓN 1: MISIÓN (EL PRESENTE) */}
      <section className="mv-section mision-block">
        <div className="mv-container">
          <div className="mv-content">
            <div className="mv-header">
              <span className="mv-tag">OPERACIÓN ACTUAL</span>
            </div>
            <h2 className="mv-title">NUESTRA <span>MISIÓN</span></h2>
            <p className="mv-text">
              Brindar servicios de bordado y personalización textil con los más altos estándares de <b>calidad, precisión y puntualidad</b>, utilizando <b>tecnología avanzada y procesos meticulosos</b> para ofrecer soluciones creativas que satisfagan las necesidades específicas de nuestros clientes, aporten un valor diferenciador a sus prendas y potencien la imagen de sus marcas en el mercado.
            </p>
            <div className="mv-features">
              <div className="feature"><Zap size={18} /> Entrega en tiempo récord</div>
              <div className="feature"><ShieldCheck size={18} /> Calidad certificada</div>
            </div>
          </div>
          <div className="mv-visual">
            <div className="tech-circle"></div>
            <div className="image-cut-mision"></div>
          </div>
        </div>
      </section>

      <section className="mv-carousel-container">
        
        
        <LogoLoop
          logos={pilaresEstrategicos}
          speed={80}           // Velocidad en px/s
          direction="left"     // Dirección del movimiento
          gap={50}             // Espacio entre tarjetas
          pauseOnHover={true}  // Se detiene al pasar el mouse
          fadeOut={true}       // Desvanecimiento en los bordes
          fadeOutColor="#050505" // Color del fondo para el desvanecimiento
          renderItem={(item) => (
            <div className="pillar-card-loop">
              <div className="pillar-icon">{item.icon}</div>
              <div className="pillar-info">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
              <div className="pillar-scan-line"></div>
            </div>
          )}
        />
      </section>

      {/* SECCIÓN 2: VISIÓN (EL FUTURO) */}
      <section className="mv-section vision-block">
        <div className="mv-container reverse">
          <div className="mv-content">
            <div className="mv-header">
              <span className="mv-tag">PROYECCIÓN 2030</span>
            </div>
            <h2 className="mv-title">NUESTRA <span>VISIÓN</span></h2>
            <p className="mv-text">
              Ser la empresa líder y referente en servicios de bordado, reconocida por su  
              <b> excelencia, puntualidad e innovación constante</b> en la personalización de prendas y productos; brindando soluciones integrales que fortalezcan la identidad de nuestros clientes y nos posicionen como el aliado estratégico preferido en la industria textil nacional.
            </p>
            <div className="mv-features">
              <div className="feature-gold"><Rocket size={18} /> Expansión Tecnológica</div>
              <div className="feature-gold"><Globe size={18} /> Liderazgo Nacional</div>
            </div>
          </div>
          <div className="mv-visual">
            <div className="tech-square"></div>
            <div className="image-cut-vision"></div>
          </div>
        </div>
      </section>

      <section className="mv-carousel-container"></section>

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

export default MisionVision;