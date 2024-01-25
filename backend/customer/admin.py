from django.contrib import admin
from customer.models import Address, CustomUser

# Register your models here.


admin.site.register(Address)
admin.site.register(CustomUser)
