from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
import os
from dotenv import load_dotenv
from marshmallow import Schema, fields, ValidationError, validate

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)


class ContactSchema(Schema):
    _id = fields.Str(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1))
    contactNo = fields.Str(required=True, validate=validate.Length(min=10, max=11))


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
        return jsonify({"message": "Error creating contact"}), 500


@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = []
    try:
        contacts = db.contacts.find()
        return jsonify(contacts_schema.dump(contacts)), 200
    except Exception as e:
        print("Get contacts error:", e)
        return jsonify({"message": "Error fetching contacts"}), 500


@app.route("/contact/<id>", methods=["GET"])
def get_contact_by_id(id):
    try:
        contact = db.contacts.find_one({"_id": ObjectId(id)})
        if contact:
            return jsonify(contact_schema.dump(contact)), 200
        else:
            return jsonify({"message": "Contact not found"}), 404
    except Exception as e:
        print("Get contact error:", e)
        return jsonify({"message": "Error fetching contact"}), 500


@app.route("/contact/<id>", methods=["PATCH"])
def update_contact(id):
    contact = db.contacts.find_one({"_id": ObjectId(id)})
    if not contact:
        return jsonify({"message": "Contact not found"}), 404

    try:
        data = contact_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    try:
        res = db.contacts.update_one({"_id": ObjectId(id)}, {"$set": data})
        print(res)
        if res.modified_count >= 1:
            contact = db.contacts.find_one({"_id": ObjectId(id)})
            return jsonify(contact_schema.dump(contact)), 200
        else:
            return jsonify({"message": "No changes made"}), 200
    except Exception as e:
        print("Update contact error:", e)
        return jsonify({"message": "Error updating contact"}), 500


@app.route("/contact/<id>", methods=["DELETE"])
def delete_contact(id):
    try:
        res = db.contacts.delete_one({"_id": ObjectId(id)})
        if res.deleted_count >= 1:
            return jsonify({"message": "Contact deleted"}), 200
        else:
            return jsonify({"message": "Contact not found"}), 404
    except Exception as e:
        print("Delete contact error:", e)
        return jsonify({"message": "Error delete contact"}), 500


if __name__ == "__main__":
    app.run(debug=True)
