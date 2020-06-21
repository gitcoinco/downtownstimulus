import json
import math
import time
import copy
import random
import numpy as np
import pandas as pd 
from pprint import pprint



'''
    reads in sample data with number of businesses, round size, and randomization parameters
    args: 
        csv_filename
            'filename.csv' 
        _seed
            int
        _num_biz
            int
        _contribs
            int
    returns: 
        list of lists data with parameters
            [[grant_id (str), user_id (str), contribution_amount (float)]]
'''
def get_data(csv_filename, _seed=9, _num_biz=8, _contribs=1000):
    df = pd.read_csv(csv_filename)

    # generate random business ids
    random.seed(_seed)
    selected_ids = random.sample(range(100), _num_biz)
    
    # get relevant columns and restrict round size
    rel = ['grant_id', 'contributor_profile_id', 'amount_per_period_usdt']
    f = df[rel]
    f = f.iloc[0:_contribs]

    # randomly populate grant ids
    # np.random.seed(_seed)
    # f['grant_id'] = np.random.choice(selected_ids, size=len(f))

    # numeric to str
    f.loc[:, 'grant_id'] = f.loc[:, 'grant_id'].astype(str)
    
    # create list of lists from dataframe
    ll = f.T.values.T.tolist()

    # mix it up
    random.seed(_seed)
    mix = random.sample(ll, len(ll))

    return mix



'''
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
'''
def translate_data(grants_data):
    grants_list = []
    for g in grants_data:
        grant_id = g.get('id')
        for c in g.get('contributions'):
            val = [grant_id] + [list(c.keys())[0], list(c.values())[0]]
            grants_list.append(val)

    return grants_list



'''
    aggregates contributions by contributor
    args: 
        list of lists of grant data
            [[grant_id (str), user_id (str), contribution_amount (float)]]
    returns: 
        aggregated contributions by user, organized by grant
            {grant_id (str): {user_id (str): aggregated_amount (float)}}
'''
def aggregate_contributions(grant_contributions):
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



if __name__ == '__main__':
    data = get_data('testing.csv', _contribs=200)  # 142
    data_agg = aggregate_contributions(data)
    totals, bigtot, sp = calculate_clr(data_agg)
    print(f'past saturation point?: {sp} w/ total pot @ {bigtot}')
    pprint(totals)



'''
results for 141 and 142 contributions
past saturation point?: False w/ total pot @ 24844.538740555377
[{'clr_amount': 3041.183077725673, 'id': '17'},
 {'clr_amount': 5108.96906073675, 'id': '47'},
 {'clr_amount': 6250, 'id': '59'},
 {'clr_amount': 720.6434705877829, 'id': '78'},
 {'clr_amount': 4050.201367913871, 'id': '86'},
 {'clr_amount': 2587.4232337582002, 'id': '23'},
 {'clr_amount': 2358.428233897319, 'id': '34'},
 {'clr_amount': 727.6902959357832, 'id': '0'}]
past saturation point?: True w/ total pot @ 25587.716151776673
[{'clr_amount': 3041.183077725673, 'id': '17'},
 {'clr_amount': 5852.146471958044, 'id': '47'},
 {'clr_amount': 6250, 'id': '59'},
 {'clr_amount': 720.6434705877829, 'id': '78'},
 {'clr_amount': 2587.4232337582, 'id': '23'},
 {'clr_amount': 4050.201367913871, 'id': '86'},
 {'clr_amount': 2358.428233897319, 'id': '34'},
 {'clr_amount': 727.6902959357832, 'id': '0'}]
'''