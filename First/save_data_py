# Importing modules
import pandas as pd
import numpy as np
import json
from datetime import datetime
import plotly.graph_objects as go
import pickle


# Functions

def get_icmr_data():
	icmr_test =pd.read_csv('https://api.covid19india.org/csv/latest/tested_numbers_icmr_data.csv')[['Tested As Of',
	                                                                                'Total Samples Tested']]
	icmr_test['Tested As Of'] = icmr_test['Tested As Of'].apply(str)
	icmr_test.replace("nan", float("NaN"), inplace=True)
	icmr_test = icmr_test.dropna(subset=['Tested As Of', 'Total Samples Tested'])
	icmr_test['Tested As Of'] = icmr_test['Tested As Of'].apply(lambda x : datetime.strptime(x, "%d/%m/%Y"))
	icmr_test = icmr_test.sort_values(by='Tested As Of')[['Tested As Of', 'Total Samples Tested']]
	icmr_test.index = icmr_test['Tested As Of']
	icmr_test.index.name = 'dateannounced'
	del icmr_test['Tested As Of']
	icmr_test['daily_test'] = icmr_test['Total Samples Tested'].diff().fillna(
	                                            icmr_test['Total Samples Tested'])
	return icmr_test

def get_state_wise_test():
	state_test = pd.read_csv('https://api.covid19india.org/csv/latest/statewise_tested_numbers_data.csv')
	state_test['Updated On'] = state_test['Updated On'].apply(lambda x : datetime.strptime(x, "%d/%m/%Y"))
	st_test = state_test.groupby(by=['State', 'Updated On']).sum()
	# st_test.loc['Odisha'].sort_values(by='Updated On')[['Total Tested', 'Population NCP 2019 Projection']]
	return st_test

def date_wise(df, group_by_col='dateannounced', num_case='numcases'):
    h_num = df.groupby(by=group_by_col)[[num_case]].sum()
    h_num['total_cases'] = h_num[num_case].cumsum()
    return h_num

def add_active(full_data,  num_case='numcases'):
    full_data = full_data.rename(columns={num_case:'Confirmed'})
    full_data.replace(float("NaN"), 0, inplace=True)

    full_data['Recovered'] = full_data['Recovered'].apply(int)
    full_data['Deceased'] = full_data['Deceased'].apply(int)

    full_data['Active'] = full_data['Confirmed'] - full_data['Recovered'] - full_data['Deceased']
    return full_data

def combine_data(group_by, num_case='numcases'):
    full_data = h_data.groupby(by=group_by)[[num_case]].sum()
    full_data['Recovered'] = r_data.groupby(by=group_by)[[num_case]].sum()
    full_data['Deceased'] = d_data.groupby(by=group_by)[[num_case]].sum()

    return add_active(full_data=full_data, num_case=num_case)

def state_wise_file(state):
    # st_h = state_wise(h_data, state)
    st_h = h_data.groupby(by=['detectedstate', 'dateannounced'])[['numcases']].sum().loc[state]
    st_h['total_cases'] = st_h['numcases'].cumsum()
    st_r = pd.DataFrame(index=st_h.index, columns=st_h.columns)
    st_r.numcases = 0
    
    st_d = pd.DataFrame(index=st_h.index, columns=st_h.columns)
    st_d.numcases = 0
    try:
        st_r = r_data.groupby(by=['detectedstate', 'dateannounced'])[['numcases']].sum().loc[state]
    except:
        print("st_r warning")
    st_r['total_cases'] = st_r['numcases'].cumsum()
    try:
        st_d = d_data.groupby(by=['detectedstate', 'dateannounced'])[['numcases']].sum().loc[state]
    except:
        print("st_d warning")
    st_d['total_cases'] = st_d['numcases'].cumsum()

	#     Test
    state_test = st_test.loc[state][['Total Tested']]
    state_test['daily_test'] = state_test['Total Tested'].diff().fillna(
                                            state_test['Total Tested']).apply(int)
    state_test.index.name = 'dateannounced'

    state_df = pd.merge(st_h, st_r, on='dateannounced', how='outer', 
             suffixes=('_h', '')).sort_values(by='dateannounced')
    state_df = pd.merge(state_df, st_d, on='dateannounced', how='outer', 
             suffixes=('_r', '_d')).sort_values(by='dateannounced')
    state_df = pd.merge(state_df, state_test, on='dateannounced', how='outer').sort_values(by='dateannounced')
    return state_df

