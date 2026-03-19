# Task Management API

API REST para gestion de tareas construida con Node.js.

Actualmente el proyecto esta en una etapa inicial y cuenta con una estructura base para empezar el desarrollo backend.

## Estructura actual

```text
task-management-api/
|- src/
|  |- app.js
|- .env
|- .gitignore
|- LICENSE
|- package.json
|- README.md
```

## Tecnologias base

- Node.js
- npm
- JavaScript (CommonJS)

## Requisitos

- Node.js 18+ recomendado
- npm 9+ recomendado

## Instalacion

```bash
npm install
```

## Scripts disponibles

Por ahora, en [package.json](package.json), solo esta definido el script de prueba por defecto de npm:

```bash
npm test
```

## Configuracion de entorno

El proyecto usa un archivo `.env` para variables de entorno.

Ejemplo minimo sugerido:

```env
PORT=3000
DATABASE_URL=postgresql://usuario:password@localhost:5432/task_management
JWT_SECRET=tu_clave_secreta
```

## Estado del proyecto

- Estructura inicial creada
- Punto de entrada base en `src/app.js`
- Pendiente: configurar servidor HTTP, base de datos, autenticacion y endpoints

## Autor

Lorenzo Mello

## Licencia

MIT
