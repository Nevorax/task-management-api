# task-management-api

API REST de gestion de tareas construida con Node.js + Express.

> Estado actual: CRUD de tareas en memoria (sin base de datos, sin autenticacion).

## Caracteristicas actuales

- API HTTP con Express.
- Endpoint de health check en `/`.
- CRUD completo de tareas en `/tasks`.
- Validacion de titulo en `POST /tasks` para evitar tareas sin titulo.
- Middleware de manejo de errores global.
- Arquitectura por capas simple: `routes` -> `controllers` -> `services`.
- Datos almacenados en memoria del proceso (se pierden al reiniciar el servidor).

## Stack

- Node.js (CommonJS)
- Express
- Nodemon (desarrollo)

## Estructura del proyecto

```text
src/
  app.js
  index.js
  routes/
	tasks.routes.js
  controllers/
	tasks.controller.js
  services/
	tasks.service.js
  middlewares/
	error.middleware.js
  config/
	config.js          # placeholder (vacio)
  models/
	models.js          # placeholder (vacio)
```

## Requisitos

- Node.js 18+ recomendado
- npm

## Instalacion

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

El servidor inicia en:

```text
http://localhost:3000
```

## Endpoints

Base URL: `http://localhost:3000`

### GET `/`

Verifica que la API esta activa.

Respuesta esperada:

```text
API funcionando 🚀
```

### GET `/tasks`

Lista todas las tareas.

Respuesta `200` (ejemplo):

```json
[
  {
	"id": 1,
	"title": "Aprender Express",
	"completed": false
  }
]
```

### GET `/tasks/:id`

Obtiene una tarea por ID.

- `200` si existe.
- `404` si no existe:

```json
{ "message": "Task not found" }
```

### POST `/tasks`

Crea una nueva tarea.

Regla actual:

- `title` no puede ser `null` ni vacio.

Body (ejemplo):

```json
{
  "title": "Terminar README"
}
```

Respuesta `201` (ejemplo):

```json
{
  "id": 1,
  "title": "Terminar README",
  "completed": false
}
```

Si se envia un titulo vacio o nulo, devuelve `400`.

Ejemplo de error:

```json
"Tasks cannot have empty title"
```

### PUT `/tasks/:id`

Actualiza una tarea existente.

Body (ejemplo):

```json
{
  "title": "README actualizado",
  "completed": true
}
```

Respuesta `200`: tarea actualizada.

### DELETE `/tasks/:id`

Elimina una tarea por ID.

- `200` si existe (mensaje de confirmacion)
- `404` si no existe

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

## Limitaciones actuales

- No hay autenticacion ni autorizacion.
- No hay persistencia en base de datos.
- No hay paginacion, filtros ni ordenamiento.
- Validaciones parciales en entrada de datos (principalmente en `POST /tasks`).

## Proximos pasos sugeridos

- Integrar variables de entorno (`dotenv`) en configuracion real de puerto/DB.
- Implementar validaciones de `title` y tipos de datos.
- Agregar capa de persistencia (por ejemplo PostgreSQL).
- Incorporar autenticacion (JWT) y aislamiento por usuario.
- Agregar tests (unitarios e integracion).

## Licencia

MIT
