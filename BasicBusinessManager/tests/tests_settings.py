from django.test import TestCase
from django.utils import timezone
import datetime
from django.core.exceptions import ValidationError
from django.contrib.staticfiles.testing import StaticLiveServerTestCase #LiveServerTestCase does basically the same as TransactionTestCase with one extra feature: it launches a live Django server in the background on setup, and shuts it down on teardown
#Selenium tests
from selenium.webdriver.firefox.webdriver import WebDriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import Firefox


class SettingsSeleniumTests(StaticLiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.selenium = WebDriver()
        cls.selenium.implicitly_wait(10)

    @classmethod
    def tearDownClass(cls):
        cls.selenium.quit()
        super().tearDownClass()
    def test_proper_attributes_change_client(self):
        '''
        checks if putting new data in object works properly for client

        '''
        '''self.selenium.get()
        c = Client()
        firstname = 'example_name'
        lastname = 'example_fistname'
        birthday = 'example_birthday'
        address = 'example str / 21 dss'
        
        submit_button = self.sele

        acc_type="Client"'''
        self.assertFalse(False)
        #tu będą testy selenium
        