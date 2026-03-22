// ... existing code ...

---

## Mensajería y Chat en Tiempo Real

### POST /api/chat/conversations
Crear o obtener una conversación existente

**Headers:**
\`\`\`
Authorization: Bearer {token}
\`\`\`

**Request Body:**
\`\`\`json
{
  "participantId": "string",
  "apartmentId": "string" // Opcional, para contexto
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "string",
    "participants": [
      {
        "id": "string",
        "name": "string",
        "avatar": "string",
        "online": boolean,
        "lastSeen": "string"
      }
    ],
    "createdAt": "string",
    "updatedAt": "string"
  }
}
\`\`\`

---

### GET /api/chat/conversations
Obtener todas las conversaciones del usuario

**Headers:**
\`\`\`
Authorization: Bearer {token}
\`\`\`

**Query Parameters:**
\`\`\`
page: number (default: 1)
limit: number (default: 20)
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "participants": [
        {
          "id": "string",
          "name": "string",
          "avatar": "string",
          "online": boolean,
          "lastSeen": "string"
        }
      ],
      "lastMessage": {
        "id": "string",
        "senderId": "string",
        "content": "string",
        "timestamp": "string",
        "read": boolean,
        "type": "text" | "image" | "file"
      },
      "unreadCount": number,
      "updatedAt": "string"
    }
  ],
  "pagination": {
    "page": number,
    "limit": number,
    "total": number,
    "totalPages": number
  }
}
\`\`\`

---

### GET /api/chat/conversations/:id/messages
Obtener mensajes de una conversación

**Headers:**
\`\`\`
Authorization: Bearer {token}
\`\`\`

**Query Parameters:**
\`\`\`
page: number (default: 1)
limit: number (default: 50)
before: string (message ID para paginación)
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "conversationId": "string",
      "senderId": "string",
      "senderName": "string",
      "senderAvatar": "string",
      "content": "string",
      "type": "text" | "image" | "file",
      "fileUrl": "string", // Si type es image o file
      "timestamp": "string",
      "read": boolean,
      "editedAt": "string",
      "deletedAt": "string"
    }
  ],
  "pagination": {
    "page": number,
    "limit": number,
    "total": number,
    "hasMore": boolean
  }
}
\`\`\`

---

### POST /api/chat/conversations/:id/messages
Enviar un mensaje en una conversación

**Headers:**
\`\`\`
Authorization: Bearer {token}
\`\`\`

**Request Body:**
\`\`\`json
{
  "content": "string",
  "type": "text" | "image" | "file",
  "fileUrl": "string" // Requerido si type es image o file
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "string",
    "conversationId": "string",
    "senderId": "string",
    "content": "string",
    "type": "string",
    "timestamp": "string",
    "read": false
  }
}
\`\`\`

---

### PATCH /api/chat/messages/:id
Editar un mensaje

**Headers:**
\`\`\`
Authorization: Bearer {token}
\`\`\`

**Request Body:**
\`\`\`json
{
  "content": "string"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "string",
    "content": "string",
    "editedAt": "string"
  }
}
\`\`\`

---

### DELETE /api/chat/messages/:id
Eliminar un mensaje

**Headers:**
\`\`\`
Authorization: Bearer {token}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Mensaje eliminado exitosamente"
}
\`\`\`

---

### POST /api/chat/conversations/:id/read
Marcar mensajes como leídos

**Headers:**
\`\`\`
Authorization: Bearer {token}
\`\`\`

**Request Body:**
\`\`\`json
{
  "messageIds": ["string"] // IDs de mensajes a marcar como leídos
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Mensajes marcados como leídos"
}
\`\`\`

---

### POST /api/chat/upload
Subir archivo o imagen para el chat

**Headers:**
\`\`\`
Authorization: Bearer {token}
Content-Type: multipart/form-data
\`\`\`

**Request Body:**
\`\`\`
file: File (imagen o archivo)
conversationId: string
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "url": "string",
    "type": "image" | "file",
    "filename": "string",
    "size": number
  }
}
\`\`\`

---

### WebSocket: /ws/chat
Conexión WebSocket para chat en tiempo real

**Conexión:**
\`\`\`javascript
const ws = new WebSocket('wss://api.example.com/ws/chat?token={jwt_token}')
\`\`\`

**Eventos del Cliente → Servidor:**

1. **Enviar mensaje:**
\`\`\`json
{
  "type": "message",
  "data": {
    "conversationId": "string",
    "content": "string",
    "messageType": "text" | "image" | "file"
  }
}
\`\`\`

2. **Indicador de escritura:**
\`\`\`json
{
  "type": "typing",
  "data": {
    "conversationId": "string",
    "isTyping": boolean
  }
}
\`\`\`

3. **Marcar como leído:**
\`\`\`json
{
  "type": "read",
  "data": {
    "conversationId": "string",
    "messageIds": ["string"]
  }
}
\`\`\`

4. **Actualizar presencia:**
\`\`\`json
{
  "type": "presence",
  "data": {
    "status": "online" | "away" | "offline"
  }
}
\`\`\`

**Eventos del Servidor → Cliente:**

1. **Nuevo mensaje:**
\`\`\`json
{
  "type": "message",
  "data": {
    "id": "string",
    "conversationId": "string",
    "senderId": "string",
    "senderName": "string",
    "senderAvatar": "string",
    "content": "string",
    "messageType": "text" | "image" | "file",
    "timestamp": "string"
  }
}
\`\`\`

2. **Usuario escribiendo:**
\`\`\`json
{
  "type": "typing",
  "data": {
    "conversationId": "string",
    "userId": "string",
    "userName": "string",
    "isTyping": boolean
  }
}
\`\`\`

3. **Mensaje leído:**
\`\`\`json
{
  "type": "read",
  "data": {
    "conversationId": "string",
    "messageIds": ["string"],
    "readBy": "string",
    "readAt": "string"
  }
}
\`\`\`

4. **Cambio de presencia:**
\`\`\`json
{
  "type": "presence",
  "data": {
    "userId": "string",
    "status": "online" | "away" | "offline",
    "lastSeen": "string"
  }
}
\`\`\`

5. **Error:**
\`\`\`json
{
  "type": "error",
  "data": {
    "code": "string",
    "message": "string"
  }
}
\`\`\`

---

## Perfiles de Usuario

### GET /api/users/:id
Obtener perfil público de un usuario

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "avatar": "string",
    "bio": "string",
    "university": "string",
    "major": "string",
    "joinedDate": "string",
    "verified": boolean,
    "stats": {
      "reviewsCount": number,
      "rating": number,
      "responseRate": number,
      "responseTime": "string"
    },
    "preferences": {
      "sleepSchedule": "string",
      "cleanliness": "string",
      "socialLevel": "string",
      "studyHabits": "string"
    },
    "interests": ["string"],
    "languages": ["string"]
  }
}
\`\`\`

---

### PATCH /api/users/profile
Actualizar perfil del usuario

**Headers:**
\`\`\`
Authorization: Bearer {token}
\`\`\`

**Request Body:**
\`\`\`json
{
  "name": "string",
  "bio": "string",
  "avatar": "string",
  "university": "string",
  "major": "string",
  "preferences": {
    "sleepSchedule": "string",
    "cleanliness": "string",
    "socialLevel": "string",
    "studyHabits": "string"
  },
  "interests": ["string"],
  "languages": ["string"]
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Perfil actualizado exitosamente"
}
\`\`\`

---

## Pagos

### POST /api/payments/create-intent
Crear intención de pago

**Headers:**
\`\`\`
Authorization: Bearer {token}
\`\`\`

**Request Body:**
\`\`\`json
{
  "bookingId": "string",
  "paymentMethod": "card" | "paypal",
  "savePaymentMethod": boolean
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "clientSecret": "string",
    "paymentIntentId": "string",
    "amount": number,
    "currency": "string"
  }
}
\`\`\`

---

### POST /api/payments/confirm
Confirmar pago

**Headers:**
\`\`\`
Authorization: Bearer {token}
\`\`\`

**Request Body:**
\`\`\`json
{
  "paymentIntentId": "string",
  "paymentMethodId": "string"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "paymentId": "string",
    "status": "succeeded" | "processing" | "failed",
    "bookingId": "string",
    "receiptUrl": "string"
  }
}
\`\`\`

---

### GET /api/payments/methods
Obtener métodos de pago guardados

**Headers:**
\`\`\`
Authorization: Bearer {token}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "type": "card" | "paypal",
      "last4": "string",
      "brand": "string",
      "expiryMonth": number,
      "expiryYear": number,
      "isDefault": boolean
    }
  ]
}
\`\`\`

---

### DELETE /api/payments/methods/:id
Eliminar método de pago

**Headers:**
\`\`\`
Authorization: Bearer {token}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Método de pago eliminado exitosamente"
}
\`\`\`

---

## Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token inválido o expirado |
| 403 | Forbidden - Sin permisos para esta acción |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Conflicto con el estado actual |
| 422 | Unprocessable Entity - Validación fallida |
| 429 | Too Many Requests - Límite de rate excedido |
| 500 | Internal Server Error - Error del servidor |

---

## Rate Limiting

Todos los endpoints tienen límites de tasa:
- **Autenticación:** 5 intentos por minuto
- **Búsqueda:** 30 requests por minuto
- **Mensajería:** 60 mensajes por minuto
- **Otros endpoints:** 100 requests por minuto

Headers de respuesta:
\`\`\`
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
