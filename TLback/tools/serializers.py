from rest_framework import serializers
from .models import Item, Request


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('name','picture','id_required','quantity','critical_val','is_consumable','colour_code')