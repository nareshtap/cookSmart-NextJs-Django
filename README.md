# cookSmart Application

## Backend Setup

The first step is to clone the repository:

```bash
$ git clone https://github.com/nareshtap/cookSmart-NextJs-Django.git
$ cd cookSmart-NextJs-Django
```

Create a virtual environment to install dependencies in and activate it:

```bash
$ virtualenv2 --no-site-packages env
$ source env/bin/activate
```


Then install the dependencies:

```bash
(env)$ pip install -r requirements.txt
```

Note the (env) in front of the prompt. This indicates that this terminal session operates in a virtual environment set up by virtualenv2.

Once pip has finished downloading the dependencies:

```bash
(env)$ cd backend
(env)$ python manage.py runserver
```

And navigate to ```http://127.0.0.1:8000/```.

## Frontend Setup

navigate to the frontend folder and install the dependencies:

```bash
$ cd frontend
$ npm install
```
then run the server for frontend:

```bash 
$ npm run dev
```
and navigate to ``` http://127.0.0.1:3000/home ```.

## Images

### Login / Sign Up page:
![login page.](https://res.cloudinary.com/dzdsvt79u/image/upload/v1727784527/signup_ca8vfq.png "This is a sample image.") 

### Home page:
![Home page.](https://res.cloudinary.com/dzdsvt79u/image/upload/v1727785839/home-min_w72zca.png)

![Search page.](https://res.cloudinary.com/dzdsvt79u/image/upload/v1727785019/search_j3vhlu.png "This is a sample image.") 

### Recipe Posting page:
![Recipe Post page.](https://res.cloudinary.com/dzdsvt79u/image/upload/v1727784767/addRecipePage_kuwaa4.png "This is a sample image.")

### Recipe Details page:
![Recipe Details page.](https://res.cloudinary.com/dzdsvt79u/image/upload/v1728023844/newDetailsPage_qtqunw.png "This is a sample image.")

### User Profile page:
![User profile page.](https://res.cloudinary.com/dzdsvt79u/image/upload/v1727784563/userProfile_lphwq4.png "This is a sample image.")



