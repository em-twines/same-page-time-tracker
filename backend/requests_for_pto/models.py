from django.db import models
from authentication.models import User
from datetime import date, datetime
from django.conf import settings
class Request(models.Model):
    request_text = models.CharField(max_length=1000)
    day = models.DateField(default=date.today)
    hours_requested = models.IntegerField(default=8)
    decision = models.BooleanField(default=False)
    is_pending = models.BooleanField(default=True)
    submission_time = models.DateTimeField(default=datetime.now)
    # submission_time = models.DateTimeField(format= '%m/%d/%y %H:%M %p', default=datetime.now)


class Employee_Request(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users')
    request_for_pto = models.ForeignKey(Request, on_delete=models.CASCADE,related_name="pto_request")
class Manager_Employee(models.Model):
    manager = models.ForeignKey(User, on_delete=models.CASCADE, related_name="manager_emplyee")
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name="employee")

class Hour(models.Model):
    hours = models.IntegerField(default=(8*10))

class Frequency(models.Model):
    frequency = models.IntegerField(default=365)


