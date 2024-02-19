from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="run"),
    path("login", views.login, name="login"),
    path("register", views.register, name="register"),
    path("submissions", views.submissions, name="submissions"),
]