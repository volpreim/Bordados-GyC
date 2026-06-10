import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import './Preloader.css';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Simulación de carga de datos para la barra de progreso
    const interval = setInterval(() => {
      setPercent((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);

    // EVENTO CLAVE: Se activa cuando TODO está listo
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = 'auto'; // Habilita el scroll
      }, 500); // Un pequeño delay para que la transición se vea suave
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Bloquear scroll mientras carga
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('load', handleLoad);
      clearInterval(interval);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="preloader-overlay">
      <div className="preloader-content">
        <div className="preloader-logo">
          <Zap size={50} className="power-icon" />
          <h2 className="loading-text">G&C_SYSTEM_BOOTING</h2>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${percent}%` }}></div>
        </div>
        
        <div className="status-data">
          <span>MEM_CHECK: OK</span>
          <span>STITCH_ENGINE: READY</span>
          <span>{percent}%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;