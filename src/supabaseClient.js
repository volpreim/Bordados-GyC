// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Estas variables las sacas de tu panel de Supabase (Project Settings -> API)
// ⚠️ CONSEJO PRO: En un proyecto real, esto va en un archivo .env
const supabaseUrl = 'https://jvoxtpoetmtgiuhifgdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2b3h0cG9ldG10Z2l1aGlmZ2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzODI5MDYsImV4cCI6MjA5MTk1ODkwNn0.IP2g7rjhoiMo8jqe-Ad2cfWiDVthWtEKuSwZhlaAcSE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);