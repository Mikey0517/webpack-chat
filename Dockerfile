# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /webpack-chat

# Copy the current directory contents into the container at /app
ADD . /webpack-chat

# Run product-portal build
RUN yarn config set registry https://registry.npm.taobao.org --global \
  && NODE_ENV=development yarn \
  && yarn run build \
  && rm -rf `ls -a .|egrep -v '(^\.\.?$|dist|configs|server|LICENSE|tsconfig.json|package.json)'` \
  && NODE_ENV=production yarn \
  && yarn cache clean

# Make port 80 available to the world outside this container
EXPOSE 8080

# Define NODE_ENV environment variable
ENV NODE_ENV production
ENV PUBLIC_PATH ${PUBLIC_PATH}

CMD yarn run serve
