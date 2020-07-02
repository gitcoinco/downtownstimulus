from .models import Donation, Business, User


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


def calculate_clr(aggregated_contributions, _cap=8000, total_pot=25000.0):
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

        # results for total
        totals.append({'id': proj, 'clr_amount': clr_amount})
        bigtot += clr_amount

    bigtot_normalized_cap = 0
    for t in totals:
        clr_amount = t['clr_amount']

        # 1. normalize
        if bigtot >= total_pot:
            clr_amount = ((clr_amount / bigtot) * total_pot)

        # 2. cap clr amount
        if clr_amount >= _cap:
            clr_amount = _cap

        t['clr_amount'] = clr_amount
        
        # 3. calculate the total clr to be distributed
        bigtot_normalized_cap += t['clr_amount']

    if bigtot_normalized_cap >= total_pot:
        saturation_point = True


    return totals, bigtot_normalized_cap, saturation_point


def calculate_live_clr(aggregated_contributions, business_id, _cap=8000, total_pot=25000.0):
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
    totals = []
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

        totals.append({'id': proj, 'clr_amount': clr_amount})
        bigtot += clr_amount

    bigtot_normalized_cap = 0
    for t in totals:
        clr_amount = t['clr_amount']

        # 1. normalize
        if bigtot >= total_pot:
            clr_amount = ((clr_amount / bigtot) * total_pot)

        # 2. cap clr amount
        if clr_amount >= _cap:
            clr_amount = _cap

        t['clr_amount'] = clr_amount

        # 3. calculate the total clr to be distributed
        bigtot_normalized_cap += t['clr_amount']

    for t in totals:
        if t['id'] == business_id:
            business_data = t
            break

    if bigtot_normalized_cap >= total_pot:
        saturation_point = True

    return business_data, bigtot, saturation_point, totals


def calculate_clr_match(user_id, business_id, donation_amount):
    donations = Donation.objects.values()
    donations = list(donations)

    current_donation_obj = {
        'round_number': 0,
        'donation_amount': donation_amount,
        'donor_id': user_id,
        'recipient_id': business_id,
        'transaction_id': 'string',
        'match': True,
        'donation_status': 'Success'
    }

    donations.append(current_donation_obj)

    translated_donation_data = translate_data(donations)
    aggregated_contributions = aggregate_contributions(translated_donation_data)
    calculate_clr_data, bigtot, saturation_point, business_totals = calculate_live_clr(aggregated_contributions, business_id)

    # clr_match_details = {}
    # for business in calculate_clr_data:
    #     id = business.get('id')
    #     if id == business_id:
    #         clr_match_details = business
    #         break

    matched_clr_amount = calculate_clr_data['clr_amount']

    business = Business.objects.get(pk=business_id)
    current_clr_amount = business.current_clr_matching_amount

    if float(current_clr_amount) == matched_clr_amount:
        user_match_amount = 0
    else:
        user_match_amount = matched_clr_amount - float(current_clr_amount)

    return user_match_amount, matched_clr_amount, business_totals
