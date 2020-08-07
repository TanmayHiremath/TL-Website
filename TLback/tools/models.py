from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Item(models.Model):
    
    name = models.CharField(max_length=200)
    division = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    description = models.CharField(max_length=2000)
    keywords = models.CharField(max_length=1000)
    picture = models.ImageField(upload_to='images/')
    id_required = models.BooleanField(default=True)
    quantity = models.PositiveSmallIntegerField()
    critical_val = models.PositiveSmallIntegerField()
    is_consumable = models.BooleanField(default=False)
    colour_code = models.CharField(max_length=10,blank=True)
    price = models.PositiveIntegerField()
    display= models.BooleanField(default=True)
    is_flagged= models.BooleanField(default=False)
    
    

    def __str__(self):
        return self.name

    # def save(self, *args, **kwargs):
    # # save the value of self.timestamp into purchase_date
    # colour_code = self.colour_code
    # super(Item, self).save(*args, **kwargs)
class Customer(models.Model):
    
    first_name = models.CharField(max_length=200, null=True)
    last_name  = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200)
    roll_number=models.CharField(max_length=11,default='19D070003',primary_key=True)
    username=models.CharField(max_length=50,null=True)
    access_token=models.CharField(max_length=200, null=True)
    refresh_token = models.CharField(max_length=200, null=True)
    

    def __str__(self):
        return self.roll_number

class Request(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    roll_number=models.ForeignKey(Customer,default='19D070003',on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField()
    is_sent = models.BooleanField(default=False)
    is_denied = models.BooleanField(default=False)
    is_issued = models.BooleanField(default=False)
    is_returned = models.BooleanField(default=False)
    checkout_time = models.DateTimeField(null=True)
    issued_time = models.DateTimeField(null=True)
    returned_time = models.DateTimeField(null=True)
    email_sent = models.BooleanField(default=False)

    @property
    def item_details(self):
        return "%s %s %s"%(self.item.name,self.item.category, self.item.quantity)
    

class Flag(models.Model):
    item = models.OneToOneField(Item, on_delete=models.CASCADE)
    roll_number=models.ForeignKey(Customer,default='19D070003',on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.item.name

class Mail(models.Model):
    roll_number=models.OneToOneField(Customer,on_delete=models.CASCADE,primary_key=True)
    subject=models.TextField(default='Thank you for registering to our site')
    message=models.TextField(default='It means the world to us')    
    recipient_list=models.TextField(default="['tanmay.v.hiremath@gmail.com']")
    html_message=models.TextField(default="<h1>default</h1>")

    def __str__(self):
        return str(self.roll_number)

class Project(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    picture = models.ImageField()
    
class Fblink(models.Model):
    link = models.CharField(max_length=1000)
    def __str__(self):
        return self.link

class Machine(models.Model):
    type = models.ForeignKey(Item, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    status = models.BooleanField(default= False)

    def __str__(self):
        return self.name

class MachineCategory(models.Model):
    name = models.CharField(max_length=150,primary_key=True)
    def __str__(self):
        return self.name

class ItemCategory(models.Model):
    name = models.CharField(max_length=150,primary_key=True)
    def __str__(self):
        return self.name
    