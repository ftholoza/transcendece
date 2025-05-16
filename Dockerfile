# Use Node.js 22.14 as the base image
FROM node:22.14

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency files first
RUN apt update
RUN apt install sqlite3

COPY package*.json ./
COPY tsconfig.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY .env ./

# Install all dependencies
RUN npm install
RUN npm install @fastify/multipart

# Now copy the rest of the application cod
RUN mkdir /usr/src/app/database
COPY backend/ ./backend
COPY frontend/ ./frontend
COPY database/mydata.db /usr/src/app/database

# Build the TypeScript code
RUN npm run build

# Expose app port
EXPOSE 3000


# Start the app
CMD ["npm", "start"]
