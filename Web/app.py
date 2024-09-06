from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient("mongodb://book_group:6kF17Y3u5h6cfVFpiZ6OBsLVQ2YmrcM5@macragge.reika.io:47017/?authSource=books")
db = client.books_group  # Specify the database name

@app.route('/')
def welcome():
    return("Your next read is here")
