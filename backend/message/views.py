from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Message, User
from .serializers import MessageSerializer
from django.shortcuts import get_object_or_404
# Create your views here.


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def viewAllMessagesByRecipient(request):
    messages_for_user = Message.objects.filter(recipient_id = request.user.id)
    if request.method == 'GET': 
        serializer = MessageSerializer(messages_for_user, many = True)
        return Response(serializer.data,  status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(sender=request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)