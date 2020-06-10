from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now
from django.contrib.postgres.fields import ArrayField

DONATION_STATUS = (("Success", "Success"), ("Failure", "Failure"), ("Pending", "Pending"))


# Create your models here.

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    profile_pic = models.CharField(max_length=1024, blank=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    oauth_uuid = models.CharField(max_length=256, blank=True, null=True)
    is_email_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.get_full_name() + ' - ' + str(self.id)


class Business(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, blank=False)
    owner_email = models.EmailField(null=False, blank=False)

    # Business Text Bases Content Field
    short_description = models.CharField(max_length=280, blank=False)
    history = models.TextField(blank=False)
    covid_story = models.TextField(blank=False)
    other_content = models.TextField(blank=False)

    # Business Graphic based content fields (Images/Videos)
    logo = models.TextField(blank=False)
    cover_image = models.TextField(blank=False)
    main_business_image = models.TextField(blank=False)
    staff_images = ArrayField(models.TextField(blank=True))
    business_video_link = models.TextField(blank=True)

    # Business Social Media Related Fields
    website_link = models.CharField(max_length=512, blank=True, null=True)
    facebook_profile_link = models.CharField(max_length=512, blank=True, null=True)
    instagram_profile_link = models.CharField(max_length=512, blank=True, null=True)

    # Business donation related field
    stripe_id = models.CharField(max_length=255, blank=False)
    expenditure_details = ArrayField(models.TextField(blank=False))
    goal_amount = models.FloatField(blank=False, default=0.00)
    donation_received = models.FloatField(blank=False, default=0.00)
    current_clr_matching_amount = models.DecimalField(default=1, decimal_places=4, max_digits=50)
    saturation = models.BooleanField(default=False)

    def __str__(self):
        return self.name + ' - ' + str(self.id)


class Donation(models.Model):
    id = models.AutoField(primary_key=True)
    round_number = models.PositiveIntegerField(blank=True, null=True)
    donation_amount = models.FloatField(blank=False, null=False)
    donor = models.ForeignKey(User, on_delete=models.CASCADE)
    recipient = models.ForeignKey(Business, on_delete=models.CASCADE)
    donation_time = models.DateTimeField(null=False, default=now)
    transaction_id = models.CharField(null=False, blank=False, max_length=255)
    match = models.BooleanField(default=True, help_text='Whether or not this contribution should be matched.')
    donation_status = models.CharField(choices=DONATION_STATUS, max_length=128, default="Pending",
                                       help_text='The status of donation '
                                                 'transaction')

    def __str__(self):
        return str(self.recipient.name) + ' - ' + str(self.donation_amount) + ' - ' + str(self.id)
