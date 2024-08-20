# Management App

Este proyecto es una aplicación de gestión construida con Next.js,
Prisma y MySQL. A continuación, se detallan los pasos necesarios para
configurar y ejecutar el proyecto en tu entorno local.

## Requisitos previos

- Node.js v18 o superior - MySQL v8 o superior

## Instalación

1. Clona el repositorio en tu máquina local:

bash git clone https://github.com/tu-usuario/management-app.git 
cd management-app Instala las dependencias del proyecto:

Con npm:

npm install 

Con Yarn:

yarn install 

Crea la base de datos en MySQL:

CREATE DATABASE management_app; 

Ejecuta las migraciones de Prisma para configurar las tablas en la base de datos:

npx prisma migrate dev --name init 

Inicia elservidor de desarrollo:

Con npm:

npm run dev 

Con Yarn:

yarn dev 

Accede a la aplicación en tu navegador en
http://localhost:3000.

Características clave 

1. Internacionalización (i18n) Se implementó la
internacionalización utilizando next-i18next y react-i18next para
manejar múltiples idiomas dentro de la aplicación. Esto se realizo 
a modo de prueba no quedo en la app final.

2. Autenticación con NextAuth El proyecto utiliza next-auth para
gestionar la autenticación de usuarios. Esta librería facilita la
implementación de autenticación segura con soporte para OAuth, JWT, y
proveedores de identidad social.

3. ORM con Prisma Prisma se usó como el ORM para interactuar con la
base de datos MySQL. Esto permite definir modelos de datos y manejar
migraciones de forma sencilla y eficiente. Las consultas a la base de
datos se realizan utilizando el cliente Prisma (@prisma/client).

4. Diseño responsivo Se utilizó TailwindCSS y Bootstrap para el diseño
de la interfaz de usuario, asegurando que la aplicación sea
completamente responsiva y accesible en dispositivos de distintos
tamaños.

5. Generación de documentos y gráficos Gráficos: chart.js y
react-chartjs-2 se emplearon para la generación de gráficos
interactivos. Documentos: html2canvas y jspdf se integraron para
permitir la generación de documentos PDF a partir de vistas HTML.
Desafíos y aprendizajes Durante el desarrollo, enfrenté desafíos
principalmente con:

Internacionalización: Fue la primera vez que implementé la
internacionalización, pero logré configurarla correctamente y probarla.

Next.js 14 y Prisma: Esta fue mi primera experiencia utilizando Next.js
en su versión 14, así como Prisma y sus librerías. Aunque no completé la
integración de correos transaccionales, la experiencia me permitió
aprender mucho sobre estas tecnologías.
