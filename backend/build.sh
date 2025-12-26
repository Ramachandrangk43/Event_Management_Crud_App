#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python setup_db.py
python manage.py collectstatic --noinput