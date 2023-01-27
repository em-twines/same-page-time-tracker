from django.urls import path, include
from message import views


urlpatterns = [


    path('', views.viewAllMessagesByRecipient),
]