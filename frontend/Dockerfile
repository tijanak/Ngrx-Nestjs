# Stage 1: Build the Angular app
FROM node:lts-alpine AS build

# Set environment variables
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Angular project files
COPY . .

# Build the Angular app
RUN npm run build -- --prod

# Stage 2: Serve the Angular app
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove the default nginx index.html
RUN rm -rf ./*

# Copy the built Angular app from the build stage
COPY --from=build /app/dist/frontend .

# Expose port 80 for nginx
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]