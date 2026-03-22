/**
 * Cliente API
 *
 * Funciones helper para hacer llamadas a la API con manejo de errores
 * y autenticación automática.
 */

import { API_BASE_URL, getDefaultHeaders } from "./api-config"

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message)
    this.name = "APIError"
  }
}

/**
 * Realiza una petición GET a la API
 *
 * @param endpoint - Endpoint de la API (ej: '/apartments')
 * @param options - Opciones adicionales (headers, query params, etc.)
 * @returns Promise con los datos de la respuesta
 *
 * @example
 * const apartments = await apiGet('/apartments', {
 *   params: { city: 'Guayaquil', limit: 10 }
 * })
 */
export async function apiGet<T>(
  endpoint: string,
  options?: {
    params?: Record<string, any>
    token?: string
    headers?: HeadersInit
  },
): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`)

  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ...getDefaultHeaders(options?.token),
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Error desconocido" }))
    throw new APIError(error.message || "Error en la petición", response.status, error.code)
  }

  const data = await response.json()
  return data.data || data
}

/**
 * Realiza una petición POST a la API
 *
 * @param endpoint - Endpoint de la API
 * @param body - Datos a enviar en el body
 * @param options - Opciones adicionales
 * @returns Promise con los datos de la respuesta
 *
 * @example
 * const booking = await apiPost('/bookings', {
 *   apartmentId: '123',
 *   checkIn: '2024-01-01',
 *   checkOut: '2024-01-10',
 *   guests: 2
 * }, { token: userToken })
 */
export async function apiPost<T>(
  endpoint: string,
  body?: any,
  options?: {
    token?: string
    headers?: HeadersInit
  },
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      ...getDefaultHeaders(options?.token),
      ...options?.headers,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Error desconocido" }))
    throw new APIError(error.message || "Error en la petición", response.status, error.code)
  }

  const data = await response.json()
  return data.data || data
}

/**
 * Realiza una petición PATCH a la API
 *
 * @param endpoint - Endpoint de la API
 * @param body - Datos a actualizar
 * @param options - Opciones adicionales
 * @returns Promise con los datos de la respuesta
 *
 * @example
 * await apiPatch('/users/profile', {
 *   name: 'Juan Pérez',
 *   bio: 'Estudiante de ingeniería'
 * }, { token: userToken })
 */
export async function apiPatch<T>(
  endpoint: string,
  body?: any,
  options?: {
    token?: string
    headers?: HeadersInit
  },
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: {
      ...getDefaultHeaders(options?.token),
      ...options?.headers,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Error desconocido" }))
    throw new APIError(error.message || "Error en la petición", response.status, error.code)
  }

  const data = await response.json()
  return data.data || data
}

/**
 * Realiza una petición DELETE a la API
 *
 * @param endpoint - Endpoint de la API
 * @param options - Opciones adicionales
 * @returns Promise con los datos de la respuesta
 *
 * @example
 * await apiDelete('/favorites/123', { token: userToken })
 */
export async function apiDelete<T>(
  endpoint: string,
  options?: {
    token?: string
    headers?: HeadersInit
  },
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      ...getDefaultHeaders(options?.token),
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Error desconocido" }))
    throw new APIError(error.message || "Error en la petición", response.status, error.code)
  }

  const data = await response.json()
  return data.data || data
}

/**
 * Sube un archivo a la API
 *
 * @param endpoint - Endpoint de la API
 * @param file - Archivo a subir
 * @param options - Opciones adicionales
 * @returns Promise con la URL del archivo subido
 *
 * @example
 * const avatarUrl = await apiUpload('/users/avatar', file, { token: userToken })
 */
export async function apiUpload(
  endpoint: string,
  file: File,
  options?: {
    token?: string
    additionalData?: Record<string, string>
  },
): Promise<{ url: string }> {
  const formData = new FormData()
  formData.append("file", file)

  if (options?.additionalData) {
    Object.entries(options.additionalData).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }

  const headers: HeadersInit = {}
  if (options?.token) {
    headers["Authorization"] = `Bearer ${options.token}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Error al subir archivo" }))
    throw new APIError(error.message || "Error al subir archivo", response.status, error.code)
  }

  const data = await response.json()
  return data.data || data
}
