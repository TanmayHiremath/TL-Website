from django.shortcuts import render
from .models import *

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from tools.serializers import *
from .models import *
from rest_framework.response import Response


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderProductViewSet(viewsets.ModelViewSet):
    queryset = OrderProduct.objects.all()
    serializer_class = OrderProductSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


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
		order = { 'get_cart_products':0}

	context = {'products':products, 'order':order}
	return render(request, 'tools/cart.html', context)

def checkout(request):
	if request.user.is_authenticated:
		customer = request.user.customer
		order, created = Order.objects.get_or_create(customer=customer, complete=False)
		products = order.orderproduct_set.all()
	else:
		#Create empty cart for now for non-logged in user
		products = []
		order = { 'get_cart_products':0}

	context = {'products':products, 'order':order}
	return render(request, 'tools/checkout.html', context)
