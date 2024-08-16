from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)
db = mongo.db.contacts

CORS(app)


@app.route("/")
def index():
    return "<h1>Hello World</h1>"


if __name__ == "__main__":
    app.run(debug=True)
