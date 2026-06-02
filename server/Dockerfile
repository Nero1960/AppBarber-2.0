FROM node:20-alpine

# Carpeta de trabajo
WORKDIR /app

# Copiamos los archivos de configuración de dependencias (usando npm)
COPY package*.json ./

# Instalamos todas las dependencias para poder compilar
RUN npm install

# Copiamos todo el resto de tu código fuente al contenedor
COPY . .

# Compilamos el proyecto (genera la carpeta /dist ejecutando tsc --build)
RUN npm run build

# Exponemos el puerto de tu API
EXPOSE 4000

# Arrancamos usando el comando "start" que añadimos a tu package.json
CMD ["npm", "start"]