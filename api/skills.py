from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os

app = Flask(__name__)
CORS(app)

def get_db():
    client = MongoClient(os.environ.get("MONGO_URI"))
    return client[os.environ.get("DB_NAME")]

@app.route("/api/skills", methods=["GET"])
def get_skills():
    db = get_db()
    skills = list(db.skills.find())
    for s in skills:
        s["_id"] = str(s["_id"])
    return jsonify(skills)

@app.route("/api/skills", methods=["POST"])
def create_skill():
    try:
        db = get_db()
        data = request.json
        
        if not data.get("name"):
            return jsonify({"error": "name é obrigatório"}), 400
            
        result = db.skills.insert_one(data)
        new_skill = db.skills.find_one({"_id": result.inserted_id})
        new_skill["_id"] = str(new_skill["_id"])
        
        return jsonify(new_skill), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/skills/<skill_id>", methods=["PUT"])
def update_skill(skill_id):
    try:
        db = get_db()
        data = request.json
        data.pop("_id", None)
        
        result = db.skills.update_one(
            {"_id": ObjectId(skill_id)},
            {"$set": data}
        )
        
        if result.matched_count == 0:
            return jsonify({"error": "Skill não encontrado"}), 404
            
        updated_skill = db.skills.find_one({"_id": ObjectId(skill_id)})
        updated_skill["_id"] = str(updated_skill["_id"])
        
        return jsonify(updated_skill)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/skills/<skill_id>", methods=["DELETE"])
def delete_skill(skill_id):
    try:
        db = get_db()
        result = db.skills.delete_one({"_id": ObjectId(skill_id)})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Skill não encontrado"}), 404
            
        return jsonify({"message": "Skill deletado com sucesso"})
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def handler(request):
    return app(request.environ, start_response)