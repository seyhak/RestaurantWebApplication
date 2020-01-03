from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.conf.urls import url, include

from . import views
from BasicBusinessManager.views import *
#REST
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

#namespace
app_name = 'BasicBusinessManager'
router = routers.DefaultRouter()
#in router urls:
router.register(r'user',views.UserViewSet,base_name='user')
router.register(r'employee', views.EmployeeViewSet)
router.register(r'client', views.ClientViewSet)
router.register(r'order',views.OrderViewSet)
router.register(r'company_owner',views.CompanyOwnerViewSet)
router.register(r'company',views.CompanyViewSet)
router.register(r'sector',views.SectorViewSet)
router.register(r'role',views.RoleViewSet)
router.register(r'saleout',views.SaleOutOwnerViewSet)
router.register(r'product',views.ProductViewSet)
urlpatterns = [
    path('en/', views.MainView.as_view(), name='main'),
    path('en/login/', views.login_view, name='login'),
    path('en/settings/', views.settings_view, name='settings'),
    path('en/settings/confirm', views.settings_submit_view, name='settings-confirm'),
    path('en/logout/', views.logout_view, name='logout'),
    path('en/contact/', views.ContactView.as_view(), name='contact'),
    #REST
    path('rest/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    #path('en/', auth_views.LoginView.as_view(template_name='BasicBusinessManager/WebHtmls/EN/Main.html')),
     # ex: /polls/5/
    #path('product/<int:product_id>/', views.product_detail, name='product_detail'),
    # ex: /polls/5/results/
    #path('product/<int:product_id>/reviews/', views.reviews, name='reviews'),
    # ex: /polls/5/add_review/
    #path('product/<int:product_id>/add_review/', views.add_review, name='add_review'),
    # ex: /polls/5/
    #path('product/<int:product_id>/review/', views.review, name='review'),
]

#strange bug - it doesnt want to work
#urlpatterns = format_suffix_patterns(urlpatterns)