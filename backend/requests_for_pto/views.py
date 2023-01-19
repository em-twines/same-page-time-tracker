

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Request, Employee_Request, Manager_Employee, User
from .serializers import RequestSerializer, Employee_Request_Serializer, Manager_Employee_Serializer
from django.shortcuts import get_object_or_404
# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


#Manager

#view all requests
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_all_requests(request):
    requests_for_pto = Request.objects.all()
    serializer = RequestSerializer(requests_for_pto, many=True)
    return Response(serializer.data)


#Approve requests
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def approve_or_deny(request, pk):

    request_for_pto = get_object_or_404(Request, pk = pk)
    request.data['is_pending'] = False
    serializer = RequestSerializer(request_for_pto, data = request.data, partial = True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status.HTTP_200_OK)



#Employee

#view all their own requests
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_all_requests_by_employee(request):
    
    #get all times one employee has posted a request
    all_requests_by_user = Employee_Request.objects.filter(user_id = request.user.id)
    all_requests_objects = all_requests_by_user.values()
    all_requests_count = all_requests_objects.count()

    # #get array of all corresponding request id's
    requests_array = []
    requests_array_values = []
    #requests_array = list of request id's
    requests_array = [item['id'] for item in all_requests_objects]
    print(requests_array)

    i = 0
    request_objects = []
    while i < len(requests_array):
        request_objects += Request.objects.filter(id = requests_array[i])
        i += 1
        
    # print all requests associated with those id's
    serializer = RequestSerializer(request_objects, many=True)
    print(serializer.data)
    return Response(serializer.data, status=status.HTTP_200_OK)



#Submit request
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_request(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    serializer = RequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        Employee_Request.objects.create(user=request.user, request_for_pto=serializer.instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
