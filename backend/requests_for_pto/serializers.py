from rest_framework import serializers
from .models import Request, Employee_Request, Manager_Employee, Hour, Frequency
from authentication.serializers import RegistrationSerializer
from datetime import date


class RequestSerializer(serializers.ModelSerializer):
    submission_time = serializers.DateTimeField(format="%m-%d-%Y %H:%M %p", input_formats=["%m-%d-%Y %H:%M %p",])
    # day = serializers.DateField(input_formats='%m-%d-%Y')
    class Meta:
        model = Request
        fields = ['id', 'request_text', 'day', 'hours_requested', 'decision', 'is_pending', 'submission_time']

class Employee_Request_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Employee_Request
        fields = ['id', 'user_id', 'request_id']

        depth = 1
    user_id = serializers.IntegerField(write_only = True)

class Manager_Employee_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Manager_Employee
        fields = ['id', 'user_id', 'user_id']
        depth = 1


class CombineSerializer(serializers.Serializer):
    user = RegistrationSerializer(many=False)
    request_for_pto = RequestSerializer(many=False)
    class Meta:
        model = Employee_Request
        fields = ["id","user", 'request_for_pto' ]
        depth=1


class HourSerializer(serializers.ModelSerializer):
    # day = serializers.DateField(input_formats='%m-%d-%Y')
    class Meta:
        model = Hour
        fields = ['id', 'hours']

class FrequencySerializer(serializers.ModelSerializer):
    # day = serializers.DateField(input_formats='%m-%d-%Y')
    class Meta:
        model = Frequency
        fields = ['id', 'frequency']