def dist_data(h_dist, r_dist, d_dist, statecode, num_case='numcases'):
    dist_data = h_dist.loc[statecode]
    try:
        dist_data['Recovered'] = r_dist.loc[statecode]
    except:
        dist_data['Recovered'] = [0]*dist_data.shape[0]
        
    try:
        dist_data['Deceased'] = d_dist.loc[statecode]
    except:
        dist_data['Deceased'] = [0]*dist_data.shape[0]
        
    dist_data = add_active(dist_data, num_case)
    return dist_data

def dist_wise(data, state, district):
    try:
        p = data.loc[state, district]
        dist_tl = p[['numcases']]
        dist_tl['total_cases'] = dist_tl['numcases'].cumsum()
        return dist_tl
    except:
        dist_tl = pd.DataFrame(columns=['numcases'], index=h_dist.loc[state, district].index)
        dist_tl['numcases'] = [0] * dist_tl.shape[0]
        dist_tl['total_cases'] = dist_tl['numcases'].cumsum()
        return dist_tl
 



# Load the database
with open('data/data_live.pkl', 'rb') as f:
    data = pickle.load(f)

# ICMR Testing data

icmr_test = get_icmr_data()

# State Test

st_test = get_state_wise_test()


h_data = data[data['currentstatus']=='Hospitalized']
r_data = data[data['currentstatus']=='Recovered']
d_data = data[data['currentstatus']=='Deceased']

# Datewise number and cumsum

h_num = date_wise(h_data)
r_num = date_wise(r_data)
d_num = date_wise(d_data)

india_df = pd.merge(h_num, r_num, on='dateannounced', how='outer', suffixes=('_h', '')).sort_values(by='dateannounced')
india_df = pd.merge(india_df, d_num, on='dateannounced', how='outer', suffixes=('_r', '_d')).sort_values(by='dateannounced')
india_df = pd.merge(india_df, icmr_test, on='dateannounced', how='outer').sort_values(by='dateannounced')


india_df = india_df.replace(to_replace=float("Nan"), value=int(0))
india_df['total_cases_h'] = india_df['numcases_h'].cumsum()
india_df['total_cases_r'] = india_df['numcases_r'].cumsum()
india_df['total_cases_d'] = india_df['numcases_d'].cumsum()
india_df['Total Samples Tested'] = india_df['daily_test'].cumsum()
india_df = india_df.astype(int)
# ============================================================================================================================================
# Saving India Numbers with testing 
india_df.to_csv("serverData/india_till_date.csv")
print("Saved India Data")
# ============================================================================================================================================

# State Data

state_data = combine_data(group_by='detectedstate')
test = []
# Add test data for each state
for i in state_data.index:
    try:
        j = -1
        k = 0
        while k==0:
            k = st_test.loc[i]['Total Tested'].tail(1-j).values[j]
            j -= 1
        test.append(int(k))
    except:
        test.append(0)
state_data['total_test'] = test

# ============================================================================================================================================
# Saving All State Numbers with testing
state_data.to_csv("serverData/all_state_till_date.csv")
print("Saved All State Data")

# ============================================================================================================================================


# One file for each State timeline

# ============================================================================================================================================
# Saving each State wise file with testing
print("Saving Each State Numbers")
for st in data.detectedstate.unique():
#     tmp_df = state_wise_file(st)
    if st!="State Unassigned" and st!="":
        tmp_df = state_wise_file(st);
		# tmp_df = tmp_df.replace(to_replace=float("Nan"), value=0)
  #       tmp_df['total_cases_h'] = tmp_df['numcases_h'].cumsum()
  #       tmp_df['total_cases_r'] = tmp_df['numcases_r'].cumsum()
  #       tmp_df['total_cases_d'] = tmp_df['numcases_d'].cumsum()
  #       tmp_df = tmp_df.astype(int)
        tmp_df.to_csv("serverData/statewise/"+str(st)+".csv")

        print(st , end = ", ")
