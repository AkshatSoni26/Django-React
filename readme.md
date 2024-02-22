`this ide is currently run only python code.`
[link of the site](https://main.d1o9dxmeh88ojh.amplifyapp.com/)

for using this you first allow to `Insecure content` .
for this goto `site settings -> Insecure content -> allow`


# Python IDE 
In this project we have a main two folders,
1.) backend
2.) frontend

### backend
backend of this project is based on Django framwrok.
In this we have one app called ***server*** in which, we have the one file `views.py`
which holds all the functionality of the server.

In this we have some routes, on which when we called them it return some response in the term of `JSON` (in short API).

##### Register
our first route is ``register `` for registe (for authenticate), in this it requires two perameters,
1.) username
2.) password

it check first into our database that it doesn't hold any username of same which is provided and if not have then it make the entry and give response accroding to it.

api for this is `http://13.51.161.12/server/login`

##### login
our second is ``login `` for login (for authenticate), in this it requires two perameters,
1.) username
2.) password

it check this into our database and give response accroding to it.
api for this is `http://13.51.161.12/server/register`


##### Index/Home
In this method we take the code, which run, input if any. And id for user authentication.
it run the code and return the response of the code.

Api of this is `http://13.51.161.12/server/`

##### submissions
In this it take only one param user_id which authenticate and return the all the submission which user do previously.

Api for this is `http://13.51.161.12/server/submissions`


### frontend
frontend of this project is based on React.
for using this first we need to login if you registerd and if you no registerd it automatically redirect you to register page and do register for this.

in this we have only three routes.
##### Home 
this is route where we can write our code and run.
path of this is `https://main.d1o9dxmeh88ojh.amplifyapp.com/`