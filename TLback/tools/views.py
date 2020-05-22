from django.shortcuts import render
from .models import Item, Request, Order, OrderProduct, Customer


from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics
from tools.serializers import ItemSerializer, OrderSerializer, OrderProductSerializer, CustomerSerializer, RequestSerializer
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

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

class ApprovedViewset(generics.ListAPIView):
    serializer_class= RequestSerializer
    
    def get_queryset(self):
        user = self.request.user
        return Request.objects.filter(roll=user.number, is_approved=True)

class IssuedViewSet(generics.ListAPIView):
    queryset = Request.objects.filter(is_issued = True, is_returned = False)
    serializer_class= RequestSerializer

    def get_queryset(self):
        user = self.request.user
        return Request.objects.filter(roll=user.number, is_issued = True, is_returned = False)

