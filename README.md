# Task Management API

API REST para gestión de tareas construida con Node.js, Express y Prisma ORM, conectada a PostgreSQL. Incluye autenticación JWT y gestión de usuarios.

## Descripción

API robusta para crear, leer, actualizar y eliminar tareas con persistencia en base de datos, autenticación JWT, manejo automático de errores y validación de datos. Cada usuario solo puede acceder a sus propias tareas.

## Tech Stack

- **Node.js** 18+ (runtime)
- **Express** 5.x (framework web)
- **Prisma** 6.x (ORM)
- **PostgreSQL** (base de datos)
- **JWT** (autenticación stateless)
- **bcryptjs** (hashing de contraseñas)
- **jsonwebtoken** (generación de tokens)
- **Nodemon** (desarrollo)

## Requisitos

- Node.js 18+
- npm 9+
- PostgreSQL 12+

## Instalación

```bash
# Clonar o descargar el repositorio
git clone <repo-url>

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar migraciones de base de datos
npx prisma migrate dev
```

## Configuración de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3000
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/task_management"
NODE_ENV=development
JWT_SECRET="tu_clave_secreta_aqui"
```

**Notas de seguridad:**
- `JWT_SECRET` debe ser una cadena fuerte en producción
- Si no se define, usa un valor por defecto (solo para desarrollo)
- La variable de entorno toma precedencia sobre el valor por defecto

## Scripts Disponibles

```bash
# Modo desarrollo (con hot reload)
npm run dev

# Ejecutar migraciones
npx prisma migrate dev

# Visualizar base de datos
npx prisma studio

# Pruebas (placeholder)
npm test
```

## Estructura del Proyecto

```text
src/
├── app.js                      # Configuración de Express
├── index.js                   # Punto de entrada
├── config/
│   └── prisma.js              # Instancia de PrismaClient
├── controllers/
│   ├── tasks.controller.js    # Controladores de tareas
│   └── user.controller.js     # Controladores de usuarios (registro/login)
├── middleware/
│   ├── asyncHandler.js        # Wrapper para async/await
│   ├── errorHandler.js        # Manejo global de errores
│   └── auth.middleware.js     # Validación de JWT
├── middlewares/
│   └── auth.middleware.js     # Middleware de autenticación
├── routes/
│   ├── tasks.routes.js        # Rutas de tareas (protegidas)
│   └── users.routes.js        # Rutas de autenticación
└── services/
    ├── tasks.services.js      # Lógica de tareas
    ├── user.register.services.js # Lógica de registro
    └── user.login.services.js # Lógica de login
prisma/
├── schema.prisma              # Definición de modelos
└── migrations/                # Historial de cambios de BD
```

## Arquitectura

La aplicación sigue una arquitectura en capas con autenticación JWT:

1. **Controllers** → Maneja peticiones HTTP y extrae datos del request
2. **Services** → Contiene lógica de negocio y acceso a datos (Prisma)
3. **Middleware** → `asyncHandler`, `errorHandler` y `authMiddleware` para gestión centralizada
4. **Routes** → Define endpoints y aplica protección con JWT
5. **Auth** → JWT stateless para autenticación sin sesiones

### Manejo de Errores

- **asyncHandler**: Captura automáticamente errores en funciones async
- **errorHandler**: Middleware global que formatea respuestas de error con status HTTP apropiados
- **Validación en servicio**: Try-catch con manejo específico de errores de Prisma (P2025 = registro no encontrado)
- **Autenticación**: Validación de JWT con códigos 401 para tokens inválidos

### Flujo de Autenticación

1. Usuario se registra: `POST /users/register` con email/password
2. Contraseña se hashea con bcryptjs
3. Usuario hace login: `POST /users/login` con email/password
4. API devuelve JWT firmado con el id del usuario
5. Cliente envía JWT en header: `Authorization: Bearer <token>`
6. Middleware verifica JWT y añade `req.user` al request
7. Controller accede a `req.user.id` sin necesidad de parámetros adicionales

## API Endpoints

### Autenticación (Public)

| Método | Endpoint | Descripción | Body | Status |
|--------|----------|-------------|------|--------|
| POST | `/users/register` | Registrar nuevo usuario | `{email, password}` | 201/400/409 |
| POST | `/users/login` | Login y obtener JWT | `{email, password}` | 200/401 |

### Tareas (Protegidas con JWT)

| Método | Endpoint | Descripción | Auth | Status |
|--------|----------|-------------|------|--------|
| GET | `/tasks` | Obtener todas las tareas | JWT | 200 |
| GET | `/tasks/:id` | Obtener tarea por ID | JWT | 200/404 |
| POST | `/tasks` | Crear nueva tarea | JWT ✓ | 201/400 |
| PUT | `/tasks/:id` | Actualizar tarea | JWT | 200/400/404 |
| DELETE | `/tasks/:id` | Eliminar tarea | JWT | 200/404 |

### Ejemplos de Uso

**Registrar usuario:**
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@mail.com","password":"123456"}'
```
Respuesta esperada:
```json
{
  "id": 1,
  "email": "usuario@mail.com"
}
```

