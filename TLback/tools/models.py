from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Item(models.Model):
    
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=50)
    level1 = models.CharField(max_length=50)
    level2 = models.CharField(max_length=50)
    description = models.CharField(max_length=2000)
    keywords = models.CharField(max_length=1000)
    picture = models.FileField()
    id_required = models.BooleanField(default=True)
    quantity = models.PositiveSmallIntegerField()
    critical_val = models.PositiveSmallIntegerField()
    current_holders = models.CharField(max_length=1000)
    is_consumable = models.BooleanField(default=False)
    colour_code = models.CharField(max_length=10)
    notifications = models.CharField(max_length=10000)
    price = models.PositiveIntegerField()
    flag = models.BooleanField(default=False)
    flag_time = models.DateTimeField()


    def __str__(self):
        return self.name


class Request(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    roll = models.CharField(max_length=20)
    quantity = models.PositiveSmallIntegerField()
    is_sent = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    is_returned = models.BooleanField(default=False)
    time = models.DateTimeField()

    def __str__(self):
        return self.item +' - ' + self.roll



class Customer(models.Model):
	user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)
	name = models.CharField(max_length=200, null=True)
	email = models.CharField(max_length=200)

	def __str__(self):
		return self.name


class Order(models.Model):
	customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
	date_ordered = models.DateTimeField(auto_now_add=True)
	complete = models.BooleanField(default=False)
	transaction_id = models.CharField(max_length=100, null=True)

	def __str__(self):
		return str(self.id)

	@property
	def get_cart_items(self):
		orderproducts = self.orderproduct_set.all()
		total = sum([product.quantity for product in orderproducts])
		return total 

class OrderProduct(models.Model):
	item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True)
	order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
	quantity = models.IntegerField(default=0, null=True, blank=True)
	date_added = models.DateTimeField(auto_now_add=True)