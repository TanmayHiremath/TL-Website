from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

# Define an inline admin descriptor for Customer model
# which acts a bit like a singleton

# Define a new User admin

# Re-register UserAdmin


def issued_status(self, request, queryset):
    count= queryset.update(
        is_issued=True,
        is_denied=False,
        item__quantity= request.quantity
    )
    self.message_user(request, '{} issued'.format(count))
issued_status.short_description = 'issue' # at admin page

def denied_status(self, request, queryset):
    count= queryset.update(
        is_issued=False,
        is_denied=True
    )

    self.message_user(request, '{} denied'.format(count))
denied_status.short_description = 'deny' # at admin page

def returned_status(self, request, queryset):
    count= queryset.update(
        is_issued=True,
        is_returned=True, is_denied=False
    )

    self.message_user(request, '{} returned'.format(count))
returned_status.short_description = 'return' # at admin page


class RequestAdmin(admin.ModelAdmin):

    list_display = ('item', 'roll_number', 'quantity', 'item_details', 'is_issued', 'is_denied', 'is_returned','is_sent','email_sent', 'issued_time', 'returned_time','checkout_time')
    list_editable = ('is_issued', 'is_denied', 'is_returned', 'is_sent', 'email_sent')
    search_fields = ['item__name', 'item__colour_code', ]
    actions = [issued_status, denied_status, returned_status]

    # list_select_related = (
    #     'item',
    # )
    # search_fields = ('roll' , )
    # ordering = ['last_name', 'email'] # first by last_name then by email
    #   date_hierarchy = 'publication_date'
    list_filter = ['item', 'item__colour_code', 'is_issued', 'is_denied','is_returned']
# Register your models here.
class ItemAdmin(admin.ModelAdmin):

    list_display = ('name', 'category', 'quantity', 'colour_code', 'price', 'is_flagged','id_required')
    list_editable = ('quantity', 'price', 'is_flagged', 'id_required')
    search_fields = ['name', 'category','quantity', 'colour_code']
    # actions = [issued_status, denied_status, returned_status]

    # list_select_related = (
    #     'item',
    # )
    # search_fields = ('roll' , )
    # ordering = ['last_name', 'email'] # first by last_name then by email
    #   date_hierarchy = 'publication_date'
    list_filter = ['category', 'colour_code', 'is_flagged', 'id_required']
# Register your models here.
class FlagAdmin(admin.ModelAdmin):

     list_display = ('item', 'roll_number', 'time')

admin.site.register(Item, ItemAdmin)
admin.site.register(Request, RequestAdmin)
admin.site.register(Customer)
admin.site.register(Flag, FlagAdmin)
admin.site.register(Fblink)
admin.site.register(Machine)
admin.site.register(MachineCategory)
admin.site.register(ItemCategory)
