import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom'; 
import TextType from "../components/TextType/TextType";
import LogoLoop from "../components/LogoLoop/LogoLoop";
import SplitText from "../components/ScrollTrigger/ScrollTrigger"; 
// Agregué 'Send' aquí que te faltaba en el import
import { Shirt, Scissors, Brush, Wind, Layers, Award, Monitor, Zap, PenTool, CheckCircle, Quote, Send } from 'lucide-react';
import imgUniforme from "../assets/uniforme.jpg";
import "./Home.css";
import GlareHover from "../components/GlareHover/GlareHover";

const Home = () => {
  
  // 1. LÓGICA (Variables y Funciones) - SIEMPRE ARRIBA
  const [simpleForm, setSimpleForm] = useState({
    nombre: '',
    asunto: '',
    mensaje: ''
  });

  const sendWhatsApp = (e) => {
  e.preventDefault();
  
  // 1. El número del taller (sin el + ni espacios)
  const nro = "51912845767"; 


  const mensajeSucio = `Hola G&C Bordados!
  
*Mi_Nombre es:* ${simpleForm.nombre}
*El_Servicio es:* ${simpleForm.asunto}
*Los_Detalles:* ${simpleForm.mensaje}`;

  // 3. EL TRUCO: Convertimos el texto a formato URL seguro
  const mensajeLimpio = encodeURIComponent(mensajeSucio);

  // 4. Creamos la URL final
  const url = `https://wa.me/${nro}?text=${mensajeLimpio}`;
  
  window.open(url, '_blank');
};

  const container = useRef();
  const embroideryServices = [
    { node: <Shirt size={40} />, title: "Uniformes" },
    { node: <Scissors size={40} />, title: "Corte Preciso" },
    { node: <Brush size={40} />, title: "Diseño Arte" },
    { node: <Layers size={40} />, title: "Multicapa" },
    { node: <Wind size={40} />, title: "Hilos de Seda" },
    { node: <Award size={40} />, title: "Calidad Premium" },
  ];


  const proyectosEstaticos = [
  {
    id: 1,
    title: "Uniformes Corporativos",
    description: "Bordado de alta densidad con hilos reforzados.",
    image: imgUniforme,
    category: "TEXTIL"
  },
  {
    id: 2,
    title: "Gorras Premium",
    description: "Relieve 3D con precisión micrométrica.",
    image: "../assets/Costura.png",
    category: "ACCESORIOS"
  },
  {
    id: 3,
    title: "Gorras Premium",
    description: "Relieve 3D con precisión micrométrica.",
    image: "https://via.placeholder.com/600x400",
    category: "ACCESORIOS"
  },
  {
    id: 4,
    title: "Gorras Premium",
    description: "Relieve 3D con precisión micrométrica.",
    image: "https://via.placeholder.com/600x400",
    category: "ACCESORIOS"
  },
  {
    id: 5,
    title: "Gorras Premium",
    description: "Relieve 3D con precisión micrométrica.",
    image: "https://via.placeholder.com/600x400",
    category: "ACCESORIOS"
  }
];

const servicios = [
  {
    icon: <Monitor size={32} />,
    title: "Digitalización (Ponchado)",
    desc: "Convertimos tu logotipo o arte manual en un archivo de coordenadas de alta precisión para máquinas industriales."
  },
  {
    icon: <Zap size={32} />,
    title: "Bordado de Alta Velocidad",
    desc: "Producción masiva de uniformes, gorras y parches con hilos de alta resistencia y colores vibrantes."
  },
  {
    icon: <PenTool size={32} />,
    title: "Diseño Personalizado",
    desc: "Asesoría técnica para adaptar tu marca a diferentes texturas: desde algodón hasta telas sintéticas pesadas."
  },
  {
    icon: <CheckCircle size={32} />,
    title: "Acabado de Calidad",
    desc: "Cada pieza pasa por un riguroso proceso de limpieza de hilos y planchado para un resultado impecable."
  }
];

const testimonios = [
  {
    nombre: "Carlos Mendoza",
    empresa: "Constructora Delta",
    texto: "La precisión en los uniformes de nuestra cuadrilla es impresionante. Los hilos resisten el lavado industrial sin perder el color."
  },
  {
    nombre: "Elena Rivas",
    empresa: "Sport Center",
    texto: "El ponchado de nuestro logo quedó perfecto. Habíamos probado en otros talleres y nadie lograba captar los detalles pequeños."
  },
  {
    nombre: "Javier Soto",
    empresa: "Café Gourmet",
    texto: "Excelente atención y tiempos de entrega récord. Las gorras personalizadas se convirtieron en el producto estrella de nuestra marca."
  }
];

const nombresEmpresas = [
  "CLIENTE_ALPHA",
  "CORP_BORDADOS",
  "TEXTIL_PRO",
  "INDUSTRIAL_G",
  "MISION_LOG",
  "GEAR_SYSTEMS",
  "TECH_STITCH",
  "IRON_WORKS"
];

const pasosRoadmap = [
  {
    titulo: "Digitalización (Ponchado)",
    subtitulo: "FASE DE DISEÑO",
    desc: "Convertimos tu arte en coordenadas de alta precisión para nuestras máquinas industriales."
  },
  {
    titulo: "Aprobación de Muestra",
    subtitulo: "CONTROL DE VISIÓN",
    desc: "Te enviamos una previsualización digital o física para asegurar que cada detalle sea perfecto."
  },
  {
    titulo: "Producción Industrial",
    subtitulo: "EJECUCIÓN TÉCNICA",
    desc: "Bordado computarizado masivo con hilos de alta resistencia y colores vibrantes."
  },
  {
    titulo: "Control y Despacho",
    subtitulo: "ENTREGA FINAL",
    desc: "Limpieza manual de excedentes, planchado y envío directo a tu ubicación."
  }
];




  return (
    <div className="home-container" ref={container}>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">BIENVENIDO A BORDADOS G & C</h1>
          <div className="hero-subtitle">
            <TextType
              text={[
                "MÁS DE 2 AÑOS BORDANDO HISTORIAS",
                "RESISTENCIA Y ELEGANCIA EN CADA PRENDA",
                "DETALLES QUE MARCAN LA DIFERENCIA",
                "CALIDAD QUE SE SIENTE EN CADA HILO...",
              ]}
              typingSpeed={70}
              pauseDuration={2000}
              deletingSpeed={40}
              showCursor={true}
              cursorCharacter="_"
              className="typing-effect"
            />
          </div>

          <section className="desc-section">
            <p className="desc-body">
              En Bordados G & C, transformamos cada hilo en un símbolo de
              identidad. Combinamos tecnología de precisión con arte textil para
              dar vida a tus ideas, puntada a puntada.
            </p>
            <div className="desc-line"></div>
          </section>

          <div className="hero-buttons">
            <button className="btn-primary">INICIAR SECUENCIA</button>
            <button className="btn-secondary">VER DETALLES</button>
          </div>
        </div>
      </section>

      <section className="services-loop">
        <LogoLoop
          logos={embroideryServices}
          speed={60}
          direction="left"
          logoHeight={50}
          gap={80}
          hoverSpeed={20}
          scaleOnHover={true}
          fadeOut={true}
          fadeOutColor="#0d0d0d"
        />
      </section>

      <section className="about-container">
        <div className="about-card">
          <div className="about-content">
            <SplitText
              text="Nuestra Historia"
              className="about-title"
              tag="h2"
              delay={40}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
            />

            <div className="about-text-wrapper">
              <SplitText
                text="En Bordados G & C, no solo cosemos; programamos identidad. Con siete años de experiencia en el sector, hemos evolucionado de un taller local a un referente en digitalización y bordado de alta precisión en Lima.

"
                className="about-text"
                delay={25}
                duration={0.8}
                splitType="words"
                textAlign="left"
              />
              <SplitText
                text="Nuestra obsesión es la excelencia técnica. Especializados en la técnica de alto relieve (3D), utilizamos tecnología avanzada para garantizar que cada diseño tenga un impacto visual único y un valor diferenciador. Cada puntada es el resultado de un proceso meticuloso diseñado para fortalecer la imagen de tu marca y cumplir con la máxima puntualidad."
                className="about-text"
                delay={25}
                duration={0.8}
                splitType="words"
                textAlign="left"
              />
            </div>

            <Link to="/nosotros" className="about-btn">
              <span>CONOCER MÁS</span>
              <svg 
                width="18" height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                className="btn-icon"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div className="about-image">
            <img src="/src/assets/Logo.png" alt="Logo Bordados G & C" />
          </div>
        </div>
      </section>

      <section className="projects-grid">
  <div className="projects-header">
    <h2 className="projects-main-title">Misiones Ejecutadas</h2>
    <div className="projects-subtitle">LOGS DE PRODUCCIÓN RECIENTE</div>
  </div>

  <div className="projects-bento-grid">
  {proyectosEstaticos.map((project, index) => (
    <Link to="/objetivos" key={project.id} className={`project-item item-${index + 1}`}>
      <div className="project-image-wrapper">
        <img src={project.image} alt={project.title} />
        <div className="project-overlay">
          <div className="project-category">{project.category}</div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>
          <div className="project-link-text">
            VER OBJETIVO 
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>
</section>

<section className="services-section">
  <div className="services-header">
    <h2 className="services-main-title">Servicios Especializados</h2>
    <div className="services-subtitle">PROTOCOLOS DE PRODUCCIÓN TEXTIL</div>
  </div>

  <div className="services-container">
    <div className="services-grid">
      {servicios.map((servicio, index) => (
        <Link to="/objetivos" key={index} className="service-card-link">
          <div className="service-card">
            <div className="service-icon-wrapper">
              {servicio.icon}
            </div>
            <h3 className="service-card-title">{servicio.title}</h3>
            <p className="service-card-desc">{servicio.desc}</p>
            <div className="service-card-status">SISTEMA ACTIVO</div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>

<section className="social-proof-section">
  {/* 1. Barra de Confianza (Loop Infinito) */}
  <div className="trust-bar">
    <div className="trust-track">
      {[...nombresEmpresas, ...nombresEmpresas].map((nombre, index) => (
        <span key={index}>{nombre}</span>
      ))}
    </div>
  </div>

  <div className="testimonials-header">
    <h2 className="testimonials-main-title">Reportes de Satisfacción</h2>
    <div className="testimonials-subtitle">FEEDBACK DE UNIDADES OPERATIVAS</div>
    <div className="testimonials-line"></div>
  </div>

  {/* 3. Grid de Testimonios con GlareHover */}
  <div className="testimonials-container">
    <div className="testimonials-grid">
      {testimonios.map((t, index) => (
        <GlareHover
          key={index}
          width="100%"
          height="100%"
          background="#fafafa"
          glareColor="#ffd900"
          glareOpacity={0.15}
          glareSize={150}
          borderRadius="4px"
          borderColor="rgba(0,0,0,0.05)"
          className="testimonial-glare-wrapper"
        >
          <div className="testimonial-card">
            <Quote className="quote-icon" size={30} />
            <p className="testimonial-text">"{t.texto}"</p>
            <div className="testimonial-footer">
              <span className="testimonial-name">{t.nombre}</span>
              <span className="testimonial-company">{t.empresa}</span>
            </div>
            <div className="card-scanner-line"></div>
          </div>
        </GlareHover>
      ))}
    </div>
  </div>
</section>

<section className="roadmap-section">
  <div className="roadmap-header">
    <h2 className="roadmap-main-title">Flujo de Producción</h2>
    <div className="roadmap-subtitle">PROTOCOLO DE EJECUCIÓN PASO A PASO</div>
  </div>

  <div className="roadmap-container">
    <div className="roadmap-line"></div>
    <div className="roadmap-grid">
      {pasosRoadmap.map((paso, index) => (
        <div className="roadmap-step" key={index}>
          <div className="step-number-wrapper">
            <div className="step-number">0{index + 1}</div>
            <div className="step-dot"></div>
          </div>
          <div className="step-content">
            <span className="step-tag">{paso.subtitulo}</span>
            <h3 className="step-title">{paso.titulo}</h3>
            <p className="step-desc">{paso.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="simple-contact">
        <div className="contact-head">
          <h2 className="contact-main-title">Contáctanos</h2>
          <p className="contact-tag">Respuesta inmediata vía WhatsApp</p>
        </div>

        <form onSubmit={sendWhatsApp} className="minimal-form">
  <input 
    type="text" 
    placeholder="Tu Nombre" 
    required 
    value={simpleForm.nombre} // Controlado
    onChange={(e) => setSimpleForm({...simpleForm, nombre: e.target.value})}
  />
  <input 
    type="text" 
    placeholder="¿Qué necesitas bordar?" 
    required 
    value={simpleForm.asunto} // Controlado
    onChange={(e) => setSimpleForm({...simpleForm, asunto: e.target.value})}
  />
  <textarea 
    placeholder="Cuéntanos más detalles..." 
    value={simpleForm.mensaje} // Controlado
    onChange={(e) => setSimpleForm({...simpleForm, mensaje: e.target.value})}
  ></textarea>
  
  <button type="submit" className="btn-send-simple">
    ENVIAR A WHATSAPP
  </button>
</form>
      </section>

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
        <li><Link to="/servicios">Vision</Link></li>
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

export default Home;
