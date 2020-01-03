from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator
import datetime
# Create your models here.
class Sale_out(models.Model):
    name = models.CharField(max_length=30,blank=True)
    discount = models.PositiveIntegerField(validators=[MaxValueValidator(100)])
    products = models.ManyToManyField("Product")
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    
    #if current date is later than end date returns true
    def finished(self):
        return timezone.now() - self.end_date > timezone.now()-timezone.now()
    def __str__(self):
        return self.name