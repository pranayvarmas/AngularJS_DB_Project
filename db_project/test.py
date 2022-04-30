import psycopg2
import argparse
import os
import sys
import csv
from psycopg2 import extras
from psycopg2 import sql

if not os.path.exists("test.ddl"):
    print('ddl path specified does not exist')
    sys.exit()
if not os.path.isdir("./csv-files"):
    print('data path specified does not exist')
    sys.exit()
f=['']*18
r=['']*18
r1=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
with open(os.path.join("./csv-files", 'items.csv'), 'r') as f[0], \
    open(os.path.join("./csv-files", 'ingredients.csv'), 'r') as f[1], \
    open(os.path.join("./csv-files", 'persons.csv'), 'r') as f[2], \
    open(os.path.join("./csv-files", 'purchases.csv'), 'r') as f[3], \
    open(os.path.join("./csv-files", 'tables.csv'), 'r') as f[4], \
    open(os.path.join("./csv-files", 'delivery_persons.csv'), 'r') as f[5], \
    open(os.path.join("./csv-files", 'item_feedback.csv'), 'r') as f[6], \
    open(os.path.join("./csv-files", 'dp_feedback.csv'), 'r') as f[7], \
    open(os.path.join("./csv-files", 'offline_orders.csv'), 'r') as f[8], \
    open(os.path.join("./csv-files", 'online_orders.csv'), 'r') as f[9], \
    open(os.path.join("./csv-files", 'coupons.csv'), 'r') as f[10], \
    open(os.path.join("./csv-files", 'cancellations.csv'), 'r') as f[11], \
    open(os.path.join("./csv-files", 'item_ing.csv'), 'r') as f[12], \
    open(os.path.join("./csv-files", 'pur_ing.csv'), 'r') as f[13], \
    open(os.path.join("./csv-files", 'offline_items.csv'), 'r') as f[14], \
    open(os.path.join("./csv-files", 'online_items.csv'), 'r') as f[15], \
    open(os.path.join("./csv-files", 'coupons_users.csv'), 'r') as f[16]:
    # open(os.path.join("./csv-files", 'book_tables.csv'), 'r') as f[17]:
    for i in range(0, 17):
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
    dict={"items":r1[0], "ingredients":r1[1], "persons":r1[2], "purchases":r1[3], "tables":r1[4], "delivery_persons":r1[5], 'item_feedback':r1[6], 'dp_feedback':r1[7], 'offline_orders':r1[8], 'online_orders':r1[9], 'coupons':r1[10], 'cancellations':r1[11], 'item_ing':r1[12], 'pur_ing':r1[13], 'offline_items':r1[14], 'online_items':r1[15], 'coupons_users':r1[16], 'book_tables':r1[17]}

# dict={"team":r1[0], "owner":r1[1], "umpire":r1[2], "venue":r1[3], "player":r1[4], "match":r1[5], 'umpire_match':r1[6], 'player_match':r1[7], 'ball_by_ball':r1[8]}

str1="user=test password=test dbname=test host=localhost port=5432"
conn = psycopg2.connect(str1)
cur = conn.cursor()
cur.execute(open("test.ddl", "r").read())
tables=["items", "ingredients", "persons", "purchases", "tables", "delivery_persons", 'item_feedback', 'dp_feedback', 'offline_orders', 'online_orders', 'coupons', 'cancellations', 'item_ing', 'pur_ing', 'offline_items', 'online_items', 'coupons_users', 'book_tables']
with open("test.sql", "w") as out:
    for d in tables[:-1]:
        if str(d)[0]!='.':
            f_name=str(d) 
            print(f_name)
            fields = dict[f_name][0]
            rt1=''
            for tt in fields:
                rt1=rt1+','+tt
            rt1=rt1[1:]
            # queryText = "INSERT INTO {table} ("+rt1+") VALUES %s"
            # query = sql.SQL(queryText).format(table=sql.Identifier(f_name))
            # out.write(query)
            # out.write("\n")
            for u in dict[f_name][1:]:
                rt2=''
                for u1 in u:
                    rt2=rt2+','+u1
                rt2=rt2[1:]
                out.write("INSERT INTO "+f_name +"("+rt1+") VALUES ("+rt2+");\n")
conn.commit()
cur.close()
conn.close()