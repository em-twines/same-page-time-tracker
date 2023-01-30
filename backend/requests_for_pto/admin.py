from django.contrib import admin
from .models import Request, Hour, Frequency
# Register your models here.

admin.site.register(Request)
admin.site.register(Hour)
admin.site.register(Frequency)