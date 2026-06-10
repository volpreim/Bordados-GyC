import React from "react";
import { Link } from "react-router-dom";
import { Cpu, ShieldCheck, Zap } from "lucide-react";
import imgEquipo from "../assets/Valores.jfif";
import "./Nosotros.css";

const Nosotros = () => {
  const caracteristicas = [
    {
      icon: <Cpu />,
      title: "Tecnología Industrial",
      desc: "Máquinas computarizadas de última generación.",
    },
    {
      icon: <ShieldCheck />,
      title: "Hilos Certificados",
      desc: "Resistencia al lavado industrial y decoloración.",
    },
    {
      icon: <Zap />,
      title: "Entrega Express",
      desc: "Optimización de tiempos para misiones críticas.",
    },
  ];

  return (
    <div className="nosotros-page">
      {/* 1. HERO - IMPACTO VISUAL */}
      <section className="identity-hero">
        {/* Efecto de línea de escaneo que sube y baja */}
        <div className="identity-scanner"></div>

        <div className="identity-content">
          <span className="identity-tag">
            UNIDAD_OPERATIVA // PROTOCOLO_ALPHA
          </span>
          <h1 className="identity-main-title">IDENTIDAD G & C</h1>
          <div className="identity-divider"></div>
          <p className="identity-subtitle">CENTRO DE OPERACIONES TEXTILES</p>
        </div>

        {/* Indicador de scroll visual */}
        <div className="identity-scroll-hint">
          <span>DESLIZAR PARA INFORME</span>
          <div className="scroll-bar"></div>
        </div>
      </section>

      {/* 2. EL MANIFIESTO - QUIÉNES SOMOS */}
      <section className="quienes-somos">
        <div className="text-box">
          <h2 className="section-title">EL ORIGEN</h2>
          <p>
            En <b>Bordados G & C</b>, no solo cosemos; programamos identidad.
            Con <b>siete años de experiencia</b> en el sector, hemos
            evolucionado de un taller local a un referente en digitalización y
            bordado de alta precisión en Lima. Nuestra pasión por la innovación
            nos ha llevado a adoptar tecnología de punta, permitiéndonos ofrecer
            acabados de alta definición que transforman cada prenda en una obra
            de arte textil. Somos el aliado estratégico de marcas que buscan
            destacar con bordados personalizados que combinan creatividad,
            durabilidad y precisión milimétrica.
          </p>
        </div>
        <div className="stats-box">
          <div className="stat-item">
            <span className="number">+500</span>
            <span className="label">CLIENTES CORPORATIVOS</span>
          </div>
          <div className="stat-item">
            <span className="number">24 / 7</span>
            <span className="label">MONITOREO DE CALIDAD</span>
          </div>
        </div>
      </section>

      {/* 3. LA ARTILLERÍA - NUESTRA TECNOLOGÍA */}
      <section className="tecnologia-section">
        <h2 className="center-title">NUESTRA INFRAESTRUCTURA</h2>
        <div className="tech-grid">
          {caracteristicas.map((item, index) => (
            <div className="tech-card" key={index}>
              <div className="tech-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SECCIÓN DEL EQUIPO (HUMAN FACTOR) */}
      <section className="team-section">
        <div className="team-content">
          <h2 className="section-title">Nuestros Valores</h2>
          <div class="grid-valores">
            <article class="valor-card">
                <h3>Calidad Excepcional</h3>
                <p>Cuidamos cada detalle mediante procesos meticulosos y tecnología avanzada para asegurar acabados impecables en cada prenda.</p>
            </article>

            <article class="valor-card">
                <h3>Responsabilidad Integral</h3>
                <p>Asumimos con seriedad el compromiso de proteger y proyectar fielmente la identidad de nuestros clientes.</p>
            </article>

            <article class="valor-card">
                <h3>Compromiso Estratégico</h3>
                <p>Trabajamos como aliados de nuestros clientes, enfocándonos en soluciones que aporten un valor real a sus marcas.</p>
            </article>

            <article class="valor-card">

                <h3>Innovación Constante</h3>
                <p>Lideramos el sector mediante la digitalización y el perfeccionamiento de técnicas de vanguardia, como el bordado en alto relieve (3D).</p>
            </article>

            <article class="valor-card">
                <h3>Honestidad y Transparencia</h3>
                <p>Construimos relaciones de confianza basadas en una comunicación clara y una ética de trabajo innegociable.</p>
            </article>

            <article class="valor-card">
                <h3>Puntualidad Rigurosa</h3>
                <p>Entregamos cada proyecto con máxima eficiencia, respetando los tiempos acordados como pilar fundamental de nuestro servicio.</p>
            </article>
        </div>
        </div>
        <div className="team-visual">
          {/* 2. REEMPLAZO DEL PLACEHOLDER POR LA IMAGEN */}
          <div className="team-image-wrapper">
            {" "}
            {/* Envolvedor para estilos */}
            <img
              src={imgEquipo}
              alt="Equipo operativo de Bordados G & C en el taller"
              className="team-photo"
            />
            <div className="image-scan-line"></div>{" "}
            {/* Línea decorativa opcional */}
          </div>
        </div>
      </section>

      <footer className="main-footer">
        <div className="footer-top">
          <div className="footer-brand-section">
            <h2 className="footer-logo">
              G & C <span>BORDADOS</span>
            </h2>
            <p className="footer-description">
              Tecnología de precisión y arte textil. Más de 2 años liderando el
              mercado de bordados computarizados con acabados de alta
              definición.
            </p>
            <div className="footer-socials">
              {/* Aquí puedes poner links a tus redes si tienes */}
              <span className="social-tag">SISTEMA_OPERATIVO_V2.6</span>
            </div>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Navegación</h4>
            <ul className="footer-list">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/nosotros">Nosotros</Link>
              </li>
              <li>
                <Link to="/objetivos">Proyectos</Link>
              </li>
              <li>
                <Link to="/servicios">Servicios</Link>
              </li>
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
            © {new Date().getFullYear()} BORDADOS G & C. TODOS LOS DERECHOS
            RESERVADOS.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Nosotros;
