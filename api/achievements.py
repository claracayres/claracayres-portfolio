from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os
import json

app = Flask(__name__)
CORS(app)

def get_db():
    client = MongoClient(os.environ.get("MONGO_URI"))
    return client[os.environ.get("DB_NAME")]

@app.route("/api/achievements", methods=["GET"])
def get_achievements():
    db = get_db()
    achievements = list(db.achievements.find())
    for a in achievements:
        a["_id"] = str(a["_id"])
    return jsonify(achievements)

@app.route("/api/achievements", methods=["POST"])
def create_achievement():
    try:
        db = get_db()
        data = request.json
        
        if not data.get("titleKey"):
            return jsonify({"error": "titleKey é obrigatório"}), 400
            
        result = db.achievements.insert_one(data)
        new_achievement = db.achievements.find_one({"_id": result.inserted_id})
        new_achievement["_id"] = str(new_achievement["_id"])
        
        return jsonify(new_achievement), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/achievements/<achievement_id>", methods=["PUT"])
def update_achievement(achievement_id):
    try:
        db = get_db()
        data = request.json
        data.pop("_id", None)
        
        result = db.achievements.update_one(
            {"_id": ObjectId(achievement_id)},
            {"$set": data}
        )
        
        if result.matched_count == 0:
            return jsonify({"error": "Achievement não encontrado"}), 404
            
        updated_achievement = db.achievements.find_one({"_id": ObjectId(achievement_id)})
        updated_achievement["_id"] = str(updated_achievement["_id"])
        
        return jsonify(updated_achievement)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/achievements/<achievement_id>", methods=["DELETE"])
def delete_achievement(achievement_id):
    try:
        db = get_db()
        result = db.achievements.delete_one({"_id": ObjectId(achievement_id)})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Achievement não encontrado"}), 404
            
        return jsonify({"message": "Achievement deletado com sucesso"})
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Handler para Vercel
def handler(environ, start_response):
    return app(environ, start_response)