**Login (obtener token):**
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@mail.com","password":"123456"}'
```
Respuesta esperada:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Crear una tarea (con JWT):**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{"title":"Mi primer tarea"}'
```

**Obtener todas las tareas (con JWT):**
```bash
curl http://localhost:3000/tasks \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Actualizar una tarea (con JWT):**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{"title":"Tarea actualizada","completed":true}'
```

**Eliminar una tarea (con JWT):**
```bash
curl -X DELETE http://localhost:3000/tasks/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Base de Datos

### Modelos

**User:**
```prisma
model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  password String
  tasks    Task[]
}
```

**Task:**
```prisma
model Task {
  id        Int     @id @default(autoincrement())
  title     String
  completed Boolean @default(false)
  
  userId Int
  user   User @relation(fields: [userId], references: [id])
}
```

### Relaciones

- Un usuario puede tener múltiples tareas (1:N)
- Cada tarea pertenece a exactamente un usuario
- Las contraseñas se almacenan hasheadas con bcryptjs

## Ejecución Local

```bash
# Instalar dependencias
npm install

# Configurar .env con DATABASE_URL

# Ejecutar migraciones
npx prisma migrate dev

# Iniciar servidor
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Mejoras Implementadas

- [x] Autenticación JWT
- [x] Gestión de usuarios (registro/login)
- [x] Relación Task-User
- [x] Middleware de autenticación
- [x] Validación de datos

## Posibles Mejoras Futuras

- [ ] Autorización por roles (admin, user, etc.)
- [ ] Timestamps (createdAt, updatedAt)
- [ ] Paginación en listados
- [ ] Filtros y búsqueda de tareas
- [ ] Pruebas unitarias e integración (Jest)
- [ ] Documentación OpenAPI/Swagger
- [ ] Rate limiting
- [ ] Validación de datos con Zod/Joi
- [ ] Refresh tokens
- [ ] Recuperación de contraseña por email
- [ ] Cambio de contraseña
- [ ] Soft deletions para tareas

## Códigos de Respuesta HTTP

| Código | Significado | Ejemplo |
|--------|-------------|---------|
| 200 | OK - Operación exitosa | Obtener tarea, actualizar |
| 201 | Created - Recurso creado | Registrar usuario, crear tarea |
| 400 | Bad Request - Datos inválidos | Falta email/password, title requerido |
| 401 | Unauthorized - Sin autenticación | Token ausente, inválido o expirado |
| 404 | Not Found - Recurso no encontrado | Tarea que no existe |
| 409 | Conflict - Email duplicado | Email ya registrado |
| 500 | Server Error - Error interno | Error de base de datos |

## Pruebas en Postman

1. **Crear una colección** con los siguientes requests:

   - **POST /users/register** - Body raw JSON:
     ```json
     {
       "email": "test@mail.com",
       "password": "password123"
     }
     ```

   - **POST /users/login** - Body raw JSON:
     ```json
     {
       "email": "test@mail.com",
       "password": "password123"
     }
     ```
     Copiar el token de la respuesta

   - **POST /tasks** - Header: `Authorization: Bearer {token}` - Body:
     ```json
     {
       "title": "Mi primera tarea"
     }
     ```

   - **GET /tasks** - Header: `Authorization: Bearer {token}`

   - **PUT /tasks/1** - Header: `Authorization: Bearer {token}` - Body:
     ```json
     {
       "title": "Tarea actualizada",
       "completed": true
     }
     ```

   - **DELETE /tasks/1** - Header: `Authorization: Bearer {token}`

## Notas de Desarrollo

- Las contraseñas no se devuelven nunca en las respuestas
- Los tokens JWT expiran en 1 hora
- El middleware de autenticación valida automáticamente el token
- Los errores de Prisma se mapean a códigos HTTP apropiados
- Las migraciones se ejecutan automáticamente con `npx prisma migrate dev`

## Autor

Lorenzo Mello

## Licencia

MIT
