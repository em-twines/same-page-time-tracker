from rest_framework import serializers
from .models import Request, Employee_Request, Manager_Employee


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ['id', 'request_text', 'day', 'hours_requested', 'decision', 'is_pending']
    

class Employee_Request_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Employee_Request
        fields = ['id', 'user_id', 'request_id']
        depth = 1


class Manager_Employee_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Manager_Employee
        fields = ['id', 'user_id', 'user_id']
        depth = 1







from django.urls import path, include
from requests_for_pto import views


urlpatterns = [
    path('', views.view_all_requests),
    path('submit/', views.submit_request),
]


from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Request, Employee_Request, Manager_Employee, User
from .serializers import RequestSerializer, Employee_Request_Serializer, Manager_Employee_Serializer

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


#view all requests.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_all_requests(request):
    requests = Request.objects.all()
    serializer = RequestSerializer(requests, many=True)
    return Response(serializer.data)

#Submit request
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_request(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    serializer = RequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


