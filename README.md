
# Generador de Infografías Históricas

Este proyecto es una plataforma web que permite crear, editar y compartir infografías históricas. Incluye funcionalidades de autenticación, sistema de roles, likes, comentarios, publicación y moderación de contenido.

## 🧱 Tecnologías usadas

- **Frontend:** React + Tailwind + Lucide React
- **Backend:** Node.js + Express
- **Base de Datos:** MongoDB (Atlas o Compass)
- **Editor de texto:** Quill.js

## 🚀 Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/Rdrgrvram/GeneradorInfografiasFinal.git
cd GeneradorInfografiasFinal
```

### 2. Instala las dependencias

#### Frontend
```bash
cd frontend-infografias
npm install
```

#### Backend
```bash
cd ../backend-infografias
npm install
```

## 🔐 Configura tu entorno

Crea un archivo `.env` dentro de `backend-infografias/` con el siguiente contenido:

```
PORT=3001
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@clusterinfografias.cdgtczj.mongodb.net/infografiasDB?retryWrites=true&w=majority
SECRET_KEY=mideseosecreto
```

🔸 **Reemplaza `<usuario>` y `<contraseña>` con tus credenciales o usa las proporcionadas por el propietario del cluster.**

## 🧪 Ejecuta el proyecto

### Backend
```bash
cd backend-infografias
npm run dev
```

### Frontend
```bash
cd frontend-infografias
npm run dev
```

## 🌐 Acceso con MongoDB Compass sin cuenta Atlas

1. Abre **MongoDB Compass**
2. Haz clic en **New Connection**
3. Usa el siguiente string de conexión:

```
mongodb+srv://<usuario>:<contraseña>@clusterinfografias.cdgtczj.mongodb.net/infografiasDB?retryWrites=true&w=majority
```

4. Haz clic en **Connect**
5. Una vez conectado, selecciona la base de datos `infografiasDB` para explorar las colecciones.

## ✅ Funcionalidades principales

- Registro e inicio de sesión con roles (admin, editor, invitado)
- Crear, editar, publicar, despublicar infografías
- Comentarios, likes, moderación por administradores
- Compartir y explorar infografías públicas

---

🔧 Proyecto desarrollado para fines educativos.
