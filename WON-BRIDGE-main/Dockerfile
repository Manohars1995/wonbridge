# Use official Node.js image as base
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Install dependencies required by Vite and Emotion
# COPY only package files first for better caching
COPY package*.json ./


# Clean previous installs and install dependencies with --force
RUN rm -rf node_modules package-lock.json && \
    npm install --force && \
    npm install @mui/material @emotion/react @emotion/styled --force


COPY . .


# --- DEBUGGING STEP ---
# List all files and folders recursively to see what was copied.
RUN ls -laR


RUN npm run build

EXPOSE 5177


# Start the app
# Start the app using npm start
CMD ["npm", "start"]
