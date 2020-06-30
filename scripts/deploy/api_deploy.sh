python /backend/downtownapi/manage.py makemigrations
python /backend/downtownapi/manage.py migrate
python /backend/downtownapi/manage.py collectstatic --noinput
gunicorn --workers=3 downtownapi.wsgi:application --bind 0.0.0.0:8000
