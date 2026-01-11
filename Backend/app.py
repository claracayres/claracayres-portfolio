"""
Backend Flask Simplificado para Desenvolvimento Local
As rotas de produção estão em /api/ (Vercel Serverless)
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("DB_NAME")]

# Helper function
def convert_id(data):
    """Converte ObjectId para string"""
    if isinstance(data, list):
        for item in data:
            item["_id"] = str(item["_id"])
    elif isinstance(data, dict):
        data["_id"] = str(data["_id"])
    return data

# Generic CRUD handler
def crud_handler(collection_name):
    """Handler genérico de CRUD para qualquer coleção"""
    collection = db[collection_name]
    
    if request.method == 'GET':
        items = list(collection.find())
        return jsonify(convert_id(items))
    
    elif request.method == 'POST':
        data = request.json
        result = collection.insert_one(data)
        new_item = collection.find_one({"_id": result.inserted_id})
        return jsonify(convert_id(new_item)), 201

def crud_item_handler(collection_name, item_id):
    """Handler genérico para operações em item específico"""
    collection = db[collection_name]
    
    if request.method == 'PUT':
        data = request.json
        data.pop("_id", None)
        collection.update_one({"_id": ObjectId(item_id)}, {"$set": data})
        updated = collection.find_one({"_id": ObjectId(item_id)})
        return jsonify(convert_id(updated))
    
    elif request.method == 'DELETE':
        collection.delete_one({"_id": ObjectId(item_id)})
        return jsonify({"message": "Deleted"})

# Health check
@app.route("/")
def home():
    return jsonify({"status": "OK", "database": os.getenv("DB_NAME")})

# Skills Routes
@app.route("/api/skills", methods=["GET", "POST"])
def skills():
    return crud_handler("skills")

@app.route("/api/skills/<skill_id>", methods=["PUT", "DELETE"])
def skill_item(skill_id):
    return crud_item_handler("skills", skill_id)

# Projects Routes
@app.route("/api/projects", methods=["GET", "POST"])
def projects():
    return crud_handler("projects")

@app.route("/api/projects/<project_id>", methods=["PUT", "DELETE"])
def project_item(project_id):
    return crud_item_handler("projects", project_id)

# Achievements Routes
@app.route("/api/achievements", methods=["GET", "POST"])
def achievements():
    return crud_handler("achievements")

@app.route("/api/achievements/<achievement_id>", methods=["PUT", "DELETE"])
def achievement_item(achievement_id):
    return crud_item_handler("achievements", achievement_id)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
