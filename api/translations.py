from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import json
from pathlib import Path

app = Flask(__name__)
CORS(app)

# Paths para os arquivos de tradução (não funciona em serverless, mas mantenho para referência)
PT_TRANSLATION_PATH = "./src/locales/pt/translation.json"
EN_TRANSLATION_PATH = "./src/locales/en/translation.json"

@app.route("/api/translations/update", methods=["POST"])
def update_translations():
    try:
        # NOTA: Em ambiente serverless (Vercel), não podemos escrever arquivos
        # Esta rota retornará sucesso mas não fará alterações reais
        # As traduções devem ser gerenciadas manualmente ou via webhook/github
        
        data = request.json
        translations = data.get('translations', [])
        
        # Log para debug (visível nos logs do Vercel)
        print(f"Translation update requested for {len(translations)} items")
        for translation in translations:
            print(f"Key: {translation.get('key')}, PT: {translation.get('pt')}, EN: {translation.get('en')}")
        
        return jsonify({
            "message": "Translation update received (serverless mode)",
            "note": "Files are not actually updated in production. Use Git workflow.",
            "updated_keys": [t.get('key') for t in translations if t.get('key')]
        }), 200
        
    except Exception as e:
        print("Translation error:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/api/translations/delete", methods=["POST"])
def delete_translation_keys():
    try:
        data = request.json
        keys_to_delete = data.get('keys', [])
        
        # Log para debug
        print(f"Translation deletion requested for keys: {keys_to_delete}")
        
        return jsonify({
            "message": "Translation deletion received (serverless mode)",
            "note": "Files are not actually updated in production. Use Git workflow.",
            "deleted_keys": keys_to_delete
        }), 200
        
    except Exception as e:
        print("Translation deletion error:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/api/translations/bulk", methods=["POST"])
def bulk_translations():
    try:
        data = request.json
        print("Bulk translations received:", len(data) if isinstance(data, list) else "invalid data")
        return jsonify({"message": "Bulk translations received"}), 200
    except Exception as e:
        print("Bulk translation error:", str(e))
        return jsonify({"error": str(e)}), 500

def handler(request):
    return app(request.environ, start_response)