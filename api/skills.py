from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
import os

app = Flask(__name__)

# CORS
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response

# Função para pegar o banco
def get_db():
    mongo_uri = os.environ.get("MONGO_URI")
    if not mongo_uri:
        raise Exception("MONGO_URI não definido")
    db_name = os.environ.get("DB_NAME", "Portfolio")  # nome do banco
    client = MongoClient(mongo_uri)
    db = client[db_name]  # seleciona o banco
    return db

# Função para converter ObjectId para string
def convert_id(data):
    if isinstance(data, list):
        for item in data:
            item["_id"] = str(item["_id"])
    elif isinstance(data, dict) and "_id" in data:
        data["_id"] = str(data["_id"])
    return data

# CRUD genérico para qualquer coleção
def create_crud_routes(collection_name):
    @app.route(f'/api/{collection_name}', methods=['GET', 'POST', 'OPTIONS'])
    @app.route(f'/api/{collection_name}/<item_id>', methods=['GET', 'PUT', 'DELETE', 'OPTIONS'])
    def handler(item_id=None):
        if request.method == 'OPTIONS':
            return '', 200
        
        try:
            db = get_db()
            collection = db[collection_name]
            
            if request.method == 'GET':
                if item_id:
                    item = collection.find_one({"_id": ObjectId(item_id)})
                    if not item:
                        return jsonify({"error": "Not found"}), 404
                    return jsonify(convert_id(item))
                else:
                    items = list(collection.find())
                    return jsonify(convert_id(items))
            
            elif request.method == 'POST':
                data = request.get_json()
                result = collection.insert_one(data)
                new_item = collection.find_one({"_id": result.inserted_id})
                return jsonify(convert_id(new_item)), 201
            
            elif request.method == 'PUT':
                data = request.get_json()
                data.pop("_id", None)
                collection.update_one({"_id": ObjectId(item_id)}, {"$set": data})
                updated_item = collection.find_one({"_id": ObjectId(item_id)})
                return jsonify(convert_id(updated_item))
            
            elif request.method == 'DELETE':
                collection.delete_one({"_id": ObjectId(item_id)})
                return jsonify({"message": "Deleted"})
        
        except Exception as e:
            print(f"Erro na API /{collection_name}:", e)
            return jsonify({"error": str(e)}), 500

# Criar rotas para as coleções
for col in ["skills", "achievements", "projects"]:
    create_crud_routes(col)

# Rodar localmente (para testes)
if __name__ == "__main__":
    app.run(debug=True)
