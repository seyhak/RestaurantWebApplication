from django.test import TestCase
from django.utils import timezone
import datetime
from django.core.exceptions import ValidationError

from BasicBusinessManager.models.order_related_objects.company import Sector,Company
from BasicBusinessManager.models.order_related_objects.product import Product
# Create your tests here.
class SectorModelTests(TestCase):
    def test_is_sector_name_returned_properly(self):
        '''
        checks if returns proper name for example "sdasd"

        '''
        name = "sdadsdad"
        sector = Sector(name = name)
        self.assertEqual(sector.__str__(),name)

class CompanyModelTests(TestCase):
    def test_is_company_name_returned_properly(self):
        '''
        checks if returns proper name for example 

        '''
        name = "sdadsdad"
        company = Company(name = name)
        self.assertEqual(company.__str__(),name)

class ProductModelTests(TestCase):
    def test_is_product_name_returned_properly(self):
        '''
        checks if returns proper name for example 

        '''
        name = "sdadsdad"
        product = Product(name = name)
        self.assertEqual(product.__str__(),name)

    