
from django.urls import path, include
from requests_for_pto import views


urlpatterns = [
    path('', views.view_all_requests),
    path('<int:pk>/', views.approve_or_deny),
    # path('submit/', views.submit_request),
]