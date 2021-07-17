# Django Online Library

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
- Using virtualenv
```
virtualenv -p python3 venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```
- Using pyenv
```
pyenv install 3.6.5
pyenv virtualenv 3.6.5 venv
pyenv local venv
pip install --upgrade pip
pip install -r requirements.txt
```

3. Migrate the files with
```
$ python manage.py migrate
```

4. Load initial data
```
$ python manage.py loaddata core/fixtures/initial_data.json
```

5. Run server
```
$ python manage.py runserver
```

6. Build to build frontend assets
```
$ cd <DIRECTORY>/online-library/assets/scripts/fe
$ npm install
$ ng build --watch
```