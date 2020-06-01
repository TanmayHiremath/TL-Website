from django.shortcuts import render
from .models import Item, Request, Customer


from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from tools.serializers import *
from .models import *
from rest_framework.response import Response


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer