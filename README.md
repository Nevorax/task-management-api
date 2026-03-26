# Task Management API

API REST para gestión de tareas construida con Node.js, Express y Prisma ORM, conectada a PostgreSQL.

## Descripción

API robusta para crear, leer, actualizar y eliminar tareas con persistencia en base de datos, manejo automático de errores y validación de datos.

## Tech Stack

- **Node.js** 18+ (runtime)
- **Express** 5.x (framework web)
- **Prisma** 6.x (ORM)
- **PostgreSQL** (base de datos)
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
```

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
├── app.js                 # Configuración de Express
├── index.js              # Punto de entrada
├── config/
│   └── prisma.js         # Instancia de PrismaClient
├── controllers/
│   └── tasks.controller.js # Controladores de tareas
├── middleware/
│   ├── asyncHandler.js   # Wrapper para async/await
│   └── errorHandler.js   # Manejo global de errores
├── routes/
│   └── tasks.routes.js   # Rutas de tareas
└── services/
    └── tasks.services.js # Lógica de negocio y Prisma
prisma/
├── schema.prisma         # Definición de modelos
└── migrations/           # Historial de cambios de BD
```

## Arquitectura

La aplicación sigue una arquitectura en capas:

1. **Controllers** → Maneja peticiones HTTP
2. **Services** → Contiene lógica de negocio y acceso a datos (Prisma)
3. **Middleware** → `asyncHandler` y `errorHandler` para gestión centralizada de errores
4. **Routes** → Define endpoints

### Manejo de Errores

- **asyncHandler**: Captura automáticamente errores en funciones async
- **errorHandler**: Middleware global que formatea respuestas de error con status HTTP apropiados
- **Validación en servicio**: Try-catch con manejo especifico de errores de Prisma (P2025 = registro no encontrado)

## API Endpoints

### Tasks

| Método | Endpoint | Descripción | Status |
|--------|----------|-------------|--------|
| GET | `/tasks` | Obtener todas las tareas | 200 |
| GET | `/tasks/:id` | Obtener tarea por ID | 200/404 |
| POST | `/tasks` | Crear nueva tarea | 201/400 |
| PUT | `/tasks/:id` | Actualizar tarea | 200/400/404 |
| DELETE | `/tasks/:id` | Eliminar tarea | 200/404 |

### Ejemplos de Uso

**Obtener todas las tareas:**
```bash
curl http://localhost:3000/tasks
```

**Crear una tarea:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi tarea"}'
```

**Actualizar una tarea:**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Tarea actualizada","completed":true}'
```

**Eliminar una tarea:**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## Base de Datos

### Modelo Task

```prisma
model Task {
  id        Int     @id @default(autoincrement())
  title     String
  completed Boolean @default(false)
}
```

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

## Posibles Mejoras Futuras

- [ ] Autenticación (JWT)
- [ ] Timestamps (createdAt, updatedAt)
- [ ] Paginación en listados
- [ ] Filtros y búsqueda
- [ ] Pruebas unitarias e integración
- [ ] Documentación OpenAPI/Swagger
- [ ] Rate limiting
- [ ] Validación de datos con Zod/Joi

## Autor

Lorenzo Mello

## Licencia

MIT
