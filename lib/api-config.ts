/**
 * API Configuration
 *
 * Configuración centralizada para todas las llamadas a la API.
 * Cambia API_BASE_URL para apuntar a tu servidor backend.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

// Endpoints de la API
export const API_ENDPOINTS = {
  // Autenticación
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    googleAuth: "/auth/google",
    me: "/auth/me",
  },

  // Departamentos
  apartments: {
    list: "/apartments",
    detail: (id: string) => `/apartments/${id}`,
    search: "/apartments/search",
    create: "/apartments",
    update: (id: string) => `/apartments/${id}`,
    delete: (id: string) => `/apartments/${id}`,
    nearby: "/apartments/nearby",
  },

  // Reseñas
  reviews: {
    list: (apartmentId: string) => `/apartments/${apartmentId}/reviews`,
    create: (apartmentId: string) => `/apartments/${apartmentId}/reviews`,
    update: (id: string) => `/reviews/${id}`,
    delete: (id: string) => `/reviews/${id}`,
  },

  // Reservas
  bookings: {
    list: "/bookings",
    detail: (id: string) => `/bookings/${id}`,
    create: "/bookings",
    cancel: (id: string) => `/bookings/${id}/cancel`,
    confirm: (id: string) => `/bookings/${id}/confirm`,
  },

  // Favoritos
  favorites: {
    list: "/favorites",
    add: "/favorites",
    remove: (apartmentId: string) => `/favorites/${apartmentId}`,
    check: (apartmentId: string) => `/favorites/${apartmentId}/check`,
  },

  // Chat
  chat: {
    conversations: "/chat/conversations",
    conversationDetail: (id: string) => `/chat/conversations/${id}`,
    messages: (conversationId: string) => `/chat/conversations/${conversationId}/messages`,
    sendMessage: (conversationId: string) => `/chat/conversations/${conversationId}/messages`,
    markRead: (conversationId: string) => `/chat/conversations/${conversationId}/read`,
    upload: "/chat/upload",
  },

  // Roommates
  roommates: {
    profiles: "/roommates/profiles",
    profileDetail: (id: string) => `/roommates/profiles/${id}`,
    matches: "/roommates/matches",
    posts: "/roommates/posts",
    postDetail: (id: string) => `/roommates/posts/${id}`,
    createPost: "/roommates/posts",
    sendRequest: "/roommates/requests",
    respondRequest: (id: string) => `/roommates/requests/${id}`,
  },

  // Usuarios
  users: {
    profile: (id: string) => `/users/${id}`,
    updateProfile: "/users/profile",
    uploadAvatar: "/users/avatar",
  },

  // Pagos
  payments: {
    createIntent: "/payments/create-intent",
    confirm: "/payments/confirm",
    methods: "/payments/methods",
    deleteMethod: (id: string) => `/payments/methods/${id}`,
  },

  // Arrendatarios
  landlord: {
    register: "/landlord/register",
    dashboard: "/landlord/dashboard",
    properties: "/landlord/properties",
    bookings: "/landlord/bookings",
  },
} as const

// Headers por defecto
export const getDefaultHeaders = (token?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  return headers
}
