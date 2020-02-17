from django.db import models
from django.utils import timezone
import datetime
from .company import Company
from django.core.exceptions import ValidationError

# Create your models here.


# Don't allow dates older than order_date.
class Order(models.Model):
    client = models.ForeignKey(
        "Client",
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True)
    products = models.ManyToManyField("Product", through="ProductCounter")
    deliverant = models.ForeignKey("Company", on_delete=models.DO_NOTHING)
    order_date = models.DateTimeField(auto_now_add=True)
    delivery_date = models.DateTimeField(blank=True, null=True)
    address_of_delivery = models.CharField(max_length=60, blank=True)
    notes = models.CharField(max_length=100, blank=True)
    delivered = models.BooleanField(default=False)

    def was_delivered(self):
        if self.delivery_date is not None:
            return True
        else:
            return False

    was_delivered.admin_order_field = delivered
    was_delivered.short_description = "Delivered ?"

    def get_orders_id(self):
        return "\n".join([w.name for w in self.products.all()])


# this is intermediate model for multiple adding the same record
class ProductCounter(models.Model):
    order = models.ForeignKey("Order",
                              on_delete=models.SET_NULL,
                              blank=True,
                              null=True)
    product = models.ForeignKey(
                            "Product",
                            on_delete=models.SET_NULL,
                            blank=True, null=True)
    count = models.IntegerField(default=1)
