FROM node

RUN mkdir /frontend
COPY frontend/ /frontend
COPY scripts/ /scripts

WORKDIR /frontend

EXPOSE 3000

RUN yarn