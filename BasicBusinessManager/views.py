from django.shortcuts import (
    render,
    redirect
)
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views.generic.base import TemplateView
from django_filters.rest_framework import DjangoFilterBackend
# models
from .models.order_related_objects.company import Company, Sector
from .models.order_related_objects.order import Order
from .models.users.employee import Employee, Role
from .models.users.company_owner import CompanyOwner
from .models.users.client import Client
from .models.order_related_objects.product import Product
from .models.order_related_objects.sale_out import Sale_out
# rest
from rest_framework import viewsets, serializers, status, response, pagination
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from BasicBusinessManager.serializers import *
from BasicBusinessManager.permissions import *
from rest_framework.authentication import (
    SessionAuthentication,
    BasicAuthentication
)
from rest_framework.permissions import IsAuthenticated
# from rest_framework.permissions import IsAuthenticated
# main home view - templateView used in that purpose,


class MainView(TemplateView):
    template_name = 'BasicBusinessManager/WebHtmls/EN/Home.html'

    # sends context data to html. It has to be "get_context_data"
    def get_context_data(self, **kwargs):
        context = super(MainView, self).get_context_data(**kwargs)
        context.update({
            'var1': self.kwargs.get('var1', "sda"),
            # 'var2': self.kwargs.get('var2', None),
        })
        return context


def settings_view(request):
    if request.user.is_authenticated:
        if hasattr(request.user, 'client'):
            return render(
                request,
                'BasicBusinessManager/WebHtmls/EN/Settings.html',
                {"account_type": 'Client'})
        elif hasattr(request.user, 'companyowner'):
            return render(
                request,
                'BasicBusinessManager/WebHtmls/EN/Settings.html',
                {"account_type": 'CompanyOwner'}
            )
        elif hasattr(request.user, 'employee'):
            return render(
                request,
                'BasicBusinessManager/WebHtmls/EN/Settings.html',
                {"account_type": 'Employee'}
            )
    else:
        return HttpResponseRedirect(reverse('BasicBusinessManager:main'))


def settings_submit_view(request):
    # http_method_names = ['get', 'post', 'put', 'delete']
    print("submit settings")
    if request.user.is_authenticated:
        if (
            hasattr(request.user, 'client') or
            hasattr(request.user, 'companyowner') or
            hasattr(request.user, 'employee')
        ):
            user = Client.objects.get(pk=request.user.id)
            return render(request,
                          'BasicBusinessManager/WebHtmls/EN/Settings.html')
        else:
            return HttpResponseRedirect(reverse('BasicBusinessManager:main'))
    else:
        return HttpResponseRedirect(reverse('BasicBusinessManager:settings'))


class ContactView(TemplateView):
    template_name = 'BasicBusinessManager/WebHtmls/EN/Contact.html'


def logout_view(request):
    print("logout")
    logout(request)
    return HttpResponseRedirect(reverse('BasicBusinessManager:main'))


