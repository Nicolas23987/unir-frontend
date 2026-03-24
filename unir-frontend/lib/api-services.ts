/**
 * Servicios de API
 *
 * Funciones específicas para cada módulo de la aplicación.
 * Todas las funciones están documentadas con los datos que esperan recibir.
 */

import { apiGet, apiPost, apiDelete } from "./api-client"
import { API_ENDPOINTS } from "./api-config"
import type { Apartment, Review, RoommateProfile, ChatConversation, ChatMessage } from "./types"

// ============================================
// APARTAMENTOS
// ============================================

/**
 * Obtiene lista de apartamentos con filtros
 *
 * @param params - Parámetros de búsqueda
 * @param params.city - Ciudad (ej: "Guayaquil")
 * @param params.minPrice - Precio mínimo
 * @param params.maxPrice - Precio máximo
 * @param params.type - Tipo: "shared" | "private"
 * @param params.bedrooms - Número de habitaciones
 * @param params.page - Página actual
 * @param params.limit - Resultados por página
 * @param token - Token de autenticación (opcional)
 *
 * @returns Promise con array de apartamentos y paginación
 *
 * Endpoint: GET /api/apartments
 * Response: { data: Apartment[], pagination: { page, limit, total, totalPages } }
 */
export async function getApartments(
  params?: {
    city?: string
    minPrice?: number
    maxPrice?: number
    type?: "shared" | "private"
    bedrooms?: number
    page?: number
    limit?: number
  },
  token?: string,
) {
  return apiGet<{ data: Apartment[]; pagination: any }>(API_ENDPOINTS.apartments.list, { params, token })
}

/**
 * Obtiene detalles de un apartamento específico
 *
 * @param id - ID del apartamento
 * @param token - Token de autenticación (opcional)
 *
 * @returns Promise con datos del apartamento
 *
 * Endpoint: GET /api/apartments/:id
 * Response: Apartment
 */
export async function getApartmentById(id: string, token?: string) {
  return apiGet<Apartment>(API_ENDPOINTS.apartments.detail(id), { token })
}

/**
 * Busca apartamentos cercanos a una ubicación
 *
 * @param params - Parámetros de búsqueda
 * @param params.latitude - Latitud
 * @param params.longitude - Longitud
 * @param params.radius - Radio en kilómetros (default: 5)
 * @param token - Token de autenticación (opcional)
 *
 * @returns Promise con array de apartamentos cercanos
 *
 * Endpoint: GET /api/apartments/nearby
 * Response: Apartment[]
 */
export async function getNearbyApartments(
  params: {
    latitude: number
    longitude: number
    radius?: number
  },
  token?: string,
) {
  return apiGet<Apartment[]>(API_ENDPOINTS.apartments.nearby, { params, token })
}

// ============================================
// RESEÑAS
// ============================================

/**
 * Obtiene reseñas de un apartamento
 *
 * @param apartmentId - ID del apartamento
 * @param params - Parámetros opcionales
 * @param params.page - Página actual
 * @param params.limit - Resultados por página
 * @param token - Token de autenticación (opcional)
 *
 * @returns Promise con array de reseñas
 *
 * Endpoint: GET /api/apartments/:id/reviews
 * Response: { data: Review[], pagination: {...} }
 */
export async function getApartmentReviews(
  apartmentId: string,
  params?: { page?: number; limit?: number },
  token?: string,
) {
  return apiGet<{ data: Review[]; pagination: any }>(API_ENDPOINTS.reviews.list(apartmentId), { params, token })
}

/**
 * Crea una nueva reseña para un apartamento
 *
 * @param apartmentId - ID del apartamento
 * @param reviewData - Datos de la reseña
 * @param reviewData.rating - Calificación general (1-5)
 * @param reviewData.comment - Comentario
 * @param reviewData.cleanliness - Calificación de limpieza (1-5)
 * @param reviewData.accuracy - Calificación de precisión (1-5)
 * @param reviewData.checkin - Calificación de check-in (1-5)
 * @param reviewData.communication - Calificación de comunicación (1-5)
 * @param reviewData.location - Calificación de ubicación (1-5)
 * @param reviewData.value - Calificación de precio (1-5)
 * @param token - Token de autenticación (requerido)
 *
 * @returns Promise con la reseña creada
 *
 * Endpoint: POST /api/apartments/:id/reviews
 * Response: Review
 */
