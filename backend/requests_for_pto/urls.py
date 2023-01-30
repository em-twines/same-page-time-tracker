
from django.urls import path, include
from requests_for_pto import views


urlpatterns = [

    #Manager:
    path('manager/', views.view_all_requests),
    path('manager/staff/', views.returnAllEmployees),
    path('staff/<int:pk>/', views.returnEmployeeByID),
    path('staff/pto/<int:pk>/', views.affectPTO),
    path('staff/pto-set/<int:pk>/', views.setPTO),
    path('manager/staff/manage/add/', views.addEmployee),
    path('manager/staff/manage/<int:pk>/', views.makeManager),
    path('manager/staff/manage/tenure/<int:pk>/', views.adjustTenure),
    path('manager/staff/manage/state/<int:pk>/', views.adjustState),
    path('manager/settings/hours/', views.getHourTiers),
    path('manager/settings/frequencies/', views.getFrequencyTiers),
    path('manager/settings/hours/update/<int:pk>/', views.setHours),
    path('manager/settings/frequencies/update/<int:pk>/', views.setFrequency),
    path('manager/<int:pk>/', views.approve_or_deny),



    #Employee:
    path('employee/', views.view_all_requests_by_employee),
    path('submit/', views.submit_request),
    path('submit/<int:pk>', views.modify_request),
    # path('employee/purchase/<int:pk>/', views.getUserJoinedDate),
]