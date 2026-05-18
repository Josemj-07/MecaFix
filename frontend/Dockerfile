FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose port and run the dev server binding to 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
