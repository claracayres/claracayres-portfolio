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
                achievement_id = parts[3]
                achievement = db.achievements.find_one({"_id": ObjectId(achievement_id)})
                if achievement:
                    achievement["_id"] = str(achievement["_id"])
                    self._set_headers()
                    self.wfile.write(json.dumps(achievement).encode())
                else:
                    self._set_headers(404)
                    self.wfile.write(json.dumps({"error": "Not found"}).encode())
            else:
                achievements = list(db.achievements.find())
                for a in achievements:
                    a["_id"] = str(a["_id"])
                self._set_headers()
                self.wfile.write(json.dumps(achievements).encode())
        except Exception as e:
            self._set_headers(500)
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            db = get_db()
            result = db.achievements.insert_one(data)
            new_achievement = db.achievements.find_one({"_id": result.inserted_id})
            new_achievement["_id"] = str(new_achievement["_id"])
            
            self._set_headers(201)
            self.wfile.write(json.dumps(new_achievement).encode())
        except Exception as e:
            self._set_headers(500)
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def do_PUT(self):
        try:
            path = self.path.split('?')[0]
            parts = path.split('/')
            achievement_id = parts[3]
            
            content_length = int(self.headers['Content-Length'])
            put_data = self.rfile.read(content_length)
            data = json.loads(put_data.decode('utf-8'))
            data.pop("_id", None)
            
            db = get_db()
            db.achievements.update_one({"_id": ObjectId(achievement_id)}, {"$set": data})
            updated = db.achievements.find_one({"_id": ObjectId(achievement_id)})
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
            achievement_id = parts[3]
            
            db = get_db()
            db.achievements.delete_one({"_id": ObjectId(achievement_id)})
            
            self._set_headers()
            self.wfile.write(json.dumps({"message": "Deleted"}).encode())
        except Exception as e:
            self._set_headers(500)
            self.wfile.write(json.dumps({"error": str(e)}).encode())