from django.contrib import admin

# Register your models here.
from .models import Business, User, Donation

admin.site.register(Business)
admin.site.register(User)
admin.site.register(Donation)
