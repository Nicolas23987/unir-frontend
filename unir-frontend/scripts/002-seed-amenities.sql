-- Script para poblar la tabla de amenidades
-- Versión: 1.0

INSERT INTO amenities (name, icon, category) VALUES
-- Básicas
('WiFi', 'wifi', 'basic'),
('Agua caliente', 'droplet', 'basic'),
('Electricidad incluida', 'zap', 'basic'),
('Agua incluida', 'droplet', 'basic'),
('Gas incluido', 'flame', 'basic'),
('Cocina equipada', 'utensils', 'basic'),
('Refrigerador', 'refrigerator', 'basic'),
('Microondas', 'microwave', 'basic'),

-- Confort
('Aire acondicionado', 'wind', 'comfort'),
('Calefacción', 'thermometer', 'comfort'),
('Lavadora', 'washing-machine', 'comfort'),
('Secadora', 'dryer', 'comfort'),
('TV', 'tv', 'comfort'),
('Escritorio', 'desk', 'comfort'),
('Closet', 'cabinet', 'comfort'),
('Balcón', 'balcony', 'comfort'),

-- Seguridad
('Portero 24/7', 'shield', 'security'),
('Cámaras de seguridad', 'camera', 'security'),
('Alarma', 'bell', 'security'),
('Puerta con cerradura', 'lock', 'security'),
('Extintor', 'fire-extinguisher', 'security'),

-- Entretenimiento y extras
('Gimnasio', 'dumbbell', 'entertainment'),
('Piscina', 'waves', 'entertainment'),
('Área de estudio', 'book', 'entertainment'),
('Sala de juegos', 'gamepad', 'entertainment'),
('Estacionamiento', 'car', 'entertainment'),
('Ascensor', 'elevator', 'entertainment'),
('Terraza', 'sun', 'entertainment'),
('Jardín', 'tree', 'entertainment')
ON CONFLICT (name) DO NOTHING;
