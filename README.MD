# API Time Tracker

Una API completa para el seguimiento del tiempo desarrollada por [@ivanparu](https://github.com/ivanparu), [@augustodoldan](https://github.com/augustodoldan) y [@Manu312](https://github.com/Manu312).

## Tabla de Contenidos

- [Introducción](#introducción)
- [Configuración del Entorno](#configuración-del-entorno)
- [Instalación](#instalación)
- [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
- [Ejecutando la Aplicación](#ejecutando-la-aplicación)
- [Autores](#autores)

## Introducción

Para comenzar con este proyecto, asegúrate de tener Node.js y npm instalados en tu máquina.

## Configuración del Entorno

Antes de comenzar, asegúrate de validar el archivo `.example.env`. Cámbiale el nombre a `.env` y actualiza las variables de entorno necesarias para que se adapten a tu configuración.

## Instalación

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```sh
npm install bcrypt cors dotenv express jsonwebtoken mysql2 nodemailer sequelize
```

## Configuración de la Base de Datos

Antes de comenzar, asegúrate de leer el archivo de 'DBCONFIG.MD' para la bd y las tablas

## Ejecutando la Aplicacion

Para correr en produccion: 

```sh
npm start

```
Para correr en Desarrollo:

```sh
npm run dev
```
## Autores

[@ivanparu](https://github.com/ivanparu), [@augustodoldan](https://github.com/augustodoldan) y [@Manu312](https://github.com/Manu312).