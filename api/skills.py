from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
import os

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response

def get_db():
    client = MongoClient(os.environ.get("MONGO_URI"))
    return client[os.environ.get("DB_NAME")]

@app.route('/api/skills', methods=['GET', 'POST', 'OPTIONS'])
@app.route('/api/skills/<skill_id>', methods=['GET', 'PUT', 'DELETE', 'OPTIONS'])
def skills(skill_id=None):
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        db = get_db()
        
        if request.method == 'GET':
            if skill_id:
                skill = db.skills.find_one({"_id": ObjectId(skill_id)})
                if skill:
                    skill["_id"] = str(skill["_id"])
                    return jsonify(skill)
                return jsonify({"error": "Not found"}), 404
            else:
                skills = list(db.skills.find())
                for s in skills:
                    s["_id"] = str(s["_id"])
                return jsonify(skills)
        
        elif request.method == 'POST':
            data = request.get_json()
            result = db.skills.insert_one(data)
            new_skill = db.skills.find_one({"_id": result.inserted_id})
            new_skill["_id"] = str(new_skill["_id"])
            return jsonify(new_skill), 201
        
        elif request.method == 'PUT':
            data = request.get_json()
            data.pop("_id", None)
            db.skills.update_one({"_id": ObjectId(skill_id)}, {"$set": data})
            updated = db.skills.find_one({"_id": ObjectId(skill_id)})
            updated["_id"] = str(updated["_id"])
            return jsonify(updated)
        
        elif request.method == 'DELETE':
            db.skills.delete_one({"_id": ObjectId(skill_id)})
            return jsonify({"message": "Deleted"})
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500