def login_view(request):
    if request.method == "POST":
        # backend finds object (get) using html - name then check its value
        if request.POST.get('submit') == 'login':
            # finds data in html looking for name in html
            login_data = request.POST.dict()
            username = login_data.get("login")
            password = login_data.get("pwd")
            remember_me = login_data.get("remember-me-checkbox")

            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                if request.user.is_authenticated:
                    print("user logged in")
                    return HttpResponseRedirect(reverse('BasicBusinessManager:main'))
            else:
                print("wrong user data")

            # Always return an HttpResponseRedirect after successfully dealing
            # with POST data. This prevents data from being posted twice if a
            # user hits the Back button.
            return HttpResponseRedirect(reverse('BasicBusinessManager:main'))
        elif request.POST.get('submit') == 'sign_up':
            # takes data from inputs by name
            sign_up_data = request.POST.dict()
            email = sign_up_data.get("sign-up-email")
            username = sign_up_data.get("sign-up-username")
            password = sign_up_data.get("sign-up-pwd")
            confirmation_password = sign_up_data.get("sign-up-confirm-pwd")
            account_type = sign_up_data.get("type-sel")

            # checks if data is filled
            error_msg = ""
            if email == "" or email is None:
                error_msg += " Empty data fields "
            if username == "" or username is None:
                error_msg += " Empty data fields "
            if error_msg != "":
                return render(request, 'BasicBusinessManager/WebHtmls/EN/Main.html',{'wrong_pwd':error_msg})   

            # checks account type then creates user and his child object. Before chcecks if both passwords are the same
            if (password == confirmation_password) and (password != "" and confirmation_password != ""):
                if account_type == "Client":
                    user = User.objects.create_user(username, email, password)
                    client = Client.objects.create_client(user)
                    user.save()
                    client.save()
                elif account_type == "Employee":
                    user = User.objects.create_user(username, email, password)
                    employee = Employee.objects.create_employee(user)
                    user.save()
                    employee.save()
                elif account_type == "Business client":
                    user = User.objects.create_user(username, email, password)
                    owner = CompanyOwner.objects.create_owner(user)
                    user.save()
                    owner.save()
                return HttpResponseRedirect(reverse('BasicBusinessManager:main'))
            else: 
                # if passwords are incorrect it renderds en/login/ page showing modal with "wrong password" info
                return render(
                    request,
                    'BasicBusinessManager/WebHtmls/EN/Main.html',
                    {'wrong_pwd': "Password and Confirmation password are not the same or empty !"}
                )

    return render(request, 'BasicBusinessManager/WebHtmls/EN/Main.html')


class AccountVerifying:
    def authenticate(self, request, username=None, password=None):
        # Check the username/password and return a user.
        ...


#                 #
# REST - Viewsets #
#                 #
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    permission_classes = [IsOwnerOrReadOnly]
    try:
        queryset = User.objects.all()
        serializer_class = UserSerializer
        lookup_field = 'username'  # it shows what is primary key for lookup detail field
    except Exception:
        User.HTTP_404_NOT_FOUND


class EmployeeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    permission_classes = [IsOwnerOrReadOnly]
    try:
        queryset = Employee.objects.all()
        serializer_class = EmployeeSerializer
        permission_classes = [IsOwnerOrReadOnly]
    except Exception:
        Employee.HTTP_404_NOT_FOUND


class ClientViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsOwnerOrReadOnly]


class ExamplePagination(pagination.PageNumberPagination):
    page_size = 100


class OrderViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    # pagination_class = ExamplePagination
    pagination.PageNumberPagination.page_size = 12
    # permission_classes = [IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend]  # filtering
    filterset_fields = ['delivered', 'deliverant']


class CompanyOwnerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CompanyOwner.objects.all()
    serializer_class = CompanyOwnerSerializer
    permission_classes = [IsOwnerOrReadOnly]


class RoleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsOwnerOrReadOnly]


# class ProductFilter(django_filters.FilterSet):
#     """
#     Filter that only returns products being sold by company.
#     """    
#     def filter_queryset(self, request, queryset, view):
#         return queryset.filter(owner=request.user)
#     class Meta:
#         model = Product
# class IsOwnerFilterBackend(filters.BaseFilterBackend):
# class PurchaseList(generics.ListAPIView):
#     serializer_class = ProductSerializer

#     def get_queryset(self):
#         """
#         Optionally restricts the returned purchases to a given user,
#         by filtering against a `username` query parameter in the URL.
#         """
#         queryset = Product.objects.all()
#         sellers = self.request.query_params.get('sellers', None)
#         if username is not None:
#             queryset = queryset.filter(Product.sellers__id=username)
#         return queryset


class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):  # override get in Viewset
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Product.objects.all()
        sellers = self.request.query_params.getlist('sellers', None)
        sellers = list(map(lambda x: int(x), sellers))

        if sellers is not None:
            queryset = self.queryset
            queryset = queryset.filter(sellers__in=sellers)
        return queryset
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['visible']


class SaleOutOwnerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Sale_out.objects.all()
    serializer_class = SaleOutSerializer
    permission_classes = [IsOwnerOrReadOnly]


class CompanyViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsOwnerOrReadOnly]


class SectorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Sector.objects.all()
    serializer_class = SectorSerializer
    permission_classes = [IsOwnerOrReadOnly]