export async function createReview(
  apartmentId: string,
  reviewData: {
    rating: number
    comment: string
    cleanliness: number
    accuracy: number
    checkin: number
    communication: number
    location: number
    value: number
  },
  token: string,
) {
  return apiPost<Review>(API_ENDPOINTS.reviews.create(apartmentId), reviewData, { token })
}

// ============================================
// RESERVAS
// ============================================

/**
 * Crea una nueva reserva
 *
 * @param bookingData - Datos de la reserva
 * @param bookingData.apartmentId - ID del apartamento
 * @param bookingData.checkIn - Fecha de entrada (YYYY-MM-DD)
 * @param bookingData.checkOut - Fecha de salida (YYYY-MM-DD)
 * @param bookingData.guests - Número de huéspedes
 * @param bookingData.specialRequests - Solicitudes especiales (opcional)
 * @param token - Token de autenticación (requerido)
 *
 * @returns Promise con la reserva creada
 *
 * Endpoint: POST /api/bookings
 * Response: { id, bookingCode, totalPrice, status, ... }
 */
export async function createBooking(
  bookingData: {
    apartmentId: string
    checkIn: string
    checkOut: string
    guests: number
    specialRequests?: string
  },
  token: string,
) {
  return apiPost(API_ENDPOINTS.bookings.create, bookingData, { token })
}

/**
 * Obtiene las reservas del usuario
 *
 * @param params - Parámetros opcionales
 * @param params.status - Filtrar por estado
 * @param params.page - Página actual
 * @param token - Token de autenticación (requerido)
 *
 * @returns Promise con array de reservas
 *
 * Endpoint: GET /api/bookings
 * Response: { data: Booking[], pagination: {...} }
 */
export async function getUserBookings(params?: { status?: string; page?: number }, token?: string) {
  return apiGet(API_ENDPOINTS.bookings.list, { params, token })
}

// ============================================
// FAVORITOS
// ============================================

/**
 * Obtiene los favoritos del usuario
 *
 * @param token - Token de autenticación (requerido)
 *
 * @returns Promise con array de apartamentos favoritos
 *
 * Endpoint: GET /api/favorites
 * Response: Apartment[]
 */
export async function getFavorites(token: string) {
  return apiGet<Apartment[]>(API_ENDPOINTS.favorites.list, { token })
}

/**
 * Agrega un apartamento a favoritos
 *
 * @param apartmentId - ID del apartamento
 * @param token - Token de autenticación (requerido)
 *
 * @returns Promise con confirmación
 *
 * Endpoint: POST /api/favorites
 * Response: { success: true, message: "..." }
 */
export async function addFavorite(apartmentId: string, token: string) {
  return apiPost(API_ENDPOINTS.favorites.add, { apartmentId }, { token })
}

/**
 * Elimina un apartamento de favoritos
 *
 * @param apartmentId - ID del apartamento
 * @param token - Token de autenticación (requerido)
 *
 * @returns Promise con confirmación
 *
 * Endpoint: DELETE /api/favorites/:apartmentId
 * Response: { success: true, message: "..." }
 */
export async function removeFavorite(apartmentId: string, token: string) {
  return apiDelete(API_ENDPOINTS.favorites.remove(apartmentId), { token })
}

// ============================================
// CHAT Y MENSAJERÍA
// ============================================

/**
 * Obtiene todas las conversaciones del usuario
 *
 * @param token - Token de autenticación (requerido)
 *
 * @returns Promise con array de conversaciones
 *
 * Endpoint: GET /api/chat/conversations
 * Response: ChatConversation[]
 */
export async function getConversations(token: string) {
  return apiGet<ChatConversation[]>(API_ENDPOINTS.chat.conversations, { token })
}