print()
# ============================================================================================================================================



# Statewise all dist timeline
h_dist = h_data.groupby(by=['statecode', 'detecteddistrict'])[['numcases']].sum()
r_dist = r_data.groupby(by=['statecode', 'detecteddistrict'])[['numcases']].sum()
d_dist = d_data.groupby(by=['statecode', 'detecteddistrict'])[['numcases']].sum()



# ============================================================================================================================================
# Saving each State wise file with testing
print("Saving States")
for state in data.statecode.unique():
	if state!="" and st!='State Unassigned':
		tmp_df = dist_data(h_dist, r_dist, d_dist, state, 'numcases')
# 		tmp_df = tmp_df.replace(to_replace=float("Nan"), value=int(0))
#       tmp_df['total_cases_h'] = tmp_df['numcases_h'].cumsum()
#       tmp_df['total_cases_r'] = tmp_df['numcases_r'].cumsum()
#       tmp_df['total_cases_d'] = tmp_df['numcases_d'].cumsum()
#       tmp_df = tmp_df.astype(int)
		tmp_df.to_csv("serverData/all_dist_till_date_statewise/"+str(state)+".csv")
		print(state , end = ", ")
print()
# ============================================================================================================================================


# Distwise timeline perday

h_dist = h_data.groupby(by=['detectedstate', 'detecteddistrict', 'dateannounced'])[['numcases']].sum()
r_dist = r_data.groupby(by=['detectedstate', 'detecteddistrict', 'dateannounced'])[['numcases']].sum()
d_dist = d_data.groupby(by=['detectedstate', 'detecteddistrict', 'dateannounced'])[['numcases']].sum()

def dist_wise(data, state, district):
    try:
        p = data.loc[state, district]
        dist_tl = p[['numcases']]
        dist_tl['total_cases'] = dist_tl['numcases'].cumsum()
        return dist_tl
    except:
        dist_tl = pd.DataFrame(columns=['numcases'], index=h_dist.loc[state, district].index)
        dist_tl['numcases'] = [0] * dist_tl.shape[0]
        dist_tl['total_cases'] = dist_tl['numcases'].cumsum()
        return dist_tl
 

dt = list(zip(*h_data.groupby(by=['detectedstate', 'detecteddistrict'])[['numcases']].sum().index.unique()))[0]
state_list = list(set(dt))

for st in state_list:
    if st!="" and st!="State Unassigned":
        print("Saving for State ", st, end=": ")
        dist_list = h_data.groupby(by=['detectedstate', 'detecteddistrict'])[['numcases']].sum().loc[st].index.unique()

        for dist in dist_list:
            if dist!="":
				# print(st, dist)
                dist_df = pd.merge(dist_wise(h_dist, st, dist), dist_wise(r_dist, st, dist), on='dateannounced', how='outer', 
                                   suffixes=('_h', '')).sort_values(by='dateannounced')

                dist_df = pd.merge(dist_df, dist_wise(d_dist, st, dist), on='dateannounced', how='outer', 
                         suffixes=('_r', '_d')).sort_values(by='dateannounced')
                dist_df = dist_df.replace(to_replace=float("Nan"), value=int(0))
                dist_df['total_cases_h'] = dist_df['numcases_h'].cumsum()
                dist_df['total_cases_r'] = dist_df['numcases_r'].cumsum()
                dist_df['total_cases_d'] = dist_df['numcases_d'].cumsum()
                # dist_df['Total Tested'] = dist_df['daily_test'].cumsum()
                dist_df = dist_df.astype(int)
				# print(dist_df.shape)

# ============================================================================================================================================
                # Saving each dist timeline
                dist_df.to_csv("serverData/districtwise/"+st+"/"+dist+".csv")
                print(dist, end=", ")
        print()

# ============================================================================================================================================
