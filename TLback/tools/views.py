from django.shortcuts import render
from .models import Item, Request, Customer

from django.http import HttpResponse
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

def post(self, request, format=None):
        headers = {'Authorization':'Basic {Yaha base64 convert karke daalna hai}',
                        'Content-Type':'application/x-www-form-urlencoded'
        }
        r = request.post('https://gymkhana.iitb.ac.in/sso/oauth/token/', data='code='+request.data['code']+'&redirect_uri={redirect_uri}&grant_type=authorization_code', headers=headers) 
        r = request.get('https://gymkhana.iitb.ac.in/sso/user/api/user/?fields=first_name,last_name,type,profile_picture,sex,username,email,program,contacts,insti_address,secondary_emails,mobile,roll_number', headers={'Authorization':'Bearer '+r.json()['access_token']})
        data=r.json()
        return HttpResponse("<h1>"+data+"</h1>")