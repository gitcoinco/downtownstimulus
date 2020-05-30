FROM python:3
ENV PYTHONUNBUFFERED 1

RUN mkdir /backend
COPY backend/downtownapi/ /backend

WORKDIR /backend
EXPOSE 8000

RUN pip install -r requirements.txt
