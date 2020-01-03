from django.contrib.auth.models import User
from .models.order_related_objects.company import Company, Sector
from .models.order_related_objects.order import Order
from .models.users.employee import Employee, Role
from .models.users.company_owner import CompanyOwner
from .models.users.client import Client
from .models.order_related_objects.product import Product
from .models.order_related_objects.sale_out import Sale_out

from rest_framework import serializers


class EmployeeSerializer(serializers.ModelSerializer):
    #is needed for inheritance in this case user
     #expandable_fields = {
       #"what": (BelongingSerializer, {"source": "what"}),
      # "to_who": (FriendSerializer, {"source": "to_who"})
    username = serializers.ReadOnlyField(read_only=True, source="user.username")
    #workplace = serializers.IntegerField(read_only=True, source="workplace.name")
    workplace = serializers.PrimaryKeyRelatedField(many=True, queryset=Company.objects.all())
    orders_delivered = serializers.PrimaryKeyRelatedField(many=True, queryset=Order.objects.all())
    role = serializers.ReadOnlyField(read_only=True, source="role.name")
    class Meta:
        #user = UserSerializer()
        model = Employee
        #fields = ['username', 'workplace', 'salary_per_month', 'birthday', 'orders_delivered','address', 'role']
        fields = [field.name for field in model._meta.fields]#all
        fields.extend(['orders_delivered','workplace','username','role'])#add
        fields.append('orders_delivered')
        fields.append('workplace')
        fields.append('username')
        fields.append('role')
class UserSerializer(serializers.ModelSerializer):
    #firstname = serializers.CharField(source=User.first_name)
    #id = serializers.IntegerField(source=User.id)

    class Meta:
        model = User
        #fields = ['id','firstname']
        fields = [field.name for field in model._meta.fields]#all

class CompanyOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyOwner
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer): 
    username = serializers.CharField(read_only=True, source="user.username")
    firstname = serializers.CharField(read_only=False,source="user.first_name")
    lastname = serializers.CharField(read_only=False,source="user.last_name")

    class Meta:
        model = Client
        fields = [field.name for field in model._meta.fields]#all
        fields.extend(['username','firstname'])#add
        fields.append('firstname')
        fields.append('lastname')
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class SaleOutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale_out
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'
        
class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = '__all__'

