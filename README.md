
# Hound Express

## 🧾 Descripción del proyecto
**Hound Express** es un backend en **Node.js + Express** que expone una API REST para un servicio de mensajería/paquetería.  
Incluye endpoints para **autenticación (JWT)**, **gestión de envíos (CRUD)** y **búsqueda/seguimiento** por código.

> Nota: la capa de persistencia es configurable mediante variables de entorno (puedes apuntar a la BD que prefieras). El proyecto está organizado para que puedas sustituir/adaptar el “Data Access Layer” sin tocar las rutas.

---

## 🧰 Tecnologías utilizadas
- **Node.js** + **Express**
- Middlewares: `cors`, `morgan`, `helmet`, `express.json()`
- **JWT** para autenticación
- Variables de entorno con **dotenv**
- (Opcional) Cliente de BD según tu elección vía `DATABASE_URL`

---

## ⚙️ Instrucciones de instalación y uso

### 1) Clonar e instalar
```bash
git clone https://github.com/BenjaminMacias/Hound_Express.git
cd Hound_Express
npm install

Variables de entorno
Crea un archivo .env en la raíz (o ajusta los valores en tu entorno):


# .env
PORT=4000
NODE_ENV=development

# Clave para firmar JWT
JWT_SECRET=super_secret_key_change_me

# (Opcional) URL de base de datos (Mongo, Postgres, MySQL, etc.)
# DATABASE_URL=mongodb://localhost:27017/hound_express
# DATABASE_URL=postgres://user:pass@localhost:5432/hound_express
# DATABASE_URL=mysql://user:pass@localhost:3306/hound_express

Ejecutar en desarrollo

npm run dev
# o
npm start
La API quedará disponible en: http://localhost:4000

🧪 Ejemplos de uso
En todos los endpoints protegidos añade:
Authorization: Bearer <TU_TOKEN_JWT>

Auth
Registro

curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane Doe",
    "email":"jane@example.com",
    "password":"Secret123!"
  }'
Login

curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"jane@example.com",
    "password":"Secret123!"
  }'
# Respuesta: { "token": "..." }
Envíos (Shipments)
Crear envío

curl -X POST http://localhost:4000/api/shipments \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "code":"HX-202401-0001",
    "sender":"Acme Inc.",
    "receiver":"Jane Doe",
    "origin":"CDMX",
    "destination":"GDL",
    "status":"created",
    "weight": 3.2
  }'
Listar envíos (paginado/filters opcionales)

curl "http://localhost:4000/api/shipments?search=GDL&status=created&page=1&limit=20" \
  -H "Authorization: Bearer <TOKEN>"
Obtener por ID

curl http://localhost:4000/api/shipments/64f2c1... \
  -H "Authorization: Bearer <TOKEN>"
Actualizar

curl -X PATCH http://localhost:4000/api/shipments/64f2c1... \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{ "status":"in_transit" }'
Eliminar

curl -X DELETE http://localhost:4000/api/shipments/64f2c1... \
  -H "Authorization: Bearer <TOKEN>"
Tracking
Seguimiento por código público

curl http://localhost:4000/api/tracking/HX-202401-0001
# Respuesta con últimos estatus / checkpoints
Scripts útiles


npm start       # arranque normal
npm run dev     # arranque con nodemon (si está configurado)
npm test        # pruebas (si aplica)















# Hound_Express

API base en **Node.js + Express** enfocada en rapidez de arranque, buenas prácticas y facilidad para extender con más rutas, middlewares y servicios.

---

## 🧾 Descripción del proyecto
Hound_Express es una plantilla/boilerplate para construir **APIs REST** con Express. Proporciona estructura clara, configuración de seguridad básica (CORS/Helmet), logging, variables de entorno con `dotenv`, y scripts para desarrollo/producción. Está pensada para que puedas **crear recursos (CRUD)** y **endpoints** en minutos.

---

## 🧰 Tecnologías utilizadas
- **Node.js** (>= 16)
- **Express**
- **dotenv** (variables de entorno)
- **cors** (CORS)
- **helmet** (cabeceras de seguridad)
- **morgan** (logging HTTP)
- **nodemon** (hot-reload en desarrollo)
- *(opcional en tu repo: eslint/prettier, jest/supertest, etc.)*

---

## ⚙️ Instrucciones de instalación y uso

### 1) Clonar e instalar dependencias
```bash
git clone https://github.com/BenjaminMacias/Hound_Express.git
cd Hound_Express
npm install
# o: pnpm install / yarn

