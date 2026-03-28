# task-management-api

API REST para gestion de tareas con autenticacion JWT, Node.js, Express, PostgreSQL y Prisma.

## Estado actual

- CRUD de tareas persistido en PostgreSQL.
- Registro y login de usuarios.
- `POST /tasks` protegido con token JWT.
- Prisma v7 configurado con `prisma.config.ts`.

## Stack

- Node.js `20.19+`, `22.12+` o `24+`
- Express `5.2.1`
- Prisma `7.6.0` + `@prisma/client 7.6.0`
- PostgreSQL + `pg`
- JWT con `jsonwebtoken`
- Hash de passwords con `bcrypt`
- Entorno con `dotenv`

## Estructura del proyecto

```text
task-management-api/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app.js
│   ├── index.js
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   │   ├── tasks.controller.js
│   │   └── users.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── routes/
│   │   ├── tasks.routes.js
│   │   └── users.routes.js
│   └── services/
│       ├── tasks.service.js
│       └── users.service.js
├── prisma.config.ts
├── .env.example
├── package.json
└── README.md
```

## Requisitos

- Node.js compatible con Prisma 7 (`20.19+`, `22.12+`, `24+`).
- PostgreSQL corriendo local o remoto.
- Base de datos creada (ejemplo: `tasksdb`).

## Instalacion

1. Clonar e instalar dependencias:

```bash
git clone https://github.com/Nevorax/task-management-api.git
cd task-management-api
npm install
```

2. Crear el archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env
```

En Windows PowerShell, si no tienes `cp`:

```powershell
Copy-Item .env.example .env
```

3. Configurar `DATABASE_URL` en `.env`:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/tasksdb"
```

4. Ejecutar migraciones y generar cliente Prisma:

```bash
npx prisma migrate dev
npx prisma generate
```

5. Iniciar el servidor en desarrollo:

```bash
npm run dev
```

Servidor por defecto: `http://localhost:3000`

## Prisma 7: nota importante

Con Prisma 7, la URL de conexion de datasource se define en `prisma.config.ts`, no en `prisma/schema.prisma`.

El proyecto ya esta configurado asi:

- `prisma.config.ts` lee `DATABASE_URL` con `env("DATABASE_URL")`.
- `prisma/schema.prisma` mantiene `datasource db { provider = "postgresql" }` sin `url`.

## Modelo de datos

### `User`

- `id` (Int, autoincremental)
- `email` (String, unico)
- `password` (String, hash)

### `Task`

- `id` (Int, autoincremental)
- `title` (String)
- `completed` (Boolean, default `false`)
- `userId` (Int, requerido)

Relacion: un `User` tiene muchas `Task`.

## Endpoints

Base URL: `http://localhost:3000`

### Health

- `GET /`

Respuesta:

```text
API funcionando
```

### Usuarios

- `POST /users/auth/register`
- `POST /users/auth/login`

#### Registro - ejemplo body

```json
{
  "email": "user@mail.com",
  "password": "123456"
}
```

#### Login - ejemplo body

```json
{
  "email": "user@mail.com",
  "password": "123456"
}
```

Respuesta esperada:

```json
{
  "token": "<jwt_token>"
}
```

### Tareas

- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks` (requiere token)
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

#### Header para rutas protegidas

Se recomienda este formato:

```http
Authorization: Bearer <token>
```

Tambien se acepta token crudo en `Authorization` por compatibilidad.

#### Crear tarea - ejemplo

```json
{
  "title": "Terminar README"
}
```

## Errores comunes

### Prisma y version de Node

Si aparece error de version de Node con Prisma, instala una version compatible (`20.19+`, `22.12+` o `24+`).

### `@prisma/client did not initialize yet`

Ejecuta:

```bash
npx prisma generate
```

### `Cannot find module ...`

Ejecuta:

```bash
npm install
```

## Scripts

- `npm run dev`: inicia la API con nodemon.

## Variables de entorno

`.env` minimo requerido:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/tasksdb"
```

## Licencia

MIT. Ver `LICENSE`.
