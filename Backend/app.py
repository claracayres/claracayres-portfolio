"""
Backend Flask Simplificado para Desenvolvimento Local
As rotas de produção estão em /api/ (Vercel Serverless)
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

mongo_uri = os.getenv("MONGO_URI")
db_name = os.getenv("DB_NAME", "Portfolio")

if not mongo_uri:
    raise Exception("MONGO_URI não definido no arquivo .env")

client = MongoClient(mongo_uri)
db = client[db_name]


def convert_id(data):
    """Converte ObjectId para string."""
    if isinstance(data, list):
        for item in data:
            if "_id" in item:
                item["_id"] = str(item["_id"])

    elif isinstance(data, dict):
        if "_id" in data:
            data["_id"] = str(data["_id"])

    return data


def find_item_by_id_or_slug(collection, value):
    """Busca item por ObjectId ou slug."""
    query = {"slug": value}

    if ObjectId.is_valid(value):
        query = {
            "$or": [
                {"_id": ObjectId(value)},
                {"slug": value},
            ]
        }

    return collection.find_one(query)


def crud_handler(collection_name):
    """Handler genérico de CRUD para lista."""
    collection = db[collection_name]

    if request.method == "GET":
        items = list(collection.find().sort("_id", -1))
        return jsonify(convert_id(items))

    if request.method == "POST":
        data = request.get_json() or {}

        result = collection.insert_one(data)
        new_item = collection.find_one({"_id": result.inserted_id})

        return jsonify(convert_id(new_item)), 201


def crud_item_handler(collection_name, item_id):
    """Handler genérico para operações em item específico."""
    collection = db[collection_name]

    if request.method == "GET":
        item = find_item_by_id_or_slug(collection, item_id)

        if not item:
            return jsonify({"error": "Not found"}), 404

        return jsonify(convert_id(item))

    if request.method == "PUT":
        data = request.get_json() or {}
        data.pop("_id", None)

        item = find_item_by_id_or_slug(collection, item_id)

        if not item:
            return jsonify({"error": "Not found"}), 404

        collection.update_one({"_id": item["_id"]}, {"$set": data})

        updated = collection.find_one({"_id": item["_id"]})

        return jsonify(convert_id(updated))

    if request.method == "DELETE":
        item = find_item_by_id_or_slug(collection, item_id)

        if not item:
            return jsonify({"error": "Not found"}), 404

        collection.delete_one({"_id": item["_id"]})

        return jsonify({"message": "Deleted"})


@app.route("/")
def home():
    return jsonify(
        {
            "status": "OK",
            "database": db_name,
        }
    )


@app.route("/api/skills", methods=["GET", "POST"])
def skills():
    return crud_handler("skills")


@app.route("/api/skills/<skill_id>", methods=["GET", "PUT", "DELETE"])
def skill_item(skill_id):
    return crud_item_handler("skills", skill_id)


@app.route("/api/projects", methods=["GET", "POST"])
def projects():
    return crud_handler("projects")


@app.route("/api/projects/<project_id>", methods=["GET", "PUT", "DELETE"])
def project_item(project_id):
    return crud_item_handler("projects", project_id)


@app.route("/api/achievements", methods=["GET", "POST"])
def achievements():
    return crud_handler("achievements")


@app.route("/api/achievements/<achievement_id>", methods=["GET", "PUT", "DELETE"])
def achievement_item(achievement_id):
    return crud_item_handler("achievements", achievement_id)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5000)