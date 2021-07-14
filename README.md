# django-angular-boilerplate

## Requirements
- Django==3.2.4
- django-cors-headers==3.7.0
- djangorestframework==3.12.4
- python==3.6.5

## Set up Instructions
1. Clone project
```
git clone https://github.com/tmttan03/online-library.git
```

2. Set up virtual environment (2 ways)
## Using virtualenv
```
virtualenv -p python3 venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```
## Using pyenv
```
pyenv install 3.6.5
pyenv virtualenv 3.6.5 venv
pyenv local venv
pip install --upgrade pip
pip install -r requirements.txt
```

3. Create `core/local.py` to override the existing configurations on settings.py if you want to change the database configuration put the following the local.py you created. Note that adding a different database will require an additional requirement
### MYSQL
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    }
}
```
### POSTGRESQL
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME':  '',
        'USER' : '',
        'PASSWORD' : '',
        'HOST' : '',
        'PORT' : '',
    }
}
```
### Alter the port `8081` to the port your are currently using. This is important since it will be used so the apis could be accessible to frontend
```
CORS_ORIGIN_WHITELIST = (
    'http://localhost:8081',
)
```
4. Migrate the files with
```
$ python manage.py migrate
```

5. Load initial data
```
$ python manage.py loaddata core/fixtures/initial_data.json
```


