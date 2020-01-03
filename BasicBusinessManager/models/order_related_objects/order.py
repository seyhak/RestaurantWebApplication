from django.db import models
from django.utils import timezone
import datetime
from .company import Company
from django.core.exceptions import ValidationError

# Create your models here.

# Don't allow dates older than order_date.
class Order(models.Model):
    client = models.ForeignKey("Client",on_delete=models.DO_NOTHING,blank=True, null=True)
    products = models.ManyToManyField("Product")
    deliverant = models.ForeignKey("Company",on_delete=models.DO_NOTHING)
    order_date = models.DateTimeField(auto_now_add=True)
    delivery_date = models.DateTimeField(blank = True,null=True)
    address_of_delivery = models.CharField(max_length=60,blank=True)
    notes = models.CharField(max_length=100,blank=True)
    delivered = models.BooleanField(default=False)

    def was_delivered(self):
        return timezone.now() > self.deliver_date >= self.order_date
        
    was_delivered.admin_order_field = delivered
    was_delivered.short_desction = "Delivered ?"

