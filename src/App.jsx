import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Vision from "./pages/Vision";
import Objetivo from "./pages/Objetivo";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop";
import PerfilCliente from "./pages/PerfilCliente";
// IMPORTANTE: Asegúrate de importar tu PanelAdmin
// import PanelAdmin from "./pages/PanelAdmin"; 
import { Facebook, MessageCircle } from "lucide-react";
import ProtectedRoute from "./components/ProtectedRoute";

const SocialButtons = () => {
  const location = useLocation();
  // Agregué /admin para que tampoco salgan los botones en el panel de control
  const rutasOcultas = ["/PerfilCliente", "/admin"]; 

  if (rutasOcultas.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="social-buttons">
      <a href="https://wa.me/51912845767" target="_blank" rel="noreferrer" className="btn-social btn-whatsapp">
        <MessageCircle size={24} />
      </a>
      <a href="https://facebook.com/tupagina" target="_blank" rel="noreferrer" className="btn-social btn-facebook">
        <Facebook size={24} />
      </a>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <SocialButtons />

      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/objetivos" element={<Objetivo />} />
        <Route path="/Login" element={<Login />} />

        {/* Ruta Protegida: Cliente normal */}
        <Route
          path="/PerfilCliente"
          element={
            <ProtectedRoute>
              <PerfilCliente />
            </ProtectedRoute>
          }
        />

        {/* Ruta Protegida: Administrador */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              {/* <PanelAdmin /> */}
              <div style={{color: '#fff', padding: 100}}>PROXIMAMENTE: PANEL DE CONTROL BORDADOS G & C</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;