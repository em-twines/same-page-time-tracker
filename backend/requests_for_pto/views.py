

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Request, Employee_Request, Manager_Employee, User, Hour, Frequency
from .serializers import RequestSerializer, Employee_Request_Serializer, CombineSerializer, Manager_Employee_Serializer, HourSerializer, FrequencySerializer
from django.shortcuts import get_object_or_404
from authentication.serializers import RegistrationSerializer
from datetime import datetime, timedelta
from django.utils import timezone
from django.utils.timezone import localdate

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

    # requests_pto = Employee_Request.objects.filter(user = request.user)
    # serializer = CombineSerializer(requests_pto, many = True)
    # return Response(serializer.data)

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

    
#edit pto request
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




#Manager

#view all requests
@api_view(['GET'])
@permission_classes([IsAuthenticated])

def view_all_requests(request):

    requests_pto = Employee_Request.objects.all()
    serializer = CombineSerializer(requests_pto, many = True)
    return Response(serializer.data)

    
    # requests_pto = Employee_Request.objects.filter(user = request.user)


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


#get all employees
@api_view(['GET'])
def returnAllEmployees(request):
    if request.method == 'GET':
        employees = User.objects.all()
        serializer = RegistrationSerializer(employees, many=True)
        return Response(serializer.data)

#Manually Add an employee
@api_view(['POST'])
@permission_classes([IsAuthenticated])

def addEmployee(request):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

#create, (edit), or delete employee
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def returnEmployeeByID(request, pk):

    employee = get_object_or_404(User, pk=pk)
    if request.method == 'GET':
        serializer = RegistrationSerializer(employee)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = RegistrationSerializer(employee, data=request.data)
        serializer.is_valid(raise_exception=True)
        # serializer.save(collection_id=cpk)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#change manager status of employee
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])

def makeManager(request, pk):
    user_is_manager = get_object_or_404(User, pk = pk)
    # request.data['is_manager'] = False
    serializer = RegistrationSerializer(user_is_manager, data = request.data, partial = True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status.HTTP_200_OK)


#set tenure to input
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])

def adjustTenure(request, pk):
    user_tenure = get_object_or_404(User, pk = pk)
    serializer = RegistrationSerializer(user_tenure, data = request.data, partial = True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status.HTTP_200_OK)


#change user's state of residence
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])

def adjustState(request, pk):
    user_state = get_object_or_404(User, pk = pk)
    serializer = RegistrationSerializer(user_state, data = request.data, partial = True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status.HTTP_200_OK)


#change pto according to a value
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])

def affectPTO(request, pk):
    user = get_object_or_404(User, pk = pk)
    user.pto += int(request.data.get('pto'))
    request.data['pto'] = user.pto
    serializer = RegistrationSerializer(user, data = request.data, partial = True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status.HTTP_200_OK)


#set pto to input
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])

def setPTO(request, pk):
    user_pto = get_object_or_404(User, pk = pk)
    serializer = RegistrationSerializer(user_pto, data = request.data, partial = True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status.HTTP_200_OK)

    

#get date joined over one year ago
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getUserJoinedDate(request, pk):

    # user = get_object_or_404(User, pk=pk)
    # if (timezone.now()-user.date_joined ) > timedelta(days=365):
    #     return True


#get Hours tiers to modify them

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getHourTiers(request):
    if request.method == 'GET':
        hours = Hour.objects.all()
        serializer = HourSerializer(hours, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = HourSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)



#get Frequency tiers to modify them

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getFrequencyTiers(request):
    if request.method == 'GET':
        frequencies = Frequency.objects.all()
        serializer = FrequencySerializer(frequencies, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = FrequencySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)



#set hours to input
@api_view(['PATCH', "DELETE"])
@permission_classes([IsAuthenticated])

def setHours(request, pk):
    hours = get_object_or_404(Hour, pk = pk)
    if request.method =="PATCH":
        serializer = HourSerializer(hours, data = request.data, partial = True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)
    elif request.method =="DELETE":
            hours.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

#set frequency to input
@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])

def setFrequency(request, pk):
    frequency = get_object_or_404(Frequency, pk = pk)
    if request.method =="PATCH":
        serializer = FrequencySerializer(frequency, data = request.data, partial = True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)
    elif request.method =="DELETE":
        frequency.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)