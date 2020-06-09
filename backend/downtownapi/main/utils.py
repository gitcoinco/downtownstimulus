
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


def translate_data(grants_data):
    """
        translates django grant data structure to a list of lists
        args:
            django grant data structure
                {
                    'id': (string) ,
                    'contibutions' : [
                        {
                            contributor_profile (str) : contribution_amount (int)
                        }
                    ]
                }
        returns:
            list of lists of grant data
                [[grant_id (str), user_id (str), contribution_amount (float)]]
    """
    grants_list = []
    for g in grants_data:
        grant_id = g.get('id')
        for c in g.get('contributions'):
            val = [grant_id] + [list(c.keys())[0], list(c.values())[0]]
            grants_list.append(val)

    return grants_list


def aggregate_contributions(grant_contributions):
    """
        aggregates contributions by contributor
        args:
            list of lists of grant data
                [[grant_id (str), user_id (str), contribution_amount (float)]]
        returns:
            aggregated contributions by user, organized by grant
                {grant_id (str): {user_id (str): aggregated_amount (float)}}
    """
    contrib_dict = {}
    for proj, user, amount in grant_contributions:
        if proj not in contrib_dict:
            contrib_dict[proj] = {}
        contrib_dict[proj][user] = contrib_dict[proj].get(user, 0) + amount

    return contrib_dict
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
