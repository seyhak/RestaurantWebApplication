from django.contrib import admin
from .models.order_related_objects.company import Company, Sector
from .models.order_related_objects.order import Order
from .models.order_related_objects.product import Product
from .models.order_related_objects.product import Sale_out
from .models.users.client import Client
from .models.users.company_owner import CompanyOwner
from .models.users.employee import Employee, Role
# Register your models here.
'''class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3'''

#modifying admin site for Emloyees 
class EmployeeAdmin(admin.ModelAdmin):
    '''fieldsets = [
        (None,               {'fields': ['user.name']}),
        ('role', {'fields': ['role.name']}),
    ]'''
    #inl'''ines = [ChoiceInline]
    #list_display = ('name', 'role','workplace')
    list_display = ('user','get_workplaces')
    #list_filter = ['role','workplace']
    #search_fields = ['name']

#registering models to admin site
admin.site.register(Company)
admin.site.register(Sector)
admin.site.register(Product)
admin.site.register(Sale_out)
admin.site.register(Client)
admin.site.register(CompanyOwner)
admin.site.register(Employee,EmployeeAdmin)
admin.site.register(Role)
admin.site.register(Order)