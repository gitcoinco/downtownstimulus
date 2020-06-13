import premailer

from django.contrib.auth.backends import ModelBackend
from django.template.loader import render_to_string
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six

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
                    'contributions' : [
                        {
                            contributor_profile (str) : contribution_amount (int)
                        }
                    ]
                }
        returns:
            list of lists of grant data
                [[grant_id (str), user_id (str), contribution_amount (float)]]
    """
    # grants_list = []
    # for g in grants_data:
    #     grant_id = g.get('id')
    #     for c in g.get('contributions'):
    #         val = [grant_id] + [list(c.keys())[0], list(c.values())[0]]
    #         grants_list.append(val)
    #
    # return grants_list

    grants_list = []
    for g in grants_data:
        donor_id = g.get('donor_id')
        recipient_id = g.get('recipient_id')
        donation_amount = g.get('donation_amount')
        grants_list.append([recipient_id, donor_id, donation_amount])

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


'''
    calculates the clr amount at the given threshold and total pot
    args:
        aggregated_contributions
            {grant_id (str): {user_id (str): aggregated_amount (float)}}
        _cap
            float
        total_pot
            float
    returns:
        total clr award by grant
            [{'id': proj, 'clr_amount': clr_amount}]
        bigtot
            int
        saturation point
            boolean 
'''


def calculate_clr(aggregated_contributions, _cap=6250, total_pot=25000.0):
    saturation_point = False
    bigtot = 0
    totals = []
    for proj, contribz in aggregated_contributions.items():
        ssq = 0
        tot = 0
        for u1, v1 in contribz.items():
            # sum of square root
            ssq += v1 ** 0.5
            # sum of contributions
            tot += v1
        # non-clr pairwise formula
        clr_amount = (ssq ** 2) - tot

        # implement cap
        if clr_amount >= _cap:
            clr_amount = _cap

        # results for total
        totals.append({'id': proj, 'clr_amount': clr_amount})
        bigtot += clr_amount

    # warn if sataurated
    if bigtot >= total_pot:
        saturation_point = True

    return totals, bigtot, saturation_point


def calculate_live_clr(aggregated_contributions, business_id, _cap=6250, total_pot=25000.0):
    '''

    Calculates the CLR match for user before donation
    :param aggregated_contributions:
    :param _cap:
    :param total_pot:
    :param business_id
    :return:
    '''
    saturation_point = False
    bigtot = 0

    business_data = {}
    for proj, contribz in aggregated_contributions.items():
        ssq = 0
        tot = 0
        for u1, v1 in contribz.items():
            # sum of square root
            ssq += v1 ** 0.5
            # sum of contributions
            tot += v1
        # non-clr pairwise formula
        clr_amount = (ssq ** 2) - tot

        # implement cap
        if clr_amount >= _cap:
            clr_amount = _cap

        # results for total
        if proj == business_id:
            business_data = {'id': proj, 'clr_amount': clr_amount}
        bigtot += clr_amount

    # warn if sataurated
    if bigtot >= total_pot:
        saturation_point = True

    return business_data, bigtot, saturation_point


class OAuthBackend(ModelBackend):
    """
    Log in to Django with Oauth.
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


class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk) + six.text_type(timestamp) +
            six.text_type(user.is_active)
        )

account_activation_token = TokenGenerator()
