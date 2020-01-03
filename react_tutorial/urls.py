from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.conf.urls import url, include

from . import views
#REST
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

#namespace
app_name = 'react_tutorial'
urlpatterns = [
    path('en/react_tutorial', views.MainView.as_view(), name='home'),
]

#strange bug - it doesnt want to work
#urlpatterns = format_suffix_patterns(urlpatterns)