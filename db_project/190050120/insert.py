import psycopg2
import argparse
import os
import sys
import csv
from psycopg2 import extras
from psycopg2 import sql

parser = argparse.ArgumentParser()

parser.add_argument('--name', metavar='name', type=str)
parser.add_argument('--user', metavar='user', type=str)
parser.add_argument('--pswd', metavar='pswd', type=str)
parser.add_argument('--host', metavar='host', type=str)
parser.add_argument('--port', metavar='port', type=int)
parser.add_argument('--ddl', metavar='ddl', type=str)
parser.add_argument('--data', metavar='data', type=str)

args = parser.parse_args()
# str1="user="+args.user+" password="+args.pswd+" host="+args.host+" port="+str(args.port)
# print(str1)
# conn = psycopg2.connect(str1)
# conn.autocommit = True
# cur = conn.cursor()
if not os.path.exists(args.ddl):
    print('ddl path specified does not exist')
    sys.exit()
if not os.path.isdir(args.data):
    print('data path specified does not exist')
    sys.exit()
f=['']*9
r=['']*9
r1=[[],[],[],[],[],[],[],[],[]]
with open(os.path.join(args.data, 'team.csv'), 'r') as f[0], open(os.path.join(args.data, 'owner.csv'), 'r') as f[1], open(os.path.join(args.data, 'umpire.csv'), 'r') as f[2], open(os.path.join(args.data, 'venue.csv'), 'r') as f[3], open(os.path.join(args.data, 'player.csv'), 'r') as f[4], open(os.path.join(args.data, 'match.csv'), 'r') as f[5], open(os.path.join(args.data, 'umpire_match.csv'), 'r') as f[6], open(os.path.join(args.data, 'player_match.csv'), 'r') as f[7], open(os.path.join(args.data, 'ball_by_ball.csv'), 'r') as f[8]:
    for i in range(0, 9):
        r[i]=csv.reader(f[i])
    for rr in range(len(r)):
        for row in r[rr]:
            row1=[]
            for row2 in row:
                if row2=='NULL':
                    row1.append(None)
                else:
                    row1.append(row2)
            r1[rr].append(row1)
    dict={"team":r1[0], "owner":r1[1], "umpire":r1[2], "venue":r1[3], "player":r1[4], "match":r1[5], 'umpire_match':r1[6], 'player_match':r1[7], 'ball_by_ball':r1[8]}

# cur.execute("SELECT datname FROM pg_database;")
# list_database = cur.fetchall()
# if (args.name,) in list_database:
#     cur.execute("DROP DATABASE "+args.name+";")
# cur.execute("CREATE DATABASE "+args.name+";")
# conn.commit()
# cur.close()
# conn.close()
str1="user="+args.user+" password="+args.pswd+" dbname="+args.name+" host="+args.host+" port="+str(args.port)
conn = psycopg2.connect(str1)
cur = conn.cursor()
cur.execute(open(args.ddl, "r").read())
tables=['team', 'owner', 'umpire', 'venue', 'player', 'match', 'umpire_match', 'player_match', 'ball_by_ball']
for d in tables:
    if str(d)[0]!='.':
        f_name=str(d) 
        fields = dict[f_name][0]
        rt1=''
        for tt in fields:
            rt1=rt1+','+tt
        rt1=rt1[1:]
        queryText = "INSERT INTO {table} ("+rt1+") VALUES %s"
        query = sql.SQL(queryText).format(table=sql.Identifier(f_name))
        extras.execute_values(cur,query,dict[f_name][1:])
conn.commit()
cur.close()
conn.close()