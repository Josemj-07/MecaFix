# MecaFix

MecaFix is a comprehensive management system for an automotive workshop.

## Requisitos previos

- Docker
- Docker Compose

## Quick Start (Cómo levantar el proyecto)

Toda la aplicación (Frontend, Backend, y Base de Datos) está orquestada con Docker Compose. Para levantar el proyecto, sigue estos pasos:

1. Clona el repositorio y ve al directorio base.
2. Ve a la carpeta `server` y ejecuta el comando de Docker Compose:
   ```bash
   cd server
   sudo docker compose up -d --build
   ```
   *Nota: La base de datos `mecafix` y sus tablas serán creadas automáticamente la primera vez que se levantan los contenedores gracias al script de inicialización.*
   
3. Accede a los servicios:
   - **Frontend:** http://localhost:5173
   - **Backend API:** http://localhost:8080
   - **Base de Datos (PostgreSQL):** puerto `5432`

## Autenticación Inicial
El script de base de datos incluye un usuario administrador por defecto:
- **Email:** `admin@example.com`
- **Contraseña:** `123`
- **Rol:** `OWNER`

## APIs y Postman
Hemos incluido una colección exhaustiva de Postman en la raíz del proyecto llamada `MecaFix_Postman_Collection.json`. Solo importa este archivo en Postman para probar todos los endpoints y controladores de la aplicación de manera progresiva.
