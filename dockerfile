# Use an official Nginx base image
FROM nginx:alpine

# Copy the built React application into the Nginx web root
COPY build /usr/share/nginx/html

# Expose the HTTP port
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]

