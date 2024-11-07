# Chat App con Next.js y Firebase

Una aplicación de chat en tiempo real construida con Next.js, TypeScript, Firebase y Tailwind CSS.

## 🚀 Características

-   🔐 Autenticación con Google
-   💬 Chat en tiempo real
-   🖼️ Soporte para fotos de perfil de Google
-   🎨 Interfaz responsive con Tailwind CSS
-   ⚡ Server-Side Rendering con Next.js
-   📦 Gestión de estado con Zustand

## 🛠️ Tecnologías Utilizadas

-   Next.js 14
-   TypeScript
-   Firebase 10
-   Tailwind CSS
-   Zustand
-   Google Authentication

## 📋 Prerrequisitos

-   Node.js (versión 18 o superior)
-   npm o yarn
-   Una cuenta de Firebase
-   Git

## ⚙️ Configuración

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd chat-app
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura Firebase:

    - Ve a [Firebase Console](https://console.firebase.google.com/)
    - Crea un nuevo proyecto
    - Habilita Authentication con Google
    - Crea una base de datos Firestore
    - Obtén las credenciales de configuración

4. Crea un archivo `.env.local` en la raíz del proyecto con tus credenciales de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id
```

5. Configura las reglas de Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🚀 Ejecutar el Proyecto

Para desarrollo:

```bash
npm run dev
```

Para producción:

```bash
npm run build
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
  ├── app/
  │   ├── login/
  │   │   └── page.tsx    # Página de login
  │   ├── chat/
  │   │   └── page.tsx    # Página principal del chat
  │   ├── layout.tsx      # Layout principal
  │   └── page.tsx        # Página de inicio
  ├── components/
  │   ├── AuthProvider.tsx
  │   └── ChatMessage.tsx
  ├── lib/
  │   └── firebase.ts     # Configuración de Firebase
  ├── store/
  │   └── useAuthStore.ts # Estado global
  └── middleware.ts       # Middleware de autenticación
```

## 🔒 Autenticación

La aplicación utiliza autenticación de Google a través de Firebase. Los usuarios necesitan iniciar sesión para acceder al chat.

## 💬 Funcionalidades del Chat

-   Mensajes en tiempo real
-   Indicador de mensajes propios vs otros
-   Timestamps en los mensajes
-   Fotos de perfil de Google
-   Diseño responsive

## 🖼️ Configuración de Imágenes

El proyecto usa el componente Image de Next.js para optimizar las imágenes. Asegúrate de tener la siguiente configuración en `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "/a/**",
			},
		],
		unoptimized: true,
	},
};

module.exports = nextConfig;
```

## 🔐 Seguridad

-   Las variables de entorno de Firebase están protegidas con el prefijo `NEXT_PUBLIC_`
-   La autenticación es requerida para acceder al chat
-   Las reglas de Firestore están configuradas para permitir solo usuarios autenticados
-   Los tokens de sesión se manejan de forma segura

## 🐛 Solución de Problemas Comunes

1. **Las imágenes de Google no cargan**

    - Verifica que el dominio está configurado en `next.config.js`
    - Asegúrate de usar `referrerPolicy="no-referrer"`

2. **Errores de autenticación**

    - Verifica las credenciales en `.env.local`
    - Asegúrate de que la autenticación de Google esté habilitada en Firebase

3. **Los mensajes no se actualizan en tiempo real**
    - Verifica las reglas de Firestore
    - Comprueba la conexión a Internet

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para sugerencias.

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
