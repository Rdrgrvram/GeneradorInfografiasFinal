# 📚 Generador de Infografías Históricas Automatizadas

Este sistema permite a los usuarios crear, editar y compartir infografías históricas enriquecidas, con funcionalidades sociales y revisión por administradores.

---

## 🛠️ Tecnologías principales

- **Frontend:** React + Tailwind CSS + Quill.js
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB Atlas (Cloud)
- **Autenticación:** JWT (JSON Web Token)

---

## 🚀 Requisitos previos

- Node.js 18 o superior
- Cuenta en MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
- Git

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone git@github.com:Rdrgrvram/GeneradorInfografiasFinal.git
cd GeneradorInfografiasFinal
```

### 2. Configurar el backend

```bash
cd backend-infografias
npm install
```

Crea un archivo `.env` con el siguiente contenido:

```env
PORT=3001
MONGODB_URI=mongodb+srv://<TU_USUARIO>:<TU_PASSWORD>@<TU_CLUSTER>.mongodb.net/infografias?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta
```

> ⚠️ **IMPORTANTE**: Sustituye `<TU_USUARIO>`, `<TU_PASSWORD>` y `<TU_CLUSTER>` por tus datos de MongoDB Atlas.

Inicia el backend:

```bash
npm start
```

### 3. Configurar el frontend

```bash
cd ../frontend-infografias
npm install
npm run dev
```

---

## 🌐 Rutas principales

### Autenticación
- `POST /api/usuarios/registro` - Registro de nuevos usuarios
- `POST /api/usuarios/login` - Inicio de sesión

### Infografías
- `POST /api/infografias` - Crear infografía
- `GET /api/infografias/publicas` - Ver todas las públicas
- `PATCH /api/infografias/like/:id` - Dar/Quitar like

### Comentarios
- `POST /api/comentarios` - Comentar una infografía
- `GET /api/comentarios/:infografiaId` - Ver comentarios por infografía

---

## 🧪 Funcionalidades destacadas

- Creación visual de infografías con editor enriquecido
- Likes y comentarios en tiempo real
- Roles: Administrador, Editor e Invitado
- Exportación de infografías a PDF
- Revisión y feedback del administrador
- Compartir públicamente y por redes sociales

---

## 🧩 Estructura del proyecto

```
GeneradorInfografiasFinal/
│
├── backend-infografias/      → API REST (Node.js + Express)
├── frontend-infografias/     → Interfaz Web (React + TailwindCSS)
└── README.md                 → Documentación general
```

---

## 🧠 Contribuciones

¡Contribuciones son bienvenidas! Por favor:

1. Haz un fork del proyecto.
2. Crea una rama (`git checkout -b mejora-feature`).
3. Haz commit de tus cambios (`git commit -am 'Mejora X'`).
4. Haz push a tu rama (`git push origin mejora-feature`).
5. Abre un Pull Request.

---

## 🛡️ Seguridad

No compartas tu `MONGODB_URI` públicamente. Usa variables de entorno y `.gitignore` para proteger credenciales.

---

## 📩 Contacto

Proyecto desarrollado por Rodrigo Rivera  
✉️ rodrigo.rivera@ucb.edu.bo
