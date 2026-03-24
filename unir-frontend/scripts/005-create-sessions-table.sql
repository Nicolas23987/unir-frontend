-- Script para tabla de sesiones de usuario
-- Versión: 1.0

-- ============================================
-- TABLA: user_sessions (Sesiones de usuario)
-- ============================================
CREATE TABLE IF NOT EXISTS user_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  refresh_token TEXT UNIQUE,
  ip_address VARCHAR(45),
  user_agent TEXT,
  device_type VARCHAR(50), -- 'mobile', 'desktop', 'tablet'
  device_name VARCHAR(255),
  expires_at TIMESTAMP NOT NULL,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ÍNDICES
-- ============================================
CREATE INDEX idx_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_sessions_token ON user_sessions(token);
CREATE INDEX idx_sessions_expires ON user_sessions(expires_at);

-- ============================================
-- Función para limpiar sesiones expiradas
-- ============================================
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
    DELETE FROM user_sessions WHERE expires_at < CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- COMENTARIOS
-- ============================================
COMMENT ON TABLE user_sessions IS 'Almacena las sesiones activas de los usuarios';
COMMENT ON COLUMN user_sessions.token IS 'JWT token de autenticación';
COMMENT ON COLUMN user_sessions.refresh_token IS 'Token para renovar la sesión';
COMMENT ON COLUMN user_sessions.expires_at IS 'Fecha de expiración del token';
COMMENT ON COLUMN user_sessions.last_activity IS 'Última actividad del usuario en esta sesión';
