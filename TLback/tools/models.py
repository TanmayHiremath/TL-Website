from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Item(models.Model):
    
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
    display=models.BooleanField(default=False)
    displaylevel1=models.BooleanField(default=False)
    displaylevel2=models.BooleanField(default=False)

    def __str__(self):
        return self.name

    # def save(self, *args, **kwargs):
    # # save the value of self.timestamp into purchase_date
    # colour_code = self.colour_code
    # super(Item, self).save(*args, **kwargs)


class Request(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    roll = models.CharField(max_length=20)
    quantity = models.PositiveSmallIntegerField()
    is_sent = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    is_issued = models.BooleanField(default=False)
    is_returned = models.BooleanField(default=False)
    colour_code = models.CharField(max_length=20,default= "green")
    
    # @property
    # def get_colour(self):
    #     colour_code = Request.item.colour_code
    #     return colour_code
    
    # @property
    # def get_id(self):
    #     id_required = Request.item.id_required
    #     return id_required    

    @property
    def item_details(self):
        return "%s %s"%(self.item.name, self.item.quantity)

    def __str__(self):
        return self.roll
    
    # def __str__(self):
    #     # self.colour_code=self.item.name
    #     return self.roll


class Customer(models.Model):
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200)
    auth_code = models.CharField(max_length=200)
    refresh_code = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Flag(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    roll = models.CharField(max_length=20)
    time = models.DateTimeField(auto_now_add=True)
