# downtownstimulus

Repo for downtown stimulus

## Deploy Instructions 

1. Export .env file to enviroment and fill up suitable environment variables

```
cp .env.test .env
```

2. Build Images and Stand up containers

```
docker-compose up --build
```

Note - If images are already present ```docker-compose up```

The Project is now up and running - 

Backend API - http://127.0.0.1:8000
Frontend - http://localhost:3000

3. Create a New superuser for Backend API

```docker exec -t downtownstimulus_api_1 downtownapi/manage.py createsuperuser```
