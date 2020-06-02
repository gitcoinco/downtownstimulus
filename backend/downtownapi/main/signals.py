from .models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from .utils import get_mail_body
from .services import send_mail

@receiver(post_save, sender=User)
def send_register_mail(sender, instance, **kwargs):
    print('Hello User ! Your Account Created')
    user_email = instance.email
    user_name = instance.first_name
    subject = "Thanks for Creating an Account on Downtown Stimulus"

    mail_body = get_mail_body('create_account', {user_email, user_name})
    send_mail(user_email, subject, mail_body)