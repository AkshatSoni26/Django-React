from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="run"),
    # path("/run", views.run, name="run"),
]