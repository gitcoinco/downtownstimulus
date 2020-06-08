from .models import User, Donation, Business
from django.db.models.signals import post_save
from django.dispatch import receiver

from .utils import get_mail_body
from .services import send_mail


@receiver(post_save, sender=User)
def send_register_mail(sender, instance, **kwargs):
    print('Hello User ! Your Account Created')
    params = {
        'user_email': instance.email,
        'user_name': instance.first_name
    }
    subject = "Thanks for Creating an Account on Downtown Stimulus"

    try:
        mail_body = get_mail_body('create_account', params)
        send_mail(params['user_email'], subject, mail_body)
    except Exception as e:
        print(e)


@receiver(post_save, sender=Donation)
def send_donation_mail(sender, instance, **kwargs):
    print('Hello User ! Your Donation is Done')
    params = {
        'user_email': instance.donor.email,
        'user_name': instance.donor.first_name,
        'donation_amount': instance.amount,
        'donation_recipient': instance.recipient,
        'transaction_id': instance.transaction_id,
    }

    subject = "Thanks for sending You Donation to " + params['donation_recipient']

    try:
        mail_body = get_mail_body('new_donation', params)
        send_mail(params['user_email'], subject, mail_body)
    except Exception as e:
        print(e)


@receiver(post_save, sender=Business)
def send_business_mail(sender, instance, **kwargs):
    print('Hello User ! Your Business Listed Created')

    params = {
        'owner_email': instance.owner_email,
        'business_name': instance.name
    }

    subject = "Thanks for Listing Your Business on Downtown Stimulus"

    try:
        mail_body = get_mail_body('new_business', params)
        send_mail(params['owner_email'], subject, mail_body)
    except Exception as e:
        print(e)
