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
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users')
    request_for_pto = models.ForeignKey(Request, on_delete=models.CASCADE,related_name="pto_request")
class Manager_Employee(models.Model):
    manager = models.ForeignKey(User, on_delete=models.CASCADE, related_name="manager_emplyee")
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name="employee")

class Hour(models.Model):
    hours = models.IntegerField(default=(8*10))
    # hours2 = models.IntegerField(default=(8*15))
    # hours3  = models.IntegerField(default=(8*20))

class Frequency(models.Model):
    frequency = models.IntegerField(default=365)
    # frequency2 = models.IntegerField(default=(365*3))
    # frequency3 = models.IntegerField(default=(365*5))

