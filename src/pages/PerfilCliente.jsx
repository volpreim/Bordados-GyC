import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import {
  Package,
  Image as ImageIcon,
  User,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Upload,
  Trash2,
  Check,
  Mail,
  Phone,
  MapPin,
  Building2,
  FileText,
  Bell,
  Send,
  Repeat,
  Loader2,
} from "lucide-react";
import "./PerfilCliente.css";

const ESTADOS = {
  digitalizando: { label: "Digitalizando", clase: "estado-digitalizando" },
  bordando: { label: "Bordando", clase: "estado-bordando" },
  listo: { label: "Listo", clase: "estado-listo" },
};

const WA_NUMERO = "51927438523";

// Hook custom: debounce para autoguardado
const useDebounce = (value, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

export default function PerfilCliente() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("pedidos");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ msg: "", type: "success" });
  const [loading, setLoading] = useState(true);

  const [pedidos, setPedidos] = useState([]);
  const [disenos, setDisenos] = useState([]);
  const [perfil, setPerfil] = useState({
    nombre_operador: "",
    telefono: "",
    direccion: "",
    empresa: "",
    ruc: "",
    tipo_cliente: "persona",
    notif_email: false,
    notif_whatsapp: true,
  });

  // Estado para autoguardado
  const [perfilCargado, setPerfilCargado] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [savedRecently, setSavedRecently] = useState(false);
  const debouncedPerfil = useDebounce(perfil, 1200);

  // Estado para upload de diseños
  const [uploading, setUploading] = useState(false);
  const [nuevoDisenoNombre, setNuevoDisenoNombre] = useState("");

  // Estado para soporte
  const [soporteForm, setSoporteForm] = useState({
    asunto: "",
    mensaje: "",
    email_contacto: "",
  });
  const [enviandoSoporte, setEnviandoSoporte] = useState(false);

  // ── 1. Cargar sesión ─────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/Login");
        return;
      }
      setUser(session.user);
      cargarDatos(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) {
        navigate("/Login");
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const cargarDatos = useCallback(async (userId) => {
    setLoading(true);
    try {
      const [pedidosRes, disenosRes, perfilRes] = await Promise.all([
        supabase
          .from("pedidos")
          .select("*")
          .eq("cliente_id", userId)
          .order("created_at", { ascending: false }),
        supabase
          .from("disenos")
          .select("*")
          .eq("cliente_id", userId)
          .order("created_at", { ascending: false }),
        supabase
          .from("clientes_perfil")
          .select("*")
          .eq("user_id", userId)
          .single(),
      ]);

      setPedidos(pedidosRes.data || []);
      setDisenos(disenosRes.data || []);
      if (perfilRes.data) {
        setPerfil((prev) => ({ ...prev, ...perfilRes.data }));
      }
      setPerfilCargado(true);
    } catch (err) {
      console.error("Error cargando datos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── 2. AUTOGUARDADO con debounce ─────────────────────────────
  useEffect(() => {
    if (!perfilCargado || !user) return;

    const guardar = async () => {
      setAutoSaving(true);
      try {
        await supabase.auth.updateUser({
          data: { nombre_operador: debouncedPerfil.nombre_operador },
        });

        const { error } = await supabase
          .from("clientes_perfil")
          .update({
            nombre_operador: debouncedPerfil.nombre_operador,
            telefono: debouncedPerfil.telefono,
            direccion: debouncedPerfil.direccion,
            empresa: debouncedPerfil.empresa,
            ruc: debouncedPerfil.ruc,
            tipo_cliente: debouncedPerfil.tipo_cliente,
            notif_email: debouncedPerfil.notif_email,
            notif_whatsapp: debouncedPerfil.notif_whatsapp,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id);

        if (error) throw error;

        setSavedRecently(true);
        setTimeout(() => setSavedRecently(false), 2000);
      } catch (err) {
        mostrarToast("Error al guardar: " + err.message, "error");
      } finally {
        setAutoSaving(false);
      }
    };

    guardar();
    // eslint-disable-next-line
  }, [debouncedPerfil]);

  // ── 3. Subir diseño ──────────────────────────────────────────
  const handleSubirDiseno = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!user) return;

    if (!nuevoDisenoNombre.trim()) {
      mostrarToast("Pon un nombre al diseño antes de subir", "error");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      mostrarToast("La imagen no puede superar los 5MB", "error");
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const filePath = `${user.id}/${fileName}`;

      // 1. Subir a Storage
      const { error: uploadError } = await supabase.storage
        .from("disenos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Obtener URL pública
      const {
        data: { publicUrl },
      } = supabase.storage.from("disenos").getPublicUrl(filePath);

      // 3. Crear registro en BD
      const { data: nuevoDiseno, error: dbError } = await supabase
        .from("disenos")
        .insert({
          cliente_id: user.id,
          nombre: nuevoDisenoNombre.trim(),
          imagen_url: publicUrl,
          storage_path: filePath,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      setDisenos((prev) => [nuevoDiseno, ...prev]);
      setNuevoDisenoNombre("");
      mostrarToast("Diseño subido correctamente", "success");
    } catch (err) {
      mostrarToast("Error al subir: " + err.message, "error");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // ── 4. Eliminar diseño ───────────────────────────────────────
  const handleEliminarDiseno = async (diseno) => {
    if (!confirm(`¿Eliminar el diseño "${diseno.nombre}"?`)) return;

    try {
      if (diseno.storage_path) {
        await supabase.storage.from("disenos").remove([diseno.storage_path]);
      }
      const { error } = await supabase
        .from("disenos")
        .delete()
        .eq("id", diseno.id);
      if (error) throw error;

      setDisenos((prev) => prev.filter((d) => d.id !== diseno.id));
      mostrarToast("Diseño eliminado", "success");
    } catch (err) {
      mostrarToast("Error: " + err.message, "error");
    }
  };

  // ── 5. Enviar mensaje de soporte ─────────────────────────────
  const handleEnviarSoporte = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (!soporteForm.asunto.trim() || !soporteForm.mensaje.trim()) {
      mostrarToast("Completa asunto y mensaje", "error");
      return;
    }

    setEnviandoSoporte(true);
    try {
      const { error } = await supabase.from("mensajes_soporte").insert({
        cliente_id: user.id,
        asunto: soporteForm.asunto.trim(),
        mensaje: soporteForm.mensaje.trim(),
        email_contacto: soporteForm.email_contacto.trim() || user.email,
      });
      if (error) throw error;

      setSoporteForm({ asunto: "", mensaje: "", email_contacto: "" });
      mostrarToast("Mensaje enviado. Te contactaremos pronto.", "success");
    } catch (err) {
      mostrarToast("Error al enviar: " + err.message, "error");
    } finally {
      setEnviandoSoporte(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleRepetir = (diseno) => {
    const msg = encodeURIComponent(
      `Hola, soy ${perfil.nombre_operador || user?.email}. Quiero repetir el diseño: "${diseno.nombre}".`,
    );
    window.open(`https://wa.me/${WA_NUMERO}?text=${msg}`, "_blank");
  };

  const waURL = () => {
    const nombre = perfil.nombre_operador || user?.email || "Cliente";
    const msg = encodeURIComponent(
      `Hola, soy ${nombre}, tengo una duda sobre mi pedido.`,
    );
    return `https://wa.me/${WA_NUMERO}?text=${msg}`;
  };

  const gmailURL = () => {
  const nombre = perfil.nombre_operador || user?.email || 'Cliente';
  const correoEmpresa = 'jhoanps13@gmail.com';
  const asunto = 'Consulta - Bordados G & C';
  const cuerpo = `Hola, soy ${nombre}.\n\nMe gustaría consultar sobre:\n\n`;

  return `https://mail.google.com/mail/?view=cm&to=${correoEmpresa}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
};

  const mostrarToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3500);
  };

  const enProceso = pedidos.filter((p) => p.estado !== "listo").length;
  const listos = pedidos.filter((p) => p.estado === "listo").length;
  const totalPed = pedidos.length;

  const menuItems = [
    { id: "pedidos", icon: Package, label: "Mis Pedidos" },
    { id: "disenos", icon: ImageIcon, label: "Mis Diseños" },
    { id: "contacto", icon: User, label: "Mis Datos" },
    { id: "soporte", icon: MessageSquare, label: "Soporte" },
  ];

  const inicial = (perfil.nombre_operador || user?.email || "?")
    .charAt(0)
    .toUpperCase();

  return (
    <div className="perfil-page">
      <div
        className={`perfil-sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* SIDEBAR */}
      <aside className={`perfil-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-avatar">{inicial}</div>
          <p className="sidebar-username">
            {perfil.nombre_operador || "CLIENTE"}
          </p>
          <p className="sidebar-email">{user?.email}</p>
          <span className="sidebar-status">● SESIÓN ACTIVA</span>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`sidebar-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="btn-sidebar-logout" onClick={handleLogout}>
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="perfil-main">
        {/* PEDIDOS */}
        {activeTab === "pedidos" && (
          <section className="tab-content">
            <header className="tab-header">
              <h1>Mis Pedidos</h1>
              <p>Estado de tus trabajos en curso</p>
            </header>

            <div className="pedidos-stats">
              <div className="stat-card">
                <div className="stat-number">{enProceso}</div>
                <div className="stat-label">En proceso</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{listos}</div>
                <div className="stat-label">Listos</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{totalPed}</div>
                <div className="stat-label">Total</div>
              </div>
            </div>

            {loading ? (
              <p className="empty-state">
                <Loader2 className="spin" size={20} /> Cargando...
              </p>
            ) : pedidos.length === 0 ? (
              <div className="empty-state">
                <Package size={48} />
                <p>Aún no tienes pedidos registrados.</p>
              </div>
            ) : (
              <div className="pedidos-list">
                {pedidos.map((pedido) => {
                  const est = ESTADOS[pedido.estado] || ESTADOS.digitalizando;
                  return (
                    <div key={pedido.id} className="pedido-card">
                      <span className="pedido-id">
                        #{String(pedido.id).slice(-6).toUpperCase()}
                      </span>
                      <div className="pedido-info">
                        <div className="pedido-nombre">
                          {pedido.nombre || "Bordado sin nombre"}
                        </div>
                        <div className="pedido-fecha">
                          {new Date(pedido.created_at).toLocaleDateString(
                            "es-PE",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </div>
                      </div>
                      <span className={`pedido-estado ${est.clase}`}>
                        <span className="estado-dot" />
                        {est.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* DISEÑOS */}
        {activeTab === "disenos" && (
          <section className="tab-content">
            <header className="tab-header">
              <h1>Mis Diseños</h1>
              <p>Sube tus propios diseños y pide repeticiones fácilmente</p>
            </header>

            {/* Uploader */}
            <div className="uploader-box">
              <input
                type="text"
                className="uploader-input"
                placeholder="Nombre del diseño (ej: Logo Empresa)"
                value={nuevoDisenoNombre}
                onChange={(e) => setNuevoDisenoNombre(e.target.value)}
                maxLength={60}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleSubirDiseno}
                style={{ display: "none" }}
              />
              <button
                className="btn-upload"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading || !nuevoDisenoNombre.trim()}
              >
                {uploading ? (
                  <>
                    <Loader2 className="spin" size={16} /> Subiendo...
                  </>
                ) : (
                  <>
                    <Upload size={16} /> Subir Imagen
                  </>
                )}
              </button>
            </div>
            <p className="uploader-hint">Formatos: JPG, PNG, WEBP. Máx 5MB</p>

            {loading ? (
              <p className="empty-state">
                <Loader2 className="spin" size={20} /> Cargando...
              </p>
            ) : disenos.length === 0 ? (
              <div className="empty-state">
                <ImageIcon size={48} />
                <p>Aún no has subido ningún diseño.</p>
              </div>
            ) : (
              <div className="galeria-grid">
                {disenos.map((diseno) => (
                  <div key={diseno.id} className="galeria-item">
                    {diseno.imagen_url ? (
                      <img
                        src={diseno.imagen_url}
                        alt={diseno.nombre}
                        loading="lazy"
                      />
                    ) : (
                      <div className="galeria-placeholder">🪡</div>
                    )}
                    <div className="galeria-overlay">
                      <div className="galeria-nombre">{diseno.nombre}</div>
                      <div className="galeria-actions">
                        <button
                          className="btn-repetir"
                          onClick={() => handleRepetir(diseno)}
                        >
                          <Repeat size={14} /> Repetir
                        </button>
                        <button
                          className="btn-eliminar"
                          onClick={() => handleEliminarDiseno(diseno)}
                          aria-label="Eliminar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* DATOS */}
        {activeTab === "contacto" && (
          <section className="tab-content">
            <header className="tab-header">
              <h1>Mis Datos</h1>
              <p>Los cambios se guardan automáticamente</p>
              <div className="autosave-indicator">
                {autoSaving ? (
                  <>
                    <Loader2 className="spin" size={14} /> Guardando...
                  </>
                ) : savedRecently ? (
                  <>
                    <Check size={14} /> Guardado
                  </>
                ) : null}
              </div>
            </header>

            {/* Selector tipo de cliente */}
            <div className="tipo-selector">
              <button
                className={`tipo-btn ${perfil.tipo_cliente === "persona" ? "active" : ""}`}
                onClick={() =>
                  setPerfil((p) => ({ ...p, tipo_cliente: "persona" }))
                }
              >
                <User size={18} /> Persona
              </button>
              <button
                className={`tipo-btn ${perfil.tipo_cliente === "empresa" ? "active" : ""}`}
                onClick={() =>
                  setPerfil((p) => ({ ...p, tipo_cliente: "empresa" }))
                }
              >
                <Building2 size={18} /> Empresa
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <User size={14} /> Nombre completo
                </label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Tu nombre"
                  value={perfil.nombre_operador}
                  onChange={(e) =>
                    setPerfil((p) => ({
                      ...p,
                      nombre_operador: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Phone size={14} /> WhatsApp / Teléfono
                </label>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="+51 999 999 999"
                  value={perfil.telefono}
                  onChange={(e) =>
                    setPerfil((p) => ({ ...p, telefono: e.target.value }))
                  }
                />
              </div>

              <div className="form-group full">
                <label className="form-label">
                  <MapPin size={14} /> Dirección de envío
                </label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Av. Ejemplo 123, Lima"
                  value={perfil.direccion}
                  onChange={(e) =>
                    setPerfil((p) => ({ ...p, direccion: e.target.value }))
                  }
                />
              </div>

              {/* Campos solo para empresa */}
              {perfil.tipo_cliente === "empresa" && (
                <>
                  <div className="form-group">
                    <label className="form-label">
                      <Building2 size={14} /> Nombre de empresa
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Mi Empresa SAC"
                      value={perfil.empresa}
                      onChange={(e) =>
                        setPerfil((p) => ({ ...p, empresa: e.target.value }))
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FileText size={14} /> RUC
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="20XXXXXXXXX"
                      maxLength={11}
                      value={perfil.ruc}
                      onChange={(e) =>
                        setPerfil((p) => ({ ...p, ruc: e.target.value }))
                      }
                    />
                  </div>
                </>
              )}

              <div className="form-group full">
                <label className="form-label">
                  <Mail size={14} /> Correo electrónico
                </label>
                <input
                  className="form-input disabled"
                  type="email"
                  value={user?.email || ""}
                  disabled
                />
              </div>

              <div className="form-group full">
                <label className="form-label">
                  <Bell size={14} /> Notificarme cuando esté listo por:
                </label>
                <div className="preferencias-row">
                  <label className="pref-option">
                    <input
                      type="checkbox"
                      checked={perfil.notif_whatsapp}
                      onChange={(e) =>
                        setPerfil((p) => ({
                          ...p,
                          notif_whatsapp: e.target.checked,
                        }))
                      }
                    />
                    <span className="pref-label">📱 WhatsApp</span>
                  </label>
                  <label className="pref-option">
                    <input
                      type="checkbox"
                      checked={perfil.notif_email}
                      onChange={(e) =>
                        setPerfil((p) => ({
                          ...p,
                          notif_email: e.target.checked,
                        }))
                      }
                    />
                    <span className="pref-label">✉️ Correo</span>
                  </label>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SOPORTE */}
        {activeTab === "soporte" && (
          <section className="tab-content">
            <header className="tab-header">
              <h1>Soporte</h1>
              <p>Estamos aquí para ayudarte</p>
            </header>

            {/* Acciones rápidas */}
            <div className="soporte-quick">
              <a
                href={waURL()}
                target="_blank"
                rel="noopener noreferrer"
                className="quick-card whatsapp"
              >
                <div className="quick-icon">💬</div>
                <div>
                  <h3>WhatsApp Directo</h3>
                  <p>Respuesta rápida en horario de oficina</p>
                </div>
              </a>

              <a href={gmailURL()} target="_blank" rel="noopener noreferrer" className="quick-card email">
                <div className="quick-icon">✉️</div>
                <div>
                  <h3>Correo Directo</h3>
                  <p>jhoanps13@gmail.com</p>
                </div>
              </a>
            </div>

            {/* Formulario */}
            <div className="soporte-form-box">
              <h2>Envíanos un mensaje</h2>
              <p className="form-sub">
                Completa el formulario y te responderemos por correo
              </p>

              <form onSubmit={handleEnviarSoporte} className="soporte-form">
                <div className="form-group full">
                  <label className="form-label">Asunto</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Ej: Consulta sobre mi pedido"
                    value={soporteForm.asunto}
                    onChange={(e) =>
                      setSoporteForm((s) => ({ ...s, asunto: e.target.value }))
                    }
                    maxLength={100}
                    required
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label">
                    Correo de contacto (opcional)
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder={user?.email || "tu@correo.com"}
                    value={soporteForm.email_contacto}
                    onChange={(e) =>
                      setSoporteForm((s) => ({
                        ...s,
                        email_contacto: e.target.value,
                      }))
                    }
                  />
                  <span className="form-hint">
                    Si lo dejas vacío, usaremos {user?.email}
                  </span>
                </div>

                <div className="form-group full">
                  <label className="form-label">Mensaje</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Cuéntanos en detalle tu consulta..."
                    rows={6}
                    value={soporteForm.mensaje}
                    onChange={(e) =>
                      setSoporteForm((s) => ({ ...s, mensaje: e.target.value }))
                    }
                    maxLength={1000}
                    required
                  />
                  <span className="form-hint">
                    {soporteForm.mensaje.length}/1000
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn-enviar-soporte"
                  disabled={enviandoSoporte}
                >
                  {enviandoSoporte ? (
                    <>
                      <Loader2 className="spin" size={16} /> Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>
        )}
      </main>

      {/* Botón mobile */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Abrir menú"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Toast */}
      {toast.msg && (
        <div className={`toast-success toast-${toast.type}`}>
          {toast.type === "success" ? <Check size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
