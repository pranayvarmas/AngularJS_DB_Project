import csv
from faker import Faker
from faker_food import FoodProvider
import datetime
import random

def items_g(item_num):
    records = item_num
    headers = ["item_id", "item_name", "item_type", "availability", "price"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/items.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, records+1):
            writer.writerow({
                    "item_id" : i,
                    "item_name" : "'"+fake.dish()+"'",
                    "item_type" : random.choice(["'food'", "'beverage'"]),
                    "price" : random.choice(range(1, 500)),
                    "availability" : random.choice(range(10))
                })
def ing_g(ing_num):
    records = ing_num
    headers = ["ing_id", "ing_name", "availability", "price"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/ingredients.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, records+1):    
            writer.writerow({
                    "ing_id" : i,
                    "ing_name" : "'"+fake.ingredient()+"'",
                    "price" : random.choice(range(1, 500)),
                    "availability" : random.choice(range(10))
                })
def item_ing(item_num, ing_num, num):
    headers = ["item_id", "ing_id", "quantity"]
    with open("./csv-files/item_ing.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, item_num+1):
            rand=random.choice(range(1, ing_num-num-1))
            for j in range(rand, rand+num):
                writer.writerow({
                        "item_id" : i,
                        "ing_id" : j,
                        "quantity" : random.choice(range(1, 5)),
                    })
def persons_g(persons_num):
    records = persons_num
    headers = ["person_id", "person_name", "person_type", "type_from", "type_to", "email", "password", "salary", "address", "phone_no"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/persons.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, records+1):    
            writer.writerow({
                    "person_id" : i,
                    "person_name" : "'"+fake.name()+"'",
                    "address" : i,
                    "phone_no" : random.choice(range(7000000000, 9999999999)),
                    "person_type" : random.choice(["'SuperUser'", "'Base Customer'", "'Premium Customer'", "'General Manager'", "'Kitchen Manager'", "'Billing Manager'", "'Delivery Manager'", "'Food Server'", "'Chef'", "'Delivery Person'"]),
                    "type_from" : random.choice(["'2012-09-22'", "'2012-12-19'", "'2012-01-12'", "'2012-10-22'"]),
                    "type_to" : random.choice(["'2013-09-22'", "'2013-12-19'", "'2013-01-12'", "'2013-10-22'"]),
                    "salary" : random.choice(range(10000, 50000)),
                    "email" : "'"+fake.email()+"'",
                    "password" : random.choice(["'password1'", "'password2'", "'password3'"])
                })
def can_g(c_num, on_order_num):
    records = c_num
    headers = ["c_id", "on_order_id", "c_reason", "date", "time"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/cancellations.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, records+1):    
            writer.writerow({
                    "c_id" : i,
                    "on_order_id" : random.choice(range(1, on_order_num+1)),
                    "c_reason" : random.choice(["'Not liked'", "'Bad process'", "'Long time'", "'Found better option'"]),
                    "date" : random.choice(["'2012-09-22'", "'2012-12-19'", "'2012-01-12'", "'2012-10-22'"]),
                    "time" : random.choice(["'02:02:09'", "'12:54:22'", "'13:55:12'", "'23:45:32'"])
                })
def dp_g(c_num):
    records = c_num
    headers = ["dp_id", "dp_name", "rating", "primary_no", "salary", "secondary_no", "phone_no"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/delivery_persons.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, records+1):    
            writer.writerow({
                    "dp_id" : i,
                    "dp_name" : "'"+fake.name()+"'",
                    "rating" : random.choice(range(6)),
                    "phone_no" : random.choice(range(7000000000, 9999999999)),
                    "primary_no" : random.choice(range(1, records+1)),
                    "secondary_no" : random.choice(range(1, records+1)),
                    "salary" : random.choice(range(10000, 50000))
                })
def coupon_g(coupon_num):
    records = coupon_num
    headers = ["coupon_id", "coupon_txt", "coupon_type", "availability", "start_date", "end_date"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/coupons.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, records+1):    
            writer.writerow({
                    "coupon_id" : i,
                    "coupon_txt" : random.choice(["'Free Discount'", "'Buy 1 get 1'", "'Bug 2 get 1'", "'50 discount'"]),
                    "coupon_type" : random.choice(["'free'", "'premium'"]),
                    "availability" : random.choice(range(10)),
                    "start_date" : random.choice(["'2012-09-22'", "'2012-12-19'", "'2012-01-12'", "'2012-10-22'"]),
                    "end_date" : random.choice(["'2013-09-22'", "'2013-12-19'", "'2013-01-12'", "'2013-10-22'"])
                })
def table_g(table_num):
    records = table_num
    headers = ["table_id", "table_type", "capacity", "price"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/tables.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, records+1):    
            writer.writerow({
                    "table_id" : i,
                    "table_type" : random.choice(["'Normal'", "'Family'", "'Booth'", "'Outdoor'"]),
                    "capacity" : random.choice(range(1, 10)),
                    "price" : random.choice(range(10, 500)),
                })
def on_order_g(on_order_num, person_num, dp_num):
    records = on_order_num
    headers = ["on_order_id", "quantity", "person_id", "dp_feedback", "item_feedback", "order_price", "order_date", "order_time", "delivery_address", "is_delivered", "is_cancelled", "estimated_time", "dp_id", "delivery_date", "delivery_time"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/online_orders.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, records+1):   
            lll= random.choice(range(1, person_num+1))
            writer.writerow({
                    "on_order_id" : i,
                    "quantity" : random.choice(range(1, 10)),
                    "person_id" : lll,
                    "order_price" : random.choice(range(1, 1000)),
                    "order_date" : random.choice(["'2012-09-22'", "'2012-12-19'", "'2012-01-12'", "'2012-10-22'"]),
                    "order_time" : random.choice(["'02:02:09'", "'12:54:22'", "'13:55:12'", "'23:45:32'"]),
                    "delivery_address" : lll,
                    "is_delivered" : True,
                    "is_cancelled" : False,
                    "dp_feedback" : False,
                    "item_feedback" : False,
                    "estimated_time" : random.choice(["'03:03:09'", "'13:53:22'", "'14:55:12'", "'23:50:32'"]),
                    "dp_id" : random.choice(range(1, dp_num+1)),
                    "delivery_date" : random.choice(["'2012-09-23'", "'2012-12-20'", "'2012-01-13'", "'2012-10-23'"]),
                    "delivery_time" : random.choice(["'03:03:09'", "'13:53:22'", "'14:55:12'", "'23:50:32'"])
                })
def off_order_g(off_order_num):
    records = off_order_num
    headers = ["off_order_id", "quantity", "order_price", "order_date", "order_time"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/offline_orders.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, records+1):    
            writer.writerow({
                    "off_order_id" : i,
                    "quantity" : random.choice(range(1, 10)),
                    "order_price" : random.choice(range(1, 1000)),
                    "order_date" : random.choice(["'2012-09-22'", "'2012-12-19'", "'2012-01-12'", "'2012-10-22'"]),
                    "order_time" : random.choice(["'02:02:09'", "'12:54:22'", "'13:55:12'", "'23:45:32'"]),
                })
def book_table_g(table_num, person_num):
    # records = book_table_num
    headers = ["booking_id", "table_id", "person_id", "booking_date", "slot"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/book_tables.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, table_num+1):    
            writer.writerow({
                    "booking_id" : i,
                    "table_id" : random.choice(range(1, table_num+1)),
                    "person_id" : random.choice(range(1, person_num+1)),
                    "booking_date" : random.choice(["'2012-09-22'", "'2012-12-19'", "'2012-01-12'", "'2012-10-22'"]),
                    "slot" : random.choice(range(1, 13))
                })
def coupon_user_g(coupon_num, person_num):
    # records = book_table_num
    headers = ["coupon_id", "person_id", "use_date", "use_time", "is_used"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/coupons_users.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, coupon_num+1):    
            writer.writerow({
                    "coupon_id" : i,
                    "person_id" : random.choice(range(1, person_num+1)),
                    "use_date" : random.choice(["'2012-09-22'", "'2012-12-19'", "'2012-01-12'", "'2012-10-22'"]),
                    "use_time" : random.choice(["'02:02:09'", "'12:54:22'", "'13:55:12'", "'23:45:32'"]),
                    "is_used" : True
                })
def dp_feedback_g(dp_num, person_num):
    # records = book_table_num
    headers = ["dp_f_id", "dp_id", "person_id", "feedback_txt", "suggestions", "rating"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/dp_feedback.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, dp_num+1):    
            writer.writerow({
                    "dp_f_id" : i,
                    "dp_id" : i,
                    "person_id" : random.choice(range(1, person_num+1)),
                    "feedback_txt" : random.choice(["'Bad'", "'Average'", "'Good'", "'Excellent'"]),
                    "suggestions" : random.choice(["'Not liked'", "'Bad process'", "'Long time'", "'Found better option'"]),
                    "rating" : random.choice(range(6))
                })
def item_feedback_g(item_num, person_num):
    # records = book_table_num
    headers = ["item_f_id", "item_id", "person_id", "feedback_txt", "suggestions", "rating"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/item_feedback.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, item_num+1):    
            writer.writerow({
                    "item_f_id" : i,
                    "item_id" : i,
                    "person_id" : random.choice(range(1, person_num+1)),
                    "feedback_txt" : random.choice(["'Bad'", "'Average'", "'Good'", "'Excellent'"]),
                    "suggestions" : random.choice(["'Not liked'", "'Bad process'", "'Long time'", "'Found better option'"]),
                    "rating" : random.choice(range(6))
                })
def off_order_items_g(off_order_num, item_num, num):
    # records = book_table_num
    headers = ["off_order_id", "item_id", "quantity"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/offline_items.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, off_order_num+1):
            rand=random.choice(range(1, item_num-num))
            for j in range(rand, rand+5):
                writer.writerow({
                        "off_order_id" : i,
                        "item_id" : j,
                        "quantity" : random.choice(range(1, 6))
                    })
def on_order_items_g(on_order_num, item_num, num):
    # records = book_table_num
    headers = ["on_order_id", "item_id", "quantity"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/online_items.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, on_order_num+1):
            rand=random.choice(range(1, item_num-num))
            for j in range(rand, rand+5):
                writer.writerow({
                        "on_order_id" : i,
                        "item_id" : j,
                        "quantity" : random.choice(range(1, 6))
                    })
def purchase_g(purchase_num):
    records = purchase_num
    headers = ["purchase_id", "quantity", "purchase_name", "purchase_date", "purchase_time"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/purchases.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, records+1):    
            writer.writerow({
                    "purchase_id" : i,
                    "quantity" : random.choice(range(1, 10)),
                    "purchase_name" : random.choice(["'merchant'", "'shop'", "'wholesale'"]),
                    "purchase_date" : random.choice(["'2012-09-22'", "'2012-12-19'", "'2012-01-12'", "'2012-10-22'"]),
                    "purchase_time" : random.choice(["'02:02:09'", "'12:54:22'", "'13:55:12'", "'23:45:32'"]),
                })
def pur_ing_g(purchase_num, ing_num, num):
    # records = book_table_num
    headers = ["purchase_id", "ing_id", "quantity"]
    fake = Faker('en_US')
    fake.add_provider(FoodProvider)
    fake1 = Faker('en_GB')   # To generate phone numbers
    with open("./csv-files/pur_ing.csv", 'wt') as csvFile:
        writer = csv.DictWriter(csvFile, fieldnames=headers)
        writer.writeheader()
        for i in range(1, purchase_num+1):
            rand=random.choice(range(1, ing_num-num))
            for j in range(rand, rand+5):
                writer.writerow({
                        "purchase_id" : i,
                        "ing_id" : j,
                        "quantity" : random.choice(range(1, 6))
                    })
if __name__ == '__main__':
    rang=9
    range_2=2
    item_num=rang
    ing_num=rang
    person_num=rang
    c_num=rang
    dp_num=rang
    coupon_num=rang
    table_num=rang
    on_order_num=rang
    off_order_num=rang
    purchase_num=rang
    items_g(item_num)
    ing_g(ing_num)
    item_ing(item_num, ing_num, range_2)
    persons_g(person_num)
    can_g(c_num, on_order_num)
    dp_g(dp_num)
    coupon_g(coupon_num)
    table_g(table_num)
    on_order_g(on_order_num, person_num, dp_num)
    off_order_g(off_order_num)
    book_table_g(table_num, person_num)
    coupon_user_g(coupon_num, person_num)
    dp_feedback_g(dp_num, person_num)
    item_feedback_g(item_num, person_num)
    off_order_items_g(off_order_num, item_num, range_2)
    on_order_items_g(on_order_num, item_num, range_2)
    purchase_g(purchase_num)
    pur_ing_g(purchase_num, ing_num, range_2)
    print("CSV generation complete!")
