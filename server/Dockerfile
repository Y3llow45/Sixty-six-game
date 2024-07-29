FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5242;
ENV ATLASURI=${ATLASURI}
ENV saltRounds=${saltRounds}
ENV SSKEY=${SSKEY}

EXPOSE 5242

CMD [ "npm", "start" ]