/**
 * Obtiene mensajes de una conversación
 *
 * @param conversationId - ID de la conversación
 * @param params - Parámetros opcionales
 * @param params.page - Página actual
 * @param params.limit - Mensajes por página
 * @param token - Token de autenticación (requerido)
 *
 * @returns Promise con array de mensajes
 *
 * Endpoint: GET /api/chat/conversations/:id/messages
 * Response: { data: ChatMessage[], pagination: {...} }
 */
export async function getMessages(conversationId: string, params?: { page?: number; limit?: number }, token?: string) {
  return apiGet<{ data: ChatMessage[]; pagination: any }>(API_ENDPOINTS.chat.messages(conversationId), {
    params,
    token,
  })
}

/**
 * Envía un mensaje en una conversación
 *
 * @param conversationId - ID de la conversación
 * @param messageData - Datos del mensaje
 * @param messageData.content - Contenido del mensaje
 * @param messageData.type - Tipo: "text" | "image" | "file"
 * @param token - Token de autenticación (requerido)
 *
 * @returns Promise con el mensaje enviado
 *
 * Endpoint: POST /api/chat/conversations/:id/messages
 * Response: ChatMessage
 */
export async function sendMessage(
  conversationId: string,
  messageData: {
    content: string
    type: "text" | "image" | "file"
  },
  token: string,
) {
  return apiPost<ChatMessage>(API_ENDPOINTS.chat.sendMessage(conversationId), messageData, { token })
}

// ============================================
// ROOMMATES
// ============================================

/**
 * Obtiene perfiles de roommates con filtros
 *
 * @param params - Parámetros de búsqueda
 * @param params.university - Universidad
 * @param params.cityOfOrigin - Ciudad de origen
 * @param params.minBudget - Presupuesto mínimo
 * @param params.maxBudget - Presupuesto máximo
 * @param token - Token de autenticación (requerido)
 *
 * @returns Promise con array de perfiles
 *
 * Endpoint: GET /api/roommates/profiles
 * Response: RoommateProfile[]
 */
export async function getRoommateProfiles(
  params?: {
    university?: string
    cityOfOrigin?: string
    minBudget?: number
    maxBudget?: number
  },
  token?: string,
) {
  return apiGet<RoommateProfile[]>(API_ENDPOINTS.roommates.profiles, { params, token })
}

/**
 * Obtiene matches de roommates para el usuario
 *
 * @param token - Token de autenticación (requerido)
 *
 * @returns Promise con array de matches ordenados por compatibilidad
 *
 * Endpoint: GET /api/roommates/matches
 * Response: { profile: RoommateProfile, compatibilityScore: number, matchReasons: string[] }[]
 */
export async function getRoommateMatches(token: string) {
  return apiGet(API_ENDPOINTS.roommates.matches, { token })
}

// ============================================
// PAGOS
// ============================================

/**
 * Crea una intención de pago
 *
 * @param paymentData - Datos del pago
 * @param paymentData.bookingId - ID de la reserva
 * @param paymentData.paymentMethod - Método: "card" | "paypal"
 * @param token - Token de autenticación (requerido)
 *
 * @returns Promise con datos para procesar el pago
 *
 * Endpoint: POST /api/payments/create-intent
 * Response: { clientSecret: string, paymentIntentId: string, amount: number }
 */
export async function createPaymentIntent(
  paymentData: {
    bookingId: string
    paymentMethod: "card" | "paypal"
  },
  token: string,
) {
  return apiPost(API_ENDPOINTS.payments.createIntent, paymentData, { token })
}

/**
 * Confirma un pago
 *
 * @param confirmData - Datos de confirmación
 * @param confirmData.paymentIntentId - ID de la intención de pago
 * @param confirmData.paymentMethodId - ID del método de pago
 * @param token - Token de autenticación (requerido)
 *
 * @returns Promise con confirmación del pago
 *
 * Endpoint: POST /api/payments/confirm
 * Response: { paymentId: string, status: string, receiptUrl: string }
 */
export async function confirmPayment(
  confirmData: {
    paymentIntentId: string
    paymentMethodId: string
  },
  token: string,
) {
  return apiPost(API_ENDPOINTS.payments.confirm, confirmData, { token })
}
