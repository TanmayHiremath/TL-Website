from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User



admin.site.register(Item)
admin.site.register(Request)
admin.site.register(Customer)
admin.site.register(Mail)
