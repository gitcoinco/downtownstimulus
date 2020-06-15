FROM python:3
ENV PYTHONUNBUFFERED 1

RUN mkdir /backend
COPY backend/downtownapi/ /backend
COPY scripts/ /scripts

WORKDIR /backend

RUN pip install -r requirements.txt

RUN python3 /downtownapi/manage.py collectstatic