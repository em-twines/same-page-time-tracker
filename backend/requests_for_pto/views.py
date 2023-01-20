

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Request, Employee_Request, Manager_Employee, User
from .serializers import RequestSerializer, Employee_Request_Serializer, Manager_Employee_Serializer
from django.shortcuts import get_object_or_404
from authentication.serializers import RegistrationSerializer


#Manager

#view all requests
@api_view(['GET'])
@permission_classes([IsAuthenticated])

def view_all_requests(request):
    #retrieves all request objects and unpacks their values
    requests_for_pto = Request.objects.all()
    all_requests_objects = requests_for_pto.values()

    #returns array of Request object id's
    requests_array = [item['id'] for item in all_requests_objects]
    i = 0
    matched_ids = []
    while i < len(requests_array):
        matched_id_object = Employee_Request.objects.filter(request_for_pto = requests_array[i])
        matched_ids += matched_id_object.values()
        i+= 1
    
    #returns array of user objects
    matched_user_ids = [item['user_id'] for item in matched_ids]
    found_users = []
    for item in matched_user_ids:
        found_users += User.objects.filter(id = item)
    
    serializer = RequestSerializer(requests_for_pto, many=True)
    serializer2 = RegistrationSerializer(found_users, many=True)
    serializer_list = [serializer.data, serializer2.data]
    return Response(serializer_list)


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

    #creates list of all junction table id's
    all_requests_by_user = Employee_Request.objects.filter(user = request.user.id)
    all_requests_objects = all_requests_by_user.values()

    #get array of all corresponding request_id's
    requests_array = []
    requests_array = [item['request_for_pto_id'] for item in all_requests_objects]

    #loops through request_id's to find corresponding request objects.
    i = 0
    request_objects = []
    while i < len(requests_array):
        request_objects += Request.objects.filter(pto_request__request_for_pto_id = requests_array[i])
        i += 1
        
    serializer = RequestSerializer(request_objects, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)



#Submit request
@api_view(['POST'])
@permission_classes([IsAuthenticated])

def submit_request(request):
    if request.method == 'POST':
        serializer = RequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            Employee_Request.objects.create(user=request.user, request_for_pto=serializer.instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    
@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])

def modify_request(request, pk):
    request_for_pto = get_object_or_404(Request, pk = pk)

    if request.method == 'PUT':
        serializer = RequestSerializer(request_for_pto, data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)

    elif request.method == 'DELETE':
        request_for_pto.delete()
        return Response(status.HTTP_204_NO_CONTENT)

