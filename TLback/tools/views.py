from django.shortcuts import render
from .models import Item, Request, Customer

from django.http import HttpResponse
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics
from tools.serializers import *
from .models import *
from rest_framework.response import Response
from django.db.models import Q


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class RequestViewSet(generics.ListAPIView):
    serializer_class = RequestSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `roll` query parameter in the URL.
        """
        queryset = Request.objects.all()
        query = self.request.query_params.get('roll', None)
        if query:
            queryset = Request.objects.filter(
                Q(roll__icontains=query)
            ).distinct()
        return queryset

def post(self, request, format=None):
        headers = {'Authorization':'Basic {Yaha base64 convert karke daalna hai}',
                        'Content-Type':'application/x-www-form-urlencoded'
        }
        r = request.post('https://gymkhana.iitb.ac.in/sso/oauth/token/', data='code='+request.data['code']+'&redirect_uri={redirect_uri}&grant_type=authorization_code', headers=headers) 
        r = request.get('https://gymkhana.iitb.ac.in/sso/user/api/user/?fields=first_name,last_name,type,profile_picture,sex,username,email,program,contacts,insti_address,secondary_emails,mobile,roll_number', headers={'Authorization':'Bearer '+r.json()['access_token']})
        data=r.json()
        return HttpResponse("<h1>"+data+"</h1>")