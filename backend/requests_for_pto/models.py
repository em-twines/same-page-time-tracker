from django.db import models
from authentication.models import User
from datetime import date

class Request(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    request_text = models.CharField(max_length=1000)
    day = models.DateField(default=date.today)
    hours_requested = models.IntegerField(default=8)
    decision = models.BooleanField(default=False)
    is_pending = models.BooleanField(default=True)



class Employee_Request(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    request = models.ForeignKey(Request, on_delete=models.CASCADE)



class Manager_Employee(models.Model):
    manager = models.ForeignKey(User, related_name='user_manager', on_delete=models.CASCADE)
    employee = models.ForeignKey(User, related_name='user_employee', on_delete=models.CASCADE)