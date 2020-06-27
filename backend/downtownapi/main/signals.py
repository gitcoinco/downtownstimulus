from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text

from .utils import get_mail_body, account_activation_token
from .services import send_mail
from .models import User, Donation, Business


@receiver(post_save, sender=User)
def send_register_mail(sender, instance, **kwargs):
    print(instance.oauth_uuid)
    if kwargs['created']:
        if instance.oauth_uuid:
            print('Hello User ! Your Account Created')
            params = {
                'user_name': instance.first_name,
            }
            subject = "Welcome to the Downtown Stimulus! Your Account is Created"

            try:
                mail_body = get_mail_body('create_account', params)
                print(mail_body)
                send_mail(instance.email, subject, mail_body)
            except Exception as e:
                print(e)
        else:
            print('Hello User ! Your Account Created')
            current_site = 'https://downtownstimulus.com'
            uid = urlsafe_base64_encode(force_bytes(instance.pk))
            token = account_activation_token.make_token(instance)
            params = {
                'user_email': instance.email,
                'user_name': instance.first_name,
                'domain': current_site,
                'uid': uid,
                'token': token,
                'user': instance,
            }
            subject = "Thanks for Creating an Account on Downtown Stimulus"

            try:
                mail_body = get_mail_body('create_account', params)
                print(mail_body)
                send_mail(instance.email, subject, mail_body)
            except Exception as e:
                print(e)



@receiver(post_save, sender=Donation)
def send_donation_mail(sender, instance, **kwargs):
    if kwargs['created']:
        print('Hello User ! Your Donation is Done')
        params = {
            'user_email': instance.donor.email,
            'user_name': instance.donor.first_name,
            'donation_amount': instance.donation_amount,
            'donation_recipient': instance.recipient.name,
            'transaction_id': instance.transaction_id,
        }

        subject = "Thank you for donating to " + params['donation_recipient']

        try:
            mail_body = get_mail_body('new_donation', params)
            print(mail_body)
            send_mail(params['user_email'], subject, mail_body)
        except Exception as e:
            print(e)
