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
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token


router = routers.DefaultRouter()
router.register(r'items', views.ItemViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'orderproduct', views.OrderProductViewSet)
router.register(r'customers', views.CustomerViewSet)
router.register(r'requests', views.RequestViewSet)
router.register(r'approved', views.ApprovedViewSet)
router.register(r'issued', views.IssuedViewSet)


admin.site.site_header = 'Tinkerer\'s Lab Admin '

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]