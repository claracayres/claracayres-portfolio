from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os
import json

app = Flask(__name__)
CORS(app)

# Mongo connection
def get_db():
    client = MongoClient(os.environ.get("MONGO_URI"))
    return client[os.environ.get("DB_NAME")]

@app.route("/api/projects", methods=["GET"])
def get_projects():
    db = get_db()
    projects = list(db.projects.find())
    for p in projects:
        p["_id"] = str(p["_id"])
    return jsonify(projects)

@app.route("/api/projects", methods=["POST"])
def create_project():
    try:
        db = get_db()
        data = request.json
        
        if not data.get("titleKey"):
            return jsonify({"error": "titleKey é obrigatório"}), 400
            
        result = db.projects.insert_one(data)
        new_project = db.projects.find_one({"_id": result.inserted_id})
        new_project["_id"] = str(new_project["_id"])
        
        return jsonify(new_project), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/projects/<project_id>", methods=["PUT"])
def update_project(project_id):
    try:
        db = get_db()
        data = request.json
        data.pop("_id", None)
        
        result = db.projects.update_one(
            {"_id": ObjectId(project_id)},
            {"$set": data}
        )
        
        if result.matched_count == 0:
            return jsonify({"error": "Projeto não encontrado"}), 404
            
        updated_project = db.projects.find_one({"_id": ObjectId(project_id)})
        updated_project["_id"] = str(updated_project["_id"])
        
        return jsonify(updated_project)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/projects/<project_id>", methods=["DELETE"])
def delete_project(project_id):
    try:
        db = get_db()
        result = db.projects.delete_one({"_id": ObjectId(project_id)})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Projeto não encontrado"}), 404
            
        return jsonify({"message": "Projeto deletado com sucesso"})
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Handler para Vercel
def handler(request):
    return app(request.environ, start_response)