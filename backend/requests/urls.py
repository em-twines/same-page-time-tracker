from django.urls import path, include
from requests import views


urlpatterns = [
    path('', views.view_all_requests),
    path('submit/', views.submit_request),
]
