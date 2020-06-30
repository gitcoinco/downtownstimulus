import os

import sendgrid

from sendgrid.helpers.mail import *


sendgrid_key = os.getenv('SENDGRID_KEY', 'NO API FOUND')
sg = sendgrid.SendGridAPIClient(sendgrid_key)
from_email = Email("help@downtownstimulus.com", 'Downtown Stimulus')

def send_mail(_to_mail, subject, body):
    to_email = To(_to_mail)
    content = Content("text/html", body)
    mail = Mail(from_email, to_email, subject, content)
    response = sg.client.mail.send.post(request_body=mail.get())


def calculate_clr(aggregated_contributions, _cap=6250, total_pot=25000.0):
    """
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
    """
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