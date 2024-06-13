API Time Tracker
Una API completa para el seguimiento del tiempo desarrollada por @ivanparu, @augustodoldan y @Manu312.

Tabla de Contenidos
Introducción
Configuración del Entorno
Instalación
Configuración de la Base de Datos
Ejecutando la Aplicación
Autores
Introducción
Para comenzar con este proyecto, asegúrate de tener Node.js y npm instalados en tu máquina.

Configuración del Entorno
Antes de comenzar, asegúrate de validar el archivo .example.env. Cámbiale el nombre a .env y actualiza las variables de entorno necesarias para que se adapten a tu configuración.

Instalación
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

sh
Copiar código
npm install bcrypt cors dotenv express jsonwebtoken mysql mysql2 nodemailer sequelize
Configuración de la Base de Datos
Consulta los comentarios en el archivo DBCONFIG.MD para obtener instrucciones detalladas sobre cómo configurar la conexión a tu base de datos.

Ejecutando la Aplicación
Producción
Para iniciar la aplicación en modo producción, usa:

sh
Copiar código
npm start
Desarrollo
Para iniciar la aplicación en modo desarrollo, usa:

sh
Copiar código
npm run dev
Autores
@ivanparu
@augustodoldan
@Manu312
