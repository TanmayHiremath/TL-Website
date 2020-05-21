from django.shortcuts import render

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from tools.serializers import ItemSerializer
from .models import Item
from rest_framework.response import Response


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer