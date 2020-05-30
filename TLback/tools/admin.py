from django.contrib import admin
from .models import Item, Request, Order, OrderProduct, Customer

def sent_status(self, request, queryset):
    count= queryset.update(
        is_sent=True
    )
    self.message_user(request, '{} sent'.format(count))
sent_status.short_description = 'sent' # at admin page

class RequestAdmin(admin.ModelAdmin):
    list_display = ('item', 'roll', 'quantity', 'item_details', 'is_sent')
    list_editable = ('is_sent',)
    search_fields = ['roll', 'item__name', 'item__colour_code' ]
    actions = [sent_status]
    # list_select_related = (
    #     'item',
    # )
    # search_fields = ('roll' , )
    # ordering = ['last_name', 'email'] # first by last_name then by email
    #   date_hierarchy = 'publication_date'
    list_filter = ['item', 'roll', 'quantity', 'item__colour_code', 'is_sent']
# Register your models here.


admin.site.register(Item)
admin.site.register(Request, RequestAdmin)
admin.site.register(Order)
admin.site.register(OrderProduct)
admin.site.register(Customer)
