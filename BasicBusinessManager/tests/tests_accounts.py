from BasicBusinessManager.models.users.employee import Employee
from BasicBusinessManager.models.users.company_owner import CompanyOwner
from BasicBusinessManager.models.users.client import Client as ClientModel
from django.contrib.auth.models import User
from django.contrib import auth

from django.urls import reverse
from django.core.exceptions import *
from django.shortcuts import get_object_or_404
from BasicBusinessManager.views import login_view
from django.test import TestCase, Client
from django.utils import timezone
import datetime

def create_user(email,username,password,conf_password,type):
    '''
    create user with given data
    
    '''


class SignUpTests(TestCase):
    def test_proper_sign_up(self):
        '''
        checks if sign up works for client, owner and worker

        '''
        print(self.test_proper_sign_up.__name__)
        c = Client()
        example = 'example_client'
        acc_type="Client"
        c.post(reverse('BasicBusinessManager:login'),{'submit': 'sign_up','sign-up-email':'abcd@em.pl','sign-up-username':example,"sign-up-pwd":"pass","sign-up-confirm-pwd":"pass","type-sel":acc_type})
        try:
            user = get_object_or_404(ClientModel, user__username=example)
            self.assertTrue(True)
        except ObjectDoesNotExist:
            self.assertTrue(False)

        c = Client()
        example = 'example_owner'
        acc_type="Business client"
        c.post(reverse('BasicBusinessManager:login'),{'submit': 'sign_up','sign-up-email':'abcd@em.pl','sign-up-username':example,"sign-up-pwd":"pass","sign-up-confirm-pwd":"pass","type-sel":acc_type})
        try:
            user = get_object_or_404(CompanyOwner, user__username=example)
            self.assertTrue(True)
        except ObjectDoesNotExist:
            self.assertTrue(False)
        
        c = Client()
        example = 'example_employee'
        acc_type="Employee"
        c.post(reverse('BasicBusinessManager:login'),{'submit': 'sign_up','sign-up-email':'abcd@em.pl','sign-up-username':example,"sign-up-pwd":"pass","sign-up-confirm-pwd":"pass","type-sel":acc_type})
        try:
            user = get_object_or_404(Employee, user__username=example)
            self.assertTrue(True)
        except ObjectDoesNotExist:
            self.assertTrue(False)
        
    def test_inproper_sign_up_wrong_conf_password(self):
        '''
        checks if sign up error works for client, owner and worker if password is not equal to confirmation password

        '''
        c = Client()
        example = 'example_client'
        password = "haslo123"
        confirmation_password="haslo1233214"
        acc_type="Client"
        response =c.post(reverse('BasicBusinessManager:login'),{'submit': 'sign_up','sign-up-email':'abcd@em.pl','sign-up-username':example,"sign-up-pwd":password,"sign-up-confirm-pwd":confirmation_password,"type-sel":acc_type})
        respond = response.context['wrong_pwd']
        self.assertEqual(respond,"Password and Confirmation password are not the same or empty !")
        
        
        c = Client()
        example = 'example_owner'
        password = "haslo123"
        confirmation_password="haslo1233214"

        acc_type="Business client"
        response = c.post(reverse('BasicBusinessManager:login'),{'submit': 'sign_up','sign-up-email':'abcd@em.pl','sign-up-username':example,"sign-up-pwd":password,"sign-up-confirm-pwd":confirmation_password,"type-sel":acc_type})
        respond = response.context['wrong_pwd']
        self.assertEqual(respond,"Password and Confirmation password are not the same or empty !")
        
        c = Client()
        example = 'example_employee'
        password = "haslo123"
        confirmation_password="haslo1233214"

        acc_type="Employee"
        response = c.post(reverse('BasicBusinessManager:login'),{'submit': 'sign_up','sign-up-email':'abcd@em.pl','sign-up-username':example,"sign-up-pwd":password,"sign-up-confirm-pwd":confirmation_password,"type-sel":acc_type})
        respond = response.context['wrong_pwd']
        self.assertEqual(respond,"Password and Confirmation password are not the same or empty !")

    def test_inproper_sign_up_no_data(self):
        '''
        checks if sign up works for client if data is not filled

        '''
        c = Client()
        example = 'example_client'
        password = "haslo123"
        confirmation_password="haslo1233214"
        acc_type="Client"
        response =c.post(reverse('BasicBusinessManager:login'),{'submit': 'sign_up','sign-up-email':'','sign-up-username':example,"sign-up-pwd":password,"sign-up-confirm-pwd":confirmation_password,"type-sel":acc_type})
        respond = response.context['wrong_pwd']
        self.assertEqual(respond," Empty data fields ")

        c = Client()
        example = ''
        password = "haslo123"
        confirmation_password="haslo1233214"
        acc_type="Client"
        response =c.post(reverse('BasicBusinessManager:login'),{'submit': 'sign_up','sign-up-email':'yyyy@ssss.ry','sign-up-username':example,"sign-up-pwd":password,"sign-up-confirm-pwd":confirmation_password,"type-sel":acc_type})
        respond = response.context['wrong_pwd']
        self.assertEqual(respond," Empty data fields ")

class LoginTests(TestCase):
    def test_proper_loging_in(self):
        '''
        checks if sign up/login works for client

        '''
        c = Client()
        example_username = 'example_client'
        example_password = "haslo4321"
        acc_type="Client"
        c.post(reverse('BasicBusinessManager:login'),{'submit': 'sign_up','sign-up-email':'abcd@em.pl','sign-up-username':example_username,"sign-up-pwd":example_password,"sign-up-confirm-pwd":example_password,"type-sel":acc_type})
        #create user
        try:
            user = get_object_or_404(ClientModel, user__username=example_username)
            self.assertTrue(True)
        except ObjectDoesNotExist:
            self.assertTrue(False)
        response = c.post(reverse('BasicBusinessManager:login'),{'submit':'login','login':example_username,'pwd':example_password,'remember-me-checkbox':False})
        #try to login and go back to main page
        try:
            response = c.post(reverse('BasicBusinessManager:main'))
            self.assertTrue(True)
        except ObjectDoesNotExist:
            self.assertTrue(False)
        try:
            user = auth.get_user(self.client)
            if user.user.is_authenticated:
                self.assertTrue(True)
            else:
                self.assertTrue(False)
        except ObjectDoesNotExist:
            self.assertTrue(False)

class LogoutTests(TestCase):
    def test_proper_loging_out(self):
        '''
        checks if logout works for client

        '''
        c = Client()
        example_username = 'example_client'
        example_password = "haslo4321"
        acc_type="Client"
        c.post(reverse('BasicBusinessManager:login'),{'submit': 'sign_up','sign-up-email':'abcd@em.pl','sign-up-username':example_username,"sign-up-pwd":example_password,"sign-up-confirm-pwd":example_password,"type-sel":acc_type})
        #create user
        try:
            user = get_object_or_404(ClientModel, user__username=example_username)
            self.assertTrue(True)
        except ObjectDoesNotExist:
            self.assertTrue(False)
        #login
        response = c.post(reverse('BasicBusinessManager:login'),{'submit':'login','login':example_username,'pwd':example_password,'remember-me-checkbox':False})
        #logout
        response = c.post(reverse('BasicBusinessManager:logout'))
        try:
            user = auth.get_user(self.client)
            #user = get_object_or_404(ClientModel, user__username=example_username)
            if user.is_authenticated:
                print("test for logout: status logged in")
                self.assertTrue(False)
            else:
                self.assertTrue(True)
        except ObjectDoesNotExist:
            print("test for logout: logout obj does not exist")
            self.assertTrue(False)

        
