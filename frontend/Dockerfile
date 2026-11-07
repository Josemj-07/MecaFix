# Development image used by server/docker-compose.yml (service "frontend", port 5173).
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .

# The browser calls the API through the host port published by the backend service.
ENV VITE_APP_API_URL=http://localhost:8080
ENV VITE_APP_ENABLE_API_MOCKING=false

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
