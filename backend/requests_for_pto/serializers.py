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
