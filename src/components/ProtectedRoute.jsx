import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }
      setUser(session.user);

      if (requireAdmin) {
        const { data } = await supabase
          .from('clientes_perfil')
          .select('rol')
          .eq('user_id', session.user.id)
          .single();
        setIsAdmin(data?.rol === 'admin');
      }
      setLoading(false);
    };
    checkAuth();
  }, [requireAdmin]);

  if (loading) return <div style={{ color: '#fff', padding: 40 }}>Cargando...</div>;
  if (!user) return <Navigate to="/Login" replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;