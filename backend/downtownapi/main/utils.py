
import premailer

from django.contrib.auth.backends import ModelBackend
from django.template.loader import render_to_string

from .models import User

def premailer_transform(html):
    p = premailer.Premailer(html, base_url='http://127.0.0.1:8000/')
    return p.transform()


def get_mail_body(mail_name, mail_params):
    response_html = premailer_transform(render_to_string("emails/" + mail_name + ".html", mail_params))
    return response_html


class OAuthBackend(ModelBackend):
    """Log in to Django with Oauth.

    """
    def authenticate(self, oauth_uuid=None):
        try:
            if oauth_uuid:
                return User.objects.get(oauth_uuid=oauth_uuid)
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None