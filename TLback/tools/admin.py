from django.contrib import admin
from .models import Item, Request, Order, OrderProduct, Customer

class RequestAdmin(admin.ModelAdmin):
    list_display = ('item', 'roll', 'quantity', 'colour_code', 'is_sent')
    list_editable = ('is_sent',)
    search_fields = ['roll', 'item__name', ]
    # search_fields = ('roll' , )
    # ordering = ['last_name', 'email'] # first by last_name then by email
    list_filter = ['item', 'roll', 'quantity', 'colour_code', 'is_sent']
# Register your models here.


admin.site.register(Item)
admin.site.register(Request, RequestAdmin)
admin.site.register(Order)
admin.site.register(OrderProduct)
admin.site.register(Customer)
