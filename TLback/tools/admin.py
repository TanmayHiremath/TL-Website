from django.contrib import admin
from .models import Item, Request, Order, OrderProduct, Customer

# Register your models here.
admin.site.register(Item)
admin.site.register(Request)
admin.site.register(Order)
admin.site.register(OrderProduct)
admin.site.register(Customer)
