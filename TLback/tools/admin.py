from django.contrib import admin
from .models import Item, Request, Customer
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

# Define an inline admin descriptor for Customer model
# which acts a bit like a singleton
class CustomerInline(admin.StackedInline):
    model = Customer
    can_delete = False
    verbose_name_plural = 'customer'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (CustomerInline,)

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

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
admin.site.register(Customer)
