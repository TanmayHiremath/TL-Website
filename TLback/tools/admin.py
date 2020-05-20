from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Item)
admin.site.register(Request)
admin.site.register(Order)
admin.site.register(OrderProduct)
admin.site.register(Customer)
