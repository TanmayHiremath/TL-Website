from django.shortcuts import render
from .models import *

def store(request):
	items=Item.objects.all()
	context = {'items':items}
	return render(request, 'tools/store.html', context)

def cart(request):

	if request.user.is_authenticated:
		customer = request.user.customer
		order, created = Order.objects.get_or_create(customer=customer, complete=False)
		products = order.orderproduct_set.all()
	else:
		#Create empty cart for now for non-logged in user
		products = []
		order = {'get_cart_total':0, 'get_cart_items':0}

	context = {'products':products, 'order':order}
	return render(request, 'tools/cart.html', context)

def checkout(request):
	context = {}
	return render(request, 'tools/checkout.html', context)