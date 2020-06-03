from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now

# Create your models here.

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    profile_pic = models.CharField(max_length=1024)
    phone_number = models.CharField(max_length=20, blank=False)
    oauth_uuid = models.CharField(max_length=256)

    def __str__(self):
        return self.get_full_name() + ' - ' + str(self.id)


class Business(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, blank=False)
    logo = models.CharField(max_length=256, blank=False)
    short_description = models.CharField(max_length=280, blank=False)
    history = models.TextField(blank=False)
    covid_story = models.TextField(blank=False)
    images = models.TextField(blank=True)
    other_content = models.TextField(blank=False)
    expenditure_details = models.TextField(blank=False)
    stripe_id = models.CharField(max_length=255, blank=False)
    goal_amount = models.FloatField(blank=False, default=0.00)
    donation_received = models.FloatField(blank=False, default=0.00)
    current_clr_matching_amount = models.DecimalField(default=1, decimal_places=4, max_digits=50)

    def __str__(self):
        return self.name + ' - ' + str(self.id)


class Donation(models.Model):
    id = models.AutoField(primary_key=True)
    amount = models.FloatField(blank=False, null=False)
    donor = models.ForeignKey(User, on_delete=models.CASCADE)
    recipient = models.ForeignKey(Business, on_delete=models.CASCADE)
    donation_time = models.DateTimeField(null=False, default=now)

    def __str__(self):
        return str(self.recipient.name) + ' - ' + str(self.amount) + ' - ' + str(self.id)
