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

@app.route('/api/projects', methods=['GET', 'POST', 'OPTIONS'])
@app.route('/api/projects/<project_id>', methods=['GET', 'PUT', 'DELETE', 'OPTIONS'])
def projects(project_id=None):
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        db = get_db()
        
        if request.method == 'GET':
            if project_id:
                project = db.projects.find_one({"_id": ObjectId(project_id)})
                if project:
                    project["_id"] = str(project["_id"])
                    return jsonify(project)
                return jsonify({"error": "Not found"}), 404
            else:
                projects = list(db.projects.find())
                for p in projects:
                    p["_id"] = str(p["_id"])
                return jsonify(projects)
        
        elif request.method == 'POST':
            data = request.get_json()
            result = db.projects.insert_one(data)
            new_project = db.projects.find_one({"_id": result.inserted_id})
            new_project["_id"] = str(new_project["_id"])
            return jsonify(new_project), 201
        
        elif request.method == 'PUT':
            data = request.get_json()
            data.pop("_id", None)
            db.projects.update_one({"_id": ObjectId(project_id)}, {"$set": data})
            updated = db.projects.find_one({"_id": ObjectId(project_id)})
            updated["_id"] = str(updated["_id"])
            return jsonify(updated)
        
        elif request.method == 'DELETE':
            db.projects.delete_one({"_id": ObjectId(project_id)})
            return jsonify({"message": "Deleted"})
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500