from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.conf.urls import url, include

from . import views
#REST
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

#namespace
app_name = 'order_manager'
router = routers.DefaultRouter()
#in router urls:
'''router.register(r'user',views.UserViewSet,base_name='user')
'''
urlpatterns = [
    path('en/order_manager/', views.MainView.as_view(), name='home'),
    path('rest/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

#strange bug - it doesnt want to work
#urlpatterns = format_suffix_patterns(urlpatterns)