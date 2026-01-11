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

@app.route('/api/achievements', methods=['GET', 'POST', 'OPTIONS'])
@app.route('/api/achievements/<achievement_id>', methods=['GET', 'PUT', 'DELETE', 'OPTIONS'])
def achievements(achievement_id=None):
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        db = get_db()
        
        if request.method == 'GET':
            if achievement_id:
                achievement = db.achievements.find_one({"_id": ObjectId(achievement_id)})
                if achievement:
                    achievement["_id"] = str(achievement["_id"])
                    return jsonify(achievement)
                return jsonify({"error": "Not found"}), 404
            else:
                achievements = list(db.achievements.find())
                for a in achievements:
                    a["_id"] = str(a["_id"])
                return jsonify(achievements)
        
        elif request.method == 'POST':
            data = request.get_json()
            result = db.achievements.insert_one(data)
            new_achievement = db.achievements.find_one({"_id": result.inserted_id})
            new_achievement["_id"] = str(new_achievement["_id"])
            return jsonify(new_achievement), 201
        
        elif request.method == 'PUT':
            data = request.get_json()
            data.pop("_id", None)
            db.achievements.update_one({"_id": ObjectId(achievement_id)}, {"$set": data})
            updated = db.achievements.find_one({"_id": ObjectId(achievement_id)})
            updated["_id"] = str(updated["_id"])
            return jsonify(updated)
        
        elif request.method == 'DELETE':
            db.achievements.delete_one({"_id": ObjectId(achievement_id)})
            return jsonify({"message": "Deleted"})
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500