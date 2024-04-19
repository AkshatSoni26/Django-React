`this ide is currently run only python code.`


# Python IDE 
In this project we have a main two folders,
1.) backend
2.) frontend

### backend

before start you need to first goto bakend folder and make the pyhton virtual envirment by running this code.
```
python -m venv venv
```

after then you need to activate this command.
```
.\venv\Scripts\activate
```

then you need to install all the dependencies. for this you need to run this command.
```
pip install -r requirements.txt
```

after then you need to run some migration. beacuse we use database here so we need to make the tables for that. so for that you need to first run this command.
```
```

after then you need to start the your server by running this command.
```
python manage.py runserver
```

this will start over server.

## brief of the backend.
backend of this project is based on Django framwrok.
In this we have one app called ***server*** in which, we have the one file `views.py`
which holds all the functionality of the server.

In this we have some routes, on which when we called them it return some response in the term of `JSON formate` (in short API).

##### Register
our first route is ``register `` for registe (for authenticate), in this it requires two perameters,
1.) username
2.) password

it check first into our database that it doesn't hold any username of same which is provided and if not have then it make the entry and give response accroding to it.


##### login
our second is ``login `` for login (for authenticate), in this it requires two perameters,
1.) username
2.) password

it check this into our database and give response accroding to it.


##### Index/Home
In this method we take the code, which run, input if any. And id for user authentication.
it run the code and return the response of the code.


##### submissions
In this it take only one param user_id which authenticate and return the all the submission which user do previously.



### frontend
frontend of this project is based on React.
for using this first we need to login if you registerd and if you no registerd it automatically redirect you to register page and do register for this.

in this we have only three routes.

##### Login
this is rounte where we login.

##### Register
this is route where we register our new user.


##### Home 
this is route where we can write our code and run.