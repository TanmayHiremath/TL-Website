from django.db import models
# Create your models here.
class Items(models.Model):
    
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=50)
    level1 = models.CharField(max_length=50)
    level2 = models.CharField(max_length=50)
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
    flag = models.BooleanField(default=False)
    flag_time = models.DateTimeField()


    def __str__(self):
        return self.name


class Request(models.Model):
    item = models.ForeignKey(Items, on_delete=models.CASCADE)
    roll = models.CharField(max_length=20)
    quantity = models.PositiveSmallIntegerField()
    is_sent = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    is_returned = models.BooleanField(default=False)
    time = models.DateTimeField()

    def __str__(self):
        return self.item +' - ' + self.roll
