from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    # day = serializers.DateField(input_formats='%m-%d-%Y')
    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'message_text', 'is_read']
