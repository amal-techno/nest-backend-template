FROM node:lts

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY . .
# Install app dependencies
RUN npm install -g pnpm

# Install project dependencies
RUN pnpm install --frozen-lockfile

EXPOSE 3000


CMD ["pnpm", "start:dev"]