-- Script de creación de base de datos para plataforma de alquiler de departamentos universitarios
-- Versión: 1.0
-- Fecha: 2024

-- ============================================
-- TABLA: users (Usuarios del sistema)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  picture TEXT,
  phone VARCHAR(50),
  auth_provider VARCHAR(50) DEFAULT 'email',
  role VARCHAR(50) DEFAULT 'student', -- 'student', 'landlord', 'admin'
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: user_profiles (Perfiles de usuario)
-- ============================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  age INTEGER,
  university VARCHAR(255),
  major VARCHAR(255),
  semester VARCHAR(50),
  location VARCHAR(255),
  interests TEXT[], -- Array de intereses
  preferences JSONB, -- JSON con preferencias de convivencia
  verification_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'verified', 'rejected'
  verification_documents TEXT[], -- URLs de documentos
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: apartments (Departamentos)
-- ============================================
CREATE TABLE IF NOT EXISTS apartments (
  id SERIAL PRIMARY KEY,
  landlord_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  address VARCHAR(500) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'Ecuador',
  postal_code VARCHAR(20),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  type VARCHAR(50) NOT NULL, -- 'shared', 'private'
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  max_occupants INTEGER NOT NULL,
  current_occupants INTEGER DEFAULT 0,
  square_meters DECIMAL(10, 2),
  available_from DATE,
  minimum_stay_months INTEGER DEFAULT 1,
  verified BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: apartment_images (Imágenes de departamentos)
-- ============================================
CREATE TABLE IF NOT EXISTS apartment_images (
  id SERIAL PRIMARY KEY,
  apartment_id INTEGER NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: amenities (Amenidades disponibles)
-- ============================================
CREATE TABLE IF NOT EXISTS amenities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(50),
  category VARCHAR(50), -- 'basic', 'comfort', 'security', 'entertainment'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: apartment_amenities (Amenidades por departamento)
-- ============================================
CREATE TABLE IF NOT EXISTS apartment_amenities (
  apartment_id INTEGER NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  amenity_id INTEGER NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (apartment_id, amenity_id)
);

-- ============================================
-- TABLA: bookings (Reservas)
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  apartment_id INTEGER NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled', 'completed'
  payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'refunded'
  payment_method VARCHAR(50), -- 'card', 'paypal'
  booking_code VARCHAR(50) UNIQUE,
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: payments (Pagos)
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  booking_id INTEGER NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  payment_method VARCHAR(50) NOT NULL, -- 'card', 'paypal'
  payment_provider VARCHAR(50), -- 'stripe', 'paypal'
  transaction_id VARCHAR(255) UNIQUE,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  payment_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: reviews (Reseñas)
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  apartment_id INTEGER NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  booking_id INTEGER REFERENCES bookings(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  cleanliness_rating INTEGER CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
  accuracy_rating INTEGER CHECK (accuracy_rating >= 1 AND accuracy_rating <= 5),
  checkin_rating INTEGER CHECK (checkin_rating >= 1 AND checkin_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  location_rating INTEGER CHECK (location_rating >= 1 AND location_rating <= 5),
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(apartment_id, user_id, booking_id)
);

-- ============================================
-- TABLA: user_reviews (Reseñas de usuarios)
-- ============================================
CREATE TABLE IF NOT EXISTS user_reviews (
  id SERIAL PRIMARY KEY,
  reviewed_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reviewer_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  booking_id INTEGER REFERENCES bookings(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(reviewed_user_id, reviewer_user_id, booking_id)
);

-- ============================================
-- TABLA: favorites (Favoritos)
-- ============================================
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  apartment_id INTEGER NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, apartment_id)
);

-- ============================================
-- TABLA: messages (Mensajes)
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  apartment_id INTEGER REFERENCES apartments(id) ON DELETE SET NULL,
  booking_id INTEGER REFERENCES bookings(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: notifications (Notificaciones)
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'booking', 'message', 'review', 'payment'
  title VARCHAR(255) NOT NULL,
  message TEXT,
  link VARCHAR(500),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: roommates (Compañeros de cuarto)
-- ============================================
CREATE TABLE IF NOT EXISTS roommates (
  id SERIAL PRIMARY KEY,
  apartment_id INTEGER NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  move_in_date DATE,
  move_out_date DATE,
  is_current BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(apartment_id, user_id)
);

-- ============================================
-- ÍNDICES para mejorar el rendimiento
-- ============================================
CREATE INDEX idx_apartments_landlord ON apartments(landlord_id);
CREATE INDEX idx_apartments_location ON apartments(latitude, longitude);
CREATE INDEX idx_apartments_price ON apartments(price);
CREATE INDEX idx_apartments_type ON apartments(type);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_apartment ON bookings(apartment_id);
CREATE INDEX idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX idx_reviews_apartment ON reviews(apartment_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_roommates_apartment ON roommates(apartment_id);
CREATE INDEX idx_roommates_user ON roommates(user_id);

-- ============================================
-- TRIGGERS para actualizar updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_apartments_updated_at BEFORE UPDATE ON apartments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
