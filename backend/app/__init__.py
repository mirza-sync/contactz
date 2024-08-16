from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
import os
from dotenv import load_dotenv
from marshmallow import Schema, fields, ValidationError

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)


class ContactSchema(Schema):
    _id = fields.Str(dump_only=True)
    name = fields.Str(required=True)
    contactNo = fields.Str(required=True)


contact_schema = ContactSchema()
contacts_schema = ContactSchema(many=True)

db = mongo.db

CORS(app)


@app.route("/")
def index():
    return "<h1>Hello World</h1>"


@app.route("/contact", methods=["POST"])
def create_contact():
    try:
        data = contact_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    try:
        res = db.contacts.insert_one(data)
        contact = db.contacts.find_one({"_id": res.inserted_id})

        if contact:
            contact["id"] = str(contact["_id"])
            return jsonify(contact_schema.dump(contact)), 200

    except Exception as e:
        print("Create contact error:", e)
        return jsonify(
            {
                "message": "Error creating contact",
            }
        )


@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = []
    try:
        contacts = db.contacts.find()
        return jsonify(contacts_schema.dump(contacts)), 200
    except Exception as e:
        print("Get contacts error:", e)
        return jsonify(
            {
                "message": "Error fetching contacts",
            }
        )


if __name__ == "__main__":
    app.run(debug=True)
