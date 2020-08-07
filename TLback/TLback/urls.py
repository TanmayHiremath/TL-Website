"""TLback URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from tools import views,models
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'items', views.ItemViewSet)
router.register(r'customers', views.CustomerViewSet)
router.register(r'requests', views.RequestViewSet)
router.register(r'mails', views.MailViewSet)
router.register(r'flags', views.FlagViewSet)
router.register(r'fblinks', views.FblinkViewSet)
router.register(r'machines', views.MachineViewSet)

admin.site.site_header = 'Tinkerer\'s Lab Admin '

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path("autho/", views.posts),
    path('requestss/', views.RequestSearch.as_view()),
    path('requestsd/', views.RequestDate.as_view()),
    path('itemss/', views.ItemSearch.as_view()),
    path("sendmail/<str:roll_number>", views.sendMail.as_view()),
    path("customer/<str:roll_number>",views.getCustomer.as_view()),
    path("mail/<str:roll_number>",views.getMail.as_view()),
    path("auth_technician/",views.authenticate_technician),
    path("change_pwd/",views.change_pwd),
    path('fblinkss/', views.FblinkSearch.as_view()),
    path('machiness/', views.MachineSearch.as_view()),


]
if settings.DEBUG == True: 
        urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)