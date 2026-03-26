# task-management-api

API REST de gestión de tareas construida con Node.js + Express + PostgreSQL + Prisma ORM.

> Estado actual: CRUD de tareas con base de datos PostgreSQL persistente.

## Características

- API HTTP con Express.js
- Base de datos PostgreSQL con Prisma ORM
- CRUD completo de tareas con persistencia
- Validación de datos en capas
- Middleware de manejo de errores global
- Arquitectura por capas: `routes` -> `controllers` -> `services` -> `Prisma`
- Configuración de conexión a BD mediante variables de entorno

## Stack Tecnológico

- **Runtime:** Node.js 20.19+ (CommonJS)
- **Framework:** Express.js v5.2.1
- **Base de Datos:** PostgreSQL
- **ORM:** Prisma v7.5.0
- **Adaptador:** Prisma Adapter for PostgreSQL
- **Cliente PostgreSQL:** pg v8.20.0
- **Desarrollo:** Nodemon v3.1.14
- **CORS:** cors v2.8.6
- **Variables de Entorno:** dotenv

## Estructura del Proyecto

```text
task-management-api/
├── prisma/
│   ├── schema.prisma        # Esquema de BD de Prisma
│   └── migrations/          # Historial de migraciones
├── src/
│   ├── config/
│   │   ├── config.js        # Configuración de la aplicación
│   │   └── prisma.js        # Inicialización del cliente Prisma
│   ├── controllers/
│   │   └── tasks.controller.js
│   ├── services/
│   │   └── tasks.service.js
│   ├── routes/
│   │   └── tasks.routes.js
│   ├── middlewares/
│   │   └── error.middleware.js
│   ├── app.js               # Configuración de Express
│   └── index.js             # Punto de entrada
├── .env.example             # Variables de entorno (ejemplo)
├── .gitignore
├── package.json
├── prisma.config.ts         # Configuración de Prisma v7
└── README.md
```

## Requisitos Previos

- **Node.js:** 20.19+, 22.12+, o 24.0+ (requerido por Prisma v7)
- **npm:** v10.8.0 o superior
- **PostgreSQL:** Base de datos configurada y accesible

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Nevorax/task-management-api.git
cd task-management-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita `.env` y configura la conexión a PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/task_management"
```

### 4. Ejecutar migraciones de BD

```bash
npx prisma migrate dev --name init
```

Esto creará las tablas en la BD según el esquema definido en `prisma/schema.prisma`.

### 5. Generar cliente Prisma

```bash
npx prisma generate
```

## Ejecutar en Desarrollo

```bash
npm run dev
```

El servidor inicia en: `http://localhost:3000`

## Endpoints de la API

Base URL: `http://localhost:3000`

### 1. Health Check

**GET** `/`

Verifica que la API está activa.

**Respuesta 200:**
```text
API funcionando 🚀
```

---

### 2. Listar todas las tareas

**GET** `/tasks`

Obtiene todas las tareas registradas en la BD.

**Respuesta 200:**
```json
[
  {
    "id": 1,
    "title": "Aprender Express",
    "completed": false
  },
  {
    "id": 2,
    "title": "Aprender Prisma",
    "completed": true
  }
]
```

---

### 3. Obtener una tarea por ID

**GET** `/tasks/:id`

Obtiene los detalles de una tarea específica.

**Ejemplo de solicitud:**
```
GET /tasks/1
```

**Respuesta 200:**
```json
{
  "id": 1,
  "title": "Aprender Express",
  "completed": false
}
```

**Respuesta 404 (tarea no encontrada):**
```json
{
  "message": "Task not found"
}
```

---

### 4. Crear una nueva tarea

**POST** `/tasks`

Crea una nueva tarea en la BD.

**Body (ejemplo):**
```json
{
  "title": "Completar proyecto"
}
```

**Respuesta 201 (creada):**
```json
{
  "id": 3,
  "title": "Completar proyecto",
  "completed": false
}
```

