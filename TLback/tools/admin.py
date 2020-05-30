from django.contrib import admin
from .models import Item, Request, Order, OrderProduct, Customer

class RequestAdmin(admin.ModelAdmin):
    list_display = ('item', 'roll', 'quantity','colour_code')
# Register your models here.
admin.site.register(Item)
admin.site.register(Request, RequestAdmin)
admin.site.register(Order)
admin.site.register(OrderProduct)
admin.site.register(Customer)
