# Use an official Node.js image (matching your version)
FROM node:22.14.0-alpine 

#  Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install 

# Copy all frontend files into the container
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev"]
