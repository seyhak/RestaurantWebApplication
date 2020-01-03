from django.db import models
from django.utils import timezone
import datetime
from .sale_out import Sale_out
from .company import Company
# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    #sale_out = models.ForeignKey(Sale_out,on_delete=models.DO_NOTHING)
    sallers = models.ManyToManyField("Company")
    
    def __str__(self):
        return self.name
