from django.db import models
from authentication.models import User
from datetime import date

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipient')
    message_text = models.CharField(max_length=1000)
    is_read = models.BooleanField(default=False)
