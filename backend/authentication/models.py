from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_manager = models.BooleanField('is_manager', default=False)
    tenure = models.IntegerField('tenure', default=0)
    state = models.CharField('state', max_length = 255, default = '')
    pto = models.IntegerField('pto', default=80)
    '''
    This is a custom version of the built in User class
    It contains all of the built in fields and functionality of the standard User
    You can add fields here for any additional properties you want a User to have
    This is useful for adding roles (Customer and Employee, for example)
    For just a few roles, adding boolean fields is advised
    '''
    # Example (note import of models above that is commented out)
    # this will add a column to the user table
    # is_student = models.BooleanField('student status', default=False)
