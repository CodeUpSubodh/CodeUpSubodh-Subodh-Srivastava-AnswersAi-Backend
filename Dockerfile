# Use the official Node.js image from the Docker Hub
FROM node:16

# Set the maintainer label
LABEL maintainer="your-email@example.com"

# Update the package list and install prerequisites
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    build-essential \
    postgresql-client

# Add NodeSource APT repository for Node 16.x
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

# Install Node.js and npm
RUN apt-get install -y nodejs

# Install nodemon globally
RUN npm install -g nodemon

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the application port (change this if your app uses a different port)
EXPOSE 3000

# Command to run the application with nodemon
CMD ["nodemon", "src/app.js"]
