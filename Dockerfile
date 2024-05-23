FROM node:20  
WORKDIR /app  
COPY package*.json ./  
RUN npm i  
COPY . .  
EXPOSE 3456
CMD ["npm", "run", "server"]