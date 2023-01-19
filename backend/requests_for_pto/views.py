

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

# #view all their own requests
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def view_all_requests_by_employee(request):
#     all_requests_by_user = Employee_Request.objects.filter(use = request.user.id)
#     serializer = RequestSerializer(all_requests_by_user, many=True)
#     return Response(serializer.data)




# #Submit request
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def submit_request(request):
#     print(
#         'User ', f"{request.user.id} {request.user.email} {request.user.username}")
#     serializer = RequestSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save(user=request.users.user_id)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 

#amenity = user
#store = request
