from http.server import BaseHTTPRequestHandler
from pymongo import MongoClient
from bson import ObjectId
import json
import os

def get_db():
    client = MongoClient(os.environ.get("MONGO_URI"))
    return client[os.environ.get("DB_NAME")]

class handler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_GET(self):
        try:
            db = get_db()
            path = self.path.split('?')[0]
            parts = path.split('/')
            
            if len(parts) > 3:
                project_id = parts[3]
                project = db.projects.find_one({"_id": ObjectId(project_id)})
                if project:
                    project["_id"] = str(project["_id"])
                    self._set_headers()
                    self.wfile.write(json.dumps(project).encode())
                else:
                    self._set_headers(404)
                    self.wfile.write(json.dumps({"error": "Not found"}).encode())
            else:
                projects = list(db.projects.find())
                for p in projects:
                    p["_id"] = str(p["_id"])
                self._set_headers()
                self.wfile.write(json.dumps(projects).encode())
        except Exception as e:
            self._set_headers(500)
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            db = get_db()
            result = db.projects.insert_one(data)
            new_project = db.projects.find_one({"_id": result.inserted_id})
            new_project["_id"] = str(new_project["_id"])
            
            self._set_headers(201)
            self.wfile.write(json.dumps(new_project).encode())
        except Exception as e:
            self._set_headers(500)
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def do_PUT(self):
        try:
            path = self.path.split('?')[0]
            parts = path.split('/')
            project_id = parts[3]
            
            content_length = int(self.headers['Content-Length'])
            put_data = self.rfile.read(content_length)
            data = json.loads(put_data.decode('utf-8'))
            data.pop("_id", None)
            
            db = get_db()
            db.projects.update_one({"_id": ObjectId(project_id)}, {"$set": data})
            updated = db.projects.find_one({"_id": ObjectId(project_id)})
            updated["_id"] = str(updated["_id"])
            
            self._set_headers()
            self.wfile.write(json.dumps(updated).encode())
        except Exception as e:
            self._set_headers(500)
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def do_DELETE(self):
        try:
            path = self.path.split('?')[0]
            parts = path.split('/')
            project_id = parts[3]
            
            db = get_db()
            db.projects.delete_one({"_id": ObjectId(project_id)})
            
            self._set_headers()
            self.wfile.write(json.dumps({"message": "Deleted"}).encode())
        except Exception as e:
            self._set_headers(500)
            self.wfile.write(json.dumps({"error": str(e)}).encode())