**Respuesta 400 (título vacío o inválido):**
```json
{
  "message": "Title is required"
}
```

---

### 5. Actualizar una tarea

**PUT** `/tasks/:id`

Actualiza el título y/o estado de completado de una tarea existente.

**Body (ejemplo):**
```json
{
  "title": "Proyecto completado",
  "completed": true
}
```

**Respuesta 200:**
```json
{
  "id": 1,
  "title": "Proyecto completado",
  "completed": true
}
```

**Respuesta 404 (tarea no encontrada):**
```json
{
  "message": "Task not found"
}
```

---

### 6. Eliminar una tarea

**DELETE** `/tasks/:id`

Elimina permanentemente una tarea de la BD.

**Ejemplo de solicitud:**
```
DELETE /tasks/1
```

**Respuesta 200:**
```json
{
  "message": "Task with ID 1 has been deleted"
}
```

**Respuesta 404 (tarea no encontrada):**
```json
{
  "message": "Task not found"
}
```

---

## Manejo de Errores

La API cuenta con un middleware global de errores que captura excepciones y devuelve respuestas consistentes:

- **400 Bad Request:** Validación fallida o parámetros inválidos
- **404 Not Found:** Recurso no encontrado en BD
- **500 Internal Server Error:** Error del servidor

## Desarrollo

### Comandos útiles

```bash
# Iniciar en modo desarrollo con nodemon
npm run dev

# Generar cliente Prisma (después de cambios en schema.prisma)
npx prisma generate

# Crear nueva migración de BD
npx prisma migrate dev --name nombre_de_migracion

# Ver interfaz visual de BD (Prisma Studio)
npx prisma studio

# Verificar estado de la BD
npx prisma migrate status
```

## Variables de Entorno

Crea un archivo `.env` con las siguientes variables:

```env
# PostgreSQL
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/task_management"

# Express (opcional)
PORT=3000
NODE_ENV=development
```

## Notas de Desarrollo

- La API utiliza Prisma ORM para abstraer las operaciones con BD
- Las migraciones se almacenan en `prisma/migrations/`
- El esquema de BD está definido en `prisma/schema.prisma`
- Cambios en el esquema requieren ejecutar `npx prisma migrate dev`
- El cliente Prisma se auto-genera en `src/generated/prisma/`

Ejemplo `200`:

```json
"Task 1 deleted successfully"
```

## Ejemplos rapidos con curl

```bash
# Health check
curl http://localhost:3000/

# Crear tarea
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi primera tarea"}'

# Listar tareas
curl http://localhost:3000/tasks

# Actualizar tarea
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Eliminar tarea
curl -X DELETE http://localhost:3000/tasks/1
```

## Scripts disponibles

- `npm run dev`: inicia el servidor con `nodemon` usando `src/index.js`.

## Próximas Mejoras Planeadas

- ✅ Integración con PostgreSQL y Prisma ORM
- ⏳ Autenticación (JWT) e identificación de usuario
- ⏳ Autorización basada en roles
- ⏳ Paginación y filtros de búsqueda
- ⏳ Tests unitarios e integración
- ⏳ Documentación OpenAPI/Swagger
- ⏳ Validación avanzada con schemas
- ⏳ Rate limiting

## Solución de Problemas

### Error: "Prisma only supports Node.js versions 20.19+, 22.12+, 24.0+"

Debes actualizar Node.js a una versión compatible. Descarga desde [nodejs.org](https://nodejs.org).

### Error: "Cannot find module @prisma/client"

```bash
npx prisma generate
npm install
```

### Error de conexión a PostgreSQL

Verifica que PostgreSQL está corriendo y que las credenciales en `.env` son correctas.

## Licencia

MIT - Ver [LICENSE](LICENSE)

## Autor

**Sebastian Neves** - [@Nevorax](https://github.com/Nevorax)
