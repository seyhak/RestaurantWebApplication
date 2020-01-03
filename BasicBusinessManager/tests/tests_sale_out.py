from django.test import TestCase
from django.utils import timezone
import datetime
from django.core.exceptions import ValidationError

from BasicBusinessManager.models.order_related_objects.sale_out import Sale_out
# Create your tests here.
class SaleOutModelTests(TestCase):
    def test_is_sale_name_returned_properly(self):
        '''
        checks if returns proper name for example "sdasd"

        '''
        name = "sdadsdad"
        sale = Sale_out(name = name)
        self.assertEqual(sale.__str__(),name)
    
    def test_is_sale_finished_date_before_end_sale(self):
        '''
        checks if returns false with enddate before now

        '''
        end_date = timezone.now()-datetime.timedelta(days=8)
        sale = Sale_out(end_date = end_date)
        self.assertTrue(sale.finished())
    
    def test_is_sale_finished_date_after_end_sale(self):
        '''
        checks if returns properly with enddate after now

        '''
        end_date = timezone.now()+datetime.timedelta(days=8)
        sale = Sale_out(end_date = end_date)
        self.assertFalse(sale.finished())



    