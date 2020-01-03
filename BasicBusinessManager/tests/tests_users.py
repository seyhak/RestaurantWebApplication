from django.test import TestCase
from django.utils import timezone
import datetime

from django.contrib.auth.models import User
from BasicBusinessManager.models.users.employee import Employee
from BasicBusinessManager.models.users.company_owner import CompanyOwner
from BasicBusinessManager.models.users.client import Client
# Create your tests here.
class EmployeeModelTests(TestCase):
    def test_years_employed_with_future_employment_date(self):
        '''
        years_employed() returns negative value -
        employment date set on the future

        '''
        time = timezone.now() - datetime.timedelta(days=30)
        future_employment_employee = Employee()
        future_employment_employee.date_joined=time
        self.assertGreater(future_employment_employee.years_employed(),timezone.now()-timezone.now())

    def test_years_employed_with_past_employment_date(self):
        '''
        years_employed() returns negative value -
        employment date set on the future

        '''
        time = timezone.now() + datetime.timedelta(days=30)
        future_employment_employee = Employee()
        future_employment_employee.date_joined=time
        self.assertLess(future_employment_employee.years_employed(),timezone.now()-timezone.now())
     
    def test_name_returned(self):
        '''
        __str()__ returns first_name of employee object

        '''
        username = "login"
        name = "John"
        email="SDSA@osd.sad"
        pwd ="asdasssssssssssssssssssssssss"
        xyz = User.objects.create_user(username,email,pwd)
        employee = Employee.objects.create_employee(xyz)
        employee.user.first_name=name
        self.assertEqual(employee.__str__(),name)

    def test_username_returned(self):
        '''
        __str()__ returns username if name is null of employee object

        '''
        username = "login"
        email="SDSA@osd.sad"
        pwd ="asdasssssssssssssssssssssssss"
        xyz = User.objects.create_user(username,email,pwd)
        employee = Employee.objects.create_employee(xyz)
        self.assertEqual(employee.__str__(),username)

class CompanyOwnerModelTests(TestCase):
    def test_company_owner_name(self):
        '''
        checks if returns proper name for example

        '''
        username = "Owner"
        email="SDSA@osd.sad"
        pwd ="asdasssssssssssssssssssssssss"
        xyz = User.objects.create_user(username,email,pwd)
        owner = CompanyOwner.objects.create_owner(xyz)
        owner.first_name=username
        self.assertEqual(owner.__str__(),username)

class ClientModelTests(TestCase):
    def test_client_name(self):
        '''
        checks if returns proper name for example

        '''
        username = "Client"
        email="SDSA@osd.sad"
        pwd ="asdasssssssssssssssssssssssss"
        xyz = User.objects.create_user(username,email,pwd)
        client = Client.objects.create_client(xyz)
        client.first_name=username
        self.assertEqual(client.__str__(),username)