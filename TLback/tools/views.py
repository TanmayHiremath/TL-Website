from django.shortcuts import render,redirect


from django.http import HttpResponse,JsonResponse,Http404
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics,status
from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.db.models import Q
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import base64
import requests
import ast
import json
import random
import string
FRONT_URL='http://localhost:4200/'
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class getCustomer(APIView):
    def get_object(self, roll_number):
        try:
            return Customer.objects.get(roll_number=roll_number)
        except Customer.DoesNotExist:
            return None    
        

    def get(self, request, roll_number, format=None):
        customer = self.get_object(roll_number)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)    

    def put(self, request, roll_number, format=None):
        customer = self.get_object(roll_number)
        if customer is not None:
            serializer = CustomerSerializer(customer, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        else:  
            serializer = CustomerSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

    def post(self, request, format=None):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer


class MailViewSet(viewsets.ModelViewSet):
    queryset = Mail.objects.all()
    serializer_class = MailSerializer

class FlagViewSet(viewsets.ModelViewSet):
    queryset = Flag.objects.all()
    serializer_class = FlagSerializer



class RequestssViewSet(generics.ListAPIView):
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



@csrf_exempt
def posts(request):
    
    print("333")
    
    headers = { "Authorization": "Basic "
                + base64.b64encode(
                    f"{settings.CLIENT_ID}:{settings.CLIENT_SECRET}".encode("utf-8")
                ).decode("utf-8"),
                "Content-Type": "application/x-www-form-urlencoded",
    }
    x=base64.b64encode(
                    f"{settings.CLIENT_ID}:{settings.CLIENT_SECRET}".encode("utf-8")
                ).decode("utf-8")
    print(request.POST)
    r = requests.post('https://gymkhana.iitb.ac.in/profiles/oauth/token/', data='code='+request.POST['code']+'&grant_type=authorization_code', headers=headers) 
    print(r.json())
    b = requests.get('https://gymkhana.iitb.ac.in/profiles/user/api/user/?fields=first_name,last_name,type,username,profile_picture,email,mobile,roll_number,program', headers={'Authorization':'Bearer '+r.json()['access_token']})
    data=b.json()
    data['refresh_token']=r.json()['refresh_token']
    data['access_token']=r.json()['access_token']

    # key = ''
    # for i in range(10):
    #     key += random.choice(string.ascii_lowercase + string.ascii_uppercase + string.digits)
    # data['login_key']=key
    print(data)
    
    return JsonResponse(data)

def email(request):
   for mail in Mail.objects.all(): 
    subject = mail.subject
    message = mail.message
    email_from = settings.EMAIL_HOST_USER
    recipient_list = mail.recipient_list.strip('][').split(',')
    print(type(recipient_list))
    print(recipient_list)
    html_message=mail.html_message
   if request.method == 'GET':
        send_mail( subject,message, email_from, recipient_list,html_message=html_message)
        return HttpResponse('Mail Sent Successfully')
