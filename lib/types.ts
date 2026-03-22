// Database types based on the provided schema

export interface User {
  id: number
  google_id: string
  email: string
  name: string | null
  picture: string | null
  auth_provider: string
  created_at: string
  last_login: string | null
  role: string
}

export interface Facultad {
  id_facultad: string
  nombre: string
  descripcion: string | null
}

export interface Carrera {
  id_carrera: string
  nombre: string
  descripcion: string | null
  id_facultad: string
}

export interface Evento {
  id_evento: string
  nombre_evento: string
  descripcion: string | null
  fecha_inicio: string
  fecha_fin: string
  activo: boolean
}

export interface Candidata {
  id_candidata: string
  nombre: string
  descripcion: string | null
  foto_url: string | null
  instagram_url?: string
  id_carrera: string
  id_evento: string
  carrera?: Carrera
  votos_count?: number
  votos_percentage?: number
}

export interface Voto {
  id_voto: string
  id_usuario: number
  id_candidata: string
  id_evento: string
  fecha_voto: string
}

export interface Comentario {
  id_comentario: string
  id_usuario: number
  id_evento: string | null
  id_candidata: string | null
  id_comentario_padre: string | null
  mensaje: string
  fecha_comentario: string
  usuario?: User
  reacciones?: Reaccion[]
  respuestas?: Comentario[]
}

export interface Reaccion {
  id_reaccion: string
  id_usuario: number
  id_comentario: string
  tipo: "like" | "love" | "haha" | "sad" | "angry"
  fecha_reaccion: string
}

export interface Encuesta {
  id_encuesta: string
  id_evento: string
  pregunta: string
}

export interface RespuestaEncuesta {
  id_respuesta: string
  id_usuario: number
  id_encuesta: string
  respuesta: string
  fecha_respuesta: string
}

// Apartment-related types for real estate platform
export interface Apartment {
  id: string
  title: string
  description: string
  location: string
  address: string
  price: number
  rating: number
  reviewCount: number
  images: string[]
  type: "shared" | "private"
  bedrooms: number
  bathrooms: number
  maxOccupants: number
  currentOccupants: number
  amenities: string[]
  verified: boolean
  landlordId: string
  coordinates: {
    lat: number
    lng: number
  }
  roommates?: Roommate[]
  reviews?: Review[]
}

export interface Roommate {
  id: string
  name: string
  age: number
  university: string
  major: string
  bio: string
  photo: string
  interests: string[]
}

export interface Review {
  id: string
  userId: string
  userName: string
  userPhoto: string
  rating: number
  comment: string
  date: string
  categories: {
    cleanliness: number
    accuracy: number
    checkin: number
    communication: number
    location: number
    value: number
  }
}

export interface Landlord {
  id: string
  name: string
  photo: string
  verified: boolean
  joinDate: string
  responseTime: string
  responseRate: number
  properties: number
}

export interface ChatConversation {
  id: string
  participants: ChatParticipant[]
  lastMessage: ChatMessage | null
  unreadCount: number
  updatedAt: string
}

export interface ChatParticipant {
  id: string
  name: string
  photo: string
  online: boolean
  lastSeen?: string
}

export interface ChatMessage {
  id: string
  conversationId: string
  senderId: string
  content: string
  timestamp: string
  read: boolean
  type: "text" | "image" | "file"
}

// Roommate matching system types
export interface RoommateProfile {
  id: string
  userId: string
  name: string
  age: number
  photo: string
  university: string
  major: string
  yearOfStudy: number
  cityOfOrigin: string
  bio: string
  lookingFor: "roommate" | "room" | "both"
  budget: {
    min: number
    max: number
  }
  moveInDate: string
  interests: string[]
  lifestyle: {
    sleepSchedule: "early-bird" | "night-owl" | "flexible"
    cleanliness: "very-clean" | "clean" | "moderate" | "relaxed"
    socialLevel: "very-social" | "social" | "moderate" | "quiet"
    studyHabits: "library" | "home" | "flexible"
    smoking: boolean
    pets: boolean
    cooking: "often" | "sometimes" | "rarely"
    guests: "often" | "sometimes" | "rarely"
  }
  preferences: {
    gender: "male" | "female" | "any"
    ageRange: {
      min: number
      max: number
    }
    sameUniversity: boolean
    sameMajor: boolean
  }
  verified: boolean
  compatibilityScore?: number
  createdAt: string
  lastActive: string
}

export interface RoommatePost {
  id: string
  authorId: string
  author: RoommateProfile
  title: string
  content: string
  category: "looking-for-roommate" | "looking-for-room" | "advice" | "general"
  tags: string[]
  likes: number
  comments: ForumComment[]
  createdAt: string
  updatedAt: string
}

export interface ForumComment {
  id: string
  postId: string
  authorId: string
  author: {
    id: string
    name: string
    photo: string
  }
  content: string
  likes: number
  createdAt: string
}

export interface RoommateMatch {
  id: string
  profile: RoommateProfile
  compatibilityScore: number
  matchReasons: string[]
  status: "pending" | "accepted" | "rejected"
}

export interface CompatibilityQuiz {
  sleepSchedule: "early-bird" | "night-owl" | "flexible"
  cleanliness: "very-clean" | "clean" | "moderate" | "relaxed"
  socialLevel: "very-social" | "social" | "moderate" | "quiet"
  studyHabits: "library" | "home" | "flexible"
  smoking: boolean
  pets: boolean
  cooking: "often" | "sometimes" | "rarely"
  guests: "often" | "sometimes" | "rarely"
  interests: string[]
}
