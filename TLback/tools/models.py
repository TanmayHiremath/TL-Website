from django.db import models
# Create your models here.
class Item(models.Model):
    
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=30)
    description = models.CharField(max_length=2000)
    keywords = models.CharField(max_length=1000)
    picture = models.FileField()
    id_required = models.BooleanField(default=True)
    quantity = models.PositiveSmallIntegerField()
    critical_val = models.PositiveSmallIntegerField()
    current_holders = models.CharField(max_length=1000)
    is_consumable = models.BooleanField(default=False)
    colour_code = models.CharField(max_length=10)
    notifications = models.CharField(max_length=10000)
    price = models.PositiveIntegerField()

    def __str__(self):
        return self.name
