
from django.urls import path, include
from requests_for_pto import views


urlpatterns = [

    #Manager:
    path('', views.view_all_requests),
    path('<int:pk>/', views.approve_or_deny),

    #Employee:
    path('employee/', views.view_all_requests_by_employee),
    path('submit/', views.submit_request),
]