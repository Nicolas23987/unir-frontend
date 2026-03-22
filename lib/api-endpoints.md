# API Endpoints Necesarios para la Aplicación UNIR

## Autenticación
- **POST** `/api/auth/google` - Autenticar con Google OAuth
- **POST** `/api/auth/facebook` - Autenticar con Facebook
- **POST** `/api/auth/instagram` - Autenticar con Instagram
- **GET** `/api/auth/me` - Obtener usuario actual
- **POST** `/api/auth/logout` - Cerrar sesión

## Usuarios
- **GET** `/api/users/:id` - Obtener información de usuario
- **PUT** `/api/users/:id` - Actualizar información de usuario
- **GET** `/api/users/:id/votes` - Obtener votos del usuario

## Facultades
- **GET** `/api/facultades` - Listar todas las facultades
- **GET** `/api/facultades/:id` - Obtener facultad específica
- **GET** `/api/facultades/:id/carreras` - Obtener carreras de una facultad

## Carreras
- **GET** `/api/carreras` - Listar todas las carreras
- **GET** `/api/carreras/:id` - Obtener carrera específica
- **GET** `/api/carreras/:id/candidatas` - Obtener candidatas de una carrera

## Eventos
- **GET** `/api/eventos` - Listar todos los eventos
- **GET** `/api/eventos/activo` - Obtener evento activo actual
- **GET** `/api/eventos/:id` - Obtener evento específico
- **GET** `/api/eventos/:id/stats` - Obtener estadísticas del evento

## Candidatas
- **GET** `/api/candidatas` - Listar todas las candidatas del evento activo
- **GET** `/api/candidatas/:id` - Obtener candidata específica
- **GET** `/api/candidatas/:id/votos` - Obtener conteo de votos de candidata
- **GET** `/api/candidatas/ranking` - Obtener ranking de candidatas con porcentajes

## Votos
- **POST** `/api/votos` - Registrar un voto
  - Body: `{ id_candidata: string, id_evento: string }`
- **GET** `/api/votos/check/:evento_id` - Verificar si el usuario ya votó en el evento
- **DELETE** `/api/votos/:id` - Eliminar voto (solo admin)

## Comentarios
- **GET** `/api/comentarios` - Listar comentarios del evento activo
- **GET** `/api/comentarios/:id` - Obtener comentario específico
- **POST** `/api/comentarios` - Crear nuevo comentario
  - Body: `{ id_evento?: string, id_candidata?: string, mensaje: string }`
- **PUT** `/api/comentarios/:id` - Editar comentario (solo autor)
- **DELETE** `/api/comentarios/:id` - Eliminar comentario (solo autor o admin)

## Reacciones
- **POST** `/api/reacciones` - Agregar reacción a comentario
  - Body: `{ id_comentario: string, tipo: 'like' | 'love' | 'haha' | 'sad' | 'angry' }`
- **DELETE** `/api/reacciones/:id` - Eliminar reacción
- **GET** `/api/comentarios/:id/reacciones` - Obtener reacciones de un comentario

## Encuestas
- **GET** `/api/encuestas` - Listar encuestas del evento activo
- **GET** `/api/encuestas/:id` - Obtener encuesta específica
- **POST** `/api/encuestas/:id/responder` - Responder encuesta
  - Body: `{ respuesta: string }`
- **GET** `/api/encuestas/:id/resultados` - Obtener resultados de encuesta

## Estadísticas
- **GET** `/api/stats/general` - Estadísticas generales (total votos, participantes, etc.)
- **GET** `/api/stats/carreras` - Votos por carrera
- **GET** `/api/stats/facultades` - Votos por facultad
- **GET** `/api/stats/foraneos` - Estadísticas de estudiantes foráneos vs locales

## Notas de Implementación

### Seguridad
- Todos los endpoints excepto GET públicos requieren autenticación
- Validar que un usuario solo vote una vez por evento
- Validar que un usuario solo responda una vez por encuesta
- Los comentarios solo pueden ser editados/eliminados por su autor o admin

### Paginación
- Implementar paginación en:
  - `/api/candidatas` (limit, offset)
  - `/api/comentarios` (limit, offset)
  
### Rate Limiting
- Limitar votos: 1 por evento por usuario
- Limitar comentarios: máximo 10 por hora por usuario
- Limitar reacciones: máximo 50 por hora por usuario

### Caché
- Cachear resultados de:
  - `/api/candidatas/ranking` (actualizar cada 30 segundos)
  - `/api/stats/general` (actualizar cada 1 minuto)
  - `/api/eventos/activo` (actualizar cada 5 minutos)
