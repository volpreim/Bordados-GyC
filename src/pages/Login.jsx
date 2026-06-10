import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Zap, User, ArrowRight, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './Login.css';

const traducirError = (msg) => {
  if (!msg) return 'Error desconocido';
  if (msg.includes('Invalid login credentials')) return 'Correo o contraseña incorrectos.';
  if (msg.includes('Email not confirmed')) return 'Confirma tu correo en tu bandeja de entrada.';
  if (msg.includes('User already registered')) return 'Este correo ya tiene una cuenta. Inicia sesión.';
  if (msg.includes('Password should be at least')) return 'La contraseña debe tener al menos 6 caracteres.';
  if (msg.includes('rate limit')) return 'Demasiados intentos. Espera un momento.';
  if (msg.includes('Database error')) return 'Error al guardar el usuario. Contacta al administrador.';
  return msg;
};

const validarPassword = (pass) => {
  if (pass.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
  if (!/[A-Z]/.test(pass)) return 'Debe incluir al menos una mayúscula.';
  if (!/[0-9]/.test(pass)) return 'Debe incluir al menos un número.';
  return null;
};

const validarEmail = (mail) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(mail);
};

const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Redirige según el rol del usuario
  const redirigirSegunRol = async (userId) => {
    const { data: perfil, error } = await supabase
      .from('clientes_perfil')
      .select('rol')
      .eq('user_id', userId)
      .single();

    if (error || !perfil) {
      navigate('/');
      return;
    }

    if (perfil.rol === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const emailLimpio = email.trim().toLowerCase();

    try {
      // Validaciones del lado cliente
      if (!validarEmail(emailLimpio)) {
        throw new Error('El correo no tiene un formato válido.');
      }

      if (isLogin) {
        // ── LOGIN ──
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailLimpio,
          password: password,
        });
        if (error) throw error;

        if (data?.user) {
          await redirigirSegunRol(data.user.id);
        }

      } else {
        // ── REGISTRO ──
        if (!nombre.trim()) throw new Error('El nombre es obligatorio.');
        if (nombre.trim().length < 2) throw new Error('El nombre es demasiado corto.');

        const errorPass = validarPassword(password);
        if (errorPass) throw new Error(errorPass);

        // 1. Crear usuario en Auth
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: emailLimpio,
          password: password,
          options: {
            data: { nombre_operador: nombre.trim() },
          },
        });

        if (signUpError) throw signUpError;

        // 2. Insertar perfil si hay sesión activa
        if (data?.session && data?.user) {
          const { error: perfilError } = await supabase
            .from('clientes_perfil')
            .insert([{
              user_id: data.user.id,
              nombre_operador: nombre.trim(),
              email: emailLimpio,
              rol: 'cliente',
              notif_whatsapp: true,
              notif_email: false,
            }]);

          if (perfilError) {
            console.warn('Error creando perfil:', perfilError.message);
          }

          await redirigirSegunRol(data.user.id);
        } else {
          setSuccessMsg('¡Registro exitoso! Confirma tu correo para activar la cuenta.');
          setIsLogin(true);
          setPassword('');
        }
      }
    } catch (error) {
      console.error('Error en operación:', error.message);
      setErrorMsg(traducirError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMsg('');
    setSuccessMsg('');
    setNombre('');
    setPassword('');
  };

  return (
    <div className="login-page">
      <div className="bg-glow pink-glow"></div>
      <div className="bg-glow gold-glow"></div>

      <div className="login-glass-panel">
        <div className="login-header">
          <Zap size={40} className="login-icon" />
          <h2>{isLogin ? 'ACCESO AL SISTEMA' : 'NUEVO REGISTRO'}</h2>
          <p>BORDADOS G & C // CONTROL DE CLIENTES</p>
        </div>

        {errorMsg && (
          <div className="error-alert">
            <AlertTriangle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && <div className="success-alert"><span>{successMsg}</span></div>}

        <form onSubmit={handleSubmit} className="login-form" autoComplete="on">
          {!isLogin && (
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input
                type="text"
                placeholder="NOMBRE COMPLETO"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoComplete="name"
                maxLength={80}
                required
              />
            </div>
          )}

          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input
              type="email"
              placeholder="CORREO ELECTRÓNICO"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              maxLength={120}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="CONTRASEÑA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              maxLength={72}
              minLength={isLogin ? 1 : 8}
              required
            />
            <button
              type="button"
              className="btn-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Mostrar contraseña"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="btn-submit-login" disabled={loading}>
            {loading ? 'PROCESANDO...' : (isLogin ? 'INGRESAR' : 'REGISTRARME')}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="login-footer">
          <button type="button" className="btn-toggle-mode" onClick={toggleMode}>
            {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;