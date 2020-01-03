from django.test import TestCase
from django.utils import timezone
import datetime
from django.core.exceptions import ValidationError

from BasicBusinessManager.models.order_related_objects.order import Order
# Create your tests here.
class OrderModelTests(TestCase):
    def test_was_delivered_delivery_later(self):
        '''
        was_delivered returns true value -
        order date is earlier than delivery date

        '''
        order_date = timezone.now() - datetime.timedelta(days=30)
        delivery_date = timezone.now() - datetime.timedelta(days=20)
        order = Order()
        order.order_date = order_date
        order.deliver_date = delivery_date
        self.assertTrue(order.was_delivered())

    def test_was_delivered_deliver_earlier(self):
        '''
        was_delivered returns false value -
        order date is later than delivery date

        '''
        order_date = timezone.now() - datetime.timedelta(days=30)
        delivery_date = timezone.now() - datetime.timedelta(days=40)
        order = Order()
        order.order_date = order_date
        order.deliver_date = delivery_date
        self.assertFalse(order.was_delivered())

    def test_was_delivered_deliver_equal(self):
        '''
        was_delivered returns false value -
        order date is later than delivery date

        '''
        date = timezone.now()-datetime.timedelta(days=1) 
        order = Order()
        order.order_date = date
        order.deliver_date = date
        self.assertTrue(order.was_delivered())


    