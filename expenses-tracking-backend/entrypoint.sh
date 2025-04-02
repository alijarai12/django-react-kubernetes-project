#!/bin/sh

# Wait for the DB to be available before proceeding
/myapp/wait-for-it.sh db:5432 --timeout=30 --strict -- echo "Postgres is up"

# Apply migrations
python manage.py migrate

# Start server
python manage.py runserver 0.0.0.0:8000