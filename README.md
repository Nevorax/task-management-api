# Task Management API

API REST para gestion de tareas construida con Node.js y Express.

Actualmente el proyecto esta en una etapa inicial, con estructura base y primeros endpoints de prueba.

## Estructura actual

```text
task-management-api/
|- src/
|  |- app.js
|  |- index.js
|  |- config/
|  |- controllers/
|  |- middleware/
|  |- models/
|  |- routes/
|  |  |- tasks.routes.js
|  |- services/
|- .env
|- .gitignore
|- LICENSE
|- package-lock.json
|- package.json
|- README.md
```

## Tecnologias base

- Node.js
- npm
- Express
- JavaScript (CommonJS)

## Requisitos

- Node.js 18+ recomendado
- npm 9+ recomendado

## Instalacion

```bash
npm install
```

## Scripts disponibles

En [package.json](package.json) estan definidos:

```bash
npm run dev
npm test
```

- npm run dev: inicia el servidor con nodemon desde src/index.js
- npm test: script placeholder por defecto

## Ejecucion local

```bash
npm run dev
```

Servidor local:

```text
http://localhost:3000
```

## Endpoints iniciales

- GET / -> responde "API funcionando correctamente"
- GET /tasks -> responde un JSON de prueba con mensaje "Lista de tareas"

## Configuracion de entorno

El proyecto incluye archivo .env. De momento el arranque usa PORT fijo en codigo (3000), pero puedes dejar preparada esta base:

```env
PORT=3000
DATABASE_URL=postgresql://usuario:password@localhost:5432/task_management
JWT_SECRET=tu_clave_secreta
```

## Estado del proyecto

- Estructura inicial creada
- Servidor Express configurado
- Ruta base y ruta de tareas de prueba activas
- Pendiente: conectar PostgreSQL, modularizar capas y agregar autenticacion

## Autor

Lorenzo Mello

## Licencia

MIT
