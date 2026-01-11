from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Mongo
client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("DB_NAME")]

# ROTA PRINCIPAL (TESTE)
@app.route("/")
def home():
    return "API OK"

# ROTAS PROJECTS
@app.route("/api/projects", methods=["GET"])
def get_projects():
    projects = list(db.projects.find())
    for p in projects:
        p["_id"] = str(p["_id"])
    return jsonify(projects)

@app.route("/api/projects", methods=["POST"])
def create_project():
    try:
        data = request.json
        print("Received project data:", data)  # Debug
        
        # Valida se há dados obrigatórios
        if not data.get("titleKey"):
            return jsonify({"error": "titleKey é obrigatório"}), 400
            
        # Insere no banco
        result = db.projects.insert_one(data)
        
        # Retorna o project criado
        new_project = db.projects.find_one({"_id": result.inserted_id})
        new_project["_id"] = str(new_project["_id"])
        
        return jsonify(new_project), 201
        
    except Exception as e:
        print("Error:", str(e))  # Debug
        return jsonify({"error": str(e)}), 500

@app.route("/api/projects/<project_id>", methods=["PUT"])
def update_project(project_id):
    try:
        data = request.json
        print("Updating project:", project_id, "with data:", data)  # Debug
        
        # Atualiza no banco
        result = db.projects.update_one(
            {"_id": ObjectId(project_id)}, 
            {"$set": data}
        )
        
        if result.matched_count == 0:
            return jsonify({"error": "Project não encontrado"}), 404
            
        # Retorna o project atualizado
        updated_project = db.projects.find_one({"_id": ObjectId(project_id)})
        updated_project["_id"] = str(updated_project["_id"])
        
        return jsonify(updated_project)
        
    except Exception as e:
        print("Error:", str(e))  # Debug
        return jsonify({"error": str(e)}), 500

@app.route("/api/projects/<project_id>", methods=["DELETE"])
def delete_project(project_id):
    try:
        print("Deleting project:", project_id)  # Debug
        
        # Deleta do banco
        result = db.projects.delete_one({"_id": ObjectId(project_id)})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Project não encontrado"}), 404
            
        return jsonify({"message": "Project deletado com sucesso"})
        
    except Exception as e:
        print("Error:", str(e))  # Debug
        return jsonify({"error": str(e)}), 500

# ROTAS ACHIEVEMENTS
@app.route("/api/achievements", methods=["GET"])
def get_achievements():
    achievements = list(db.achievements.find())
    for a in achievements:
        a["_id"] = str(a["_id"])
    return jsonify(achievements)

@app.route("/api/achievements", methods=["POST"])
def create_achievement():
    try:
        data = request.json
        print("Received data:", data)  # Debug
        
        # Valida se há dados obrigatórios
        if not data.get("titleKey"):
            return jsonify({"error": "titleKey é obrigatório"}), 400
            
        # Insere no banco
        result = db.achievements.insert_one(data)
        
        # Retorna o achievement criado
        new_achievement = db.achievements.find_one({"_id": result.inserted_id})
        new_achievement["_id"] = str(new_achievement["_id"])
        
        return jsonify(new_achievement), 201
        
    except Exception as e:
        print("Error:", str(e))  # Debug
        return jsonify({"error": str(e)}), 500

@app.route("/api/achievements/<achievement_id>", methods=["PUT"])
def update_achievement(achievement_id):
    try:
        data = request.json
        print("Updating achievement:", achievement_id, "with data:", data)  # Debug
        
        # Atualiza no banco
        result = db.achievements.update_one(
            {"_id": ObjectId(achievement_id)}, 
            {"$set": data}
        )
        
        if result.matched_count == 0:
            return jsonify({"error": "Achievement não encontrado"}), 404
            
        # Retorna o achievement atualizado
        updated_achievement = db.achievements.find_one({"_id": ObjectId(achievement_id)})
        updated_achievement["_id"] = str(updated_achievement["_id"])
        
        return jsonify(updated_achievement)
        
    except Exception as e:
        print("Error:", str(e))  # Debug
        return jsonify({"error": str(e)}), 500

@app.route("/api/achievements/<achievement_id>", methods=["DELETE"])
def delete_achievement(achievement_id):
    try:
        print("Deleting achievement:", achievement_id)  # Debug
        
        # Deleta do banco
        result = db.achievements.delete_one({"_id": ObjectId(achievement_id)})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Achievement não encontrado"}), 404
            
        return jsonify({"message": "Achievement deletado com sucesso"})
        
    except Exception as e:
        print("Error:", str(e))  # Debug
        return jsonify({"error": str(e)}), 500

# Rota para remover traduções automaticamente
@app.route("/api/translations/delete", methods=["POST"])
def delete_translation_keys():
    try:
        data = request.json
        keys_to_delete = data.get('keys', [])
        print("Deleting translation keys:", keys_to_delete)  # Debug
        
        if not keys_to_delete:
            return jsonify({"error": "No keys provided"}), 400
        
        # Caminhos dos arquivos de tradução
        import json
        pt_file = os.path.join("..", "src", "locales", "pt", "translation.json")
        en_file = os.path.join("..", "src", "locales", "en", "translation.json")
        
        # Lê arquivos existentes
        try:
            with open(pt_file, 'r', encoding='utf-8') as f:
                pt_data = json.load(f)
            with open(en_file, 'r', encoding='utf-8') as f:
                en_data = json.load(f)
        except FileNotFoundError as e:
            return jsonify({"error": f"Translation file not found: {e}"}), 404
        
        deleted_keys = []
        
        # Remove cada chave das traduções
        for key in keys_to_delete:
            # Remove "achievements." do início se existir
            clean_key = key.replace('achievements.', '')
            
            # Divide a chave em partes (ex: "card8.title" -> ["card8", "title"])
            key_parts = clean_key.split('.')
            
            # Remove da estrutura PT
            if 'achievements' in pt_data:
                pt_target = pt_data['achievements']
                for part in key_parts[:-1]:
                    if part in pt_target:
                        pt_target = pt_target[part]
                    else:
                        pt_target = None
                        break
                
                if pt_target and key_parts[-1] in pt_target:
                    del pt_target[key_parts[-1]]
                    deleted_keys.append(f"pt:{key}")
                
                # Remove container vazio se necessário
                if key_parts[:-1] and pt_target is not None and not pt_target:
                    container = pt_data['achievements']
                    for part in key_parts[:-2]:
                        container = container[part]
                    if key_parts[-2] in container:
                        del container[key_parts[-2]]
            
            # Remove da estrutura EN
            if 'achievements' in en_data:
                en_target = en_data['achievements']
                for part in key_parts[:-1]:
                    if part in en_target:
                        en_target = en_target[part]
                    else:
                        en_target = None
                        break
                
                if en_target and key_parts[-1] in en_target:
                    del en_target[key_parts[-1]]
                    deleted_keys.append(f"en:{key}")
                
                # Remove container vazio se necessário
                if key_parts[:-1] and en_target is not None and not en_target:
                    container = en_data['achievements']
                    for part in key_parts[:-2]:
                        container = container[part]
                    if key_parts[-2] in container:
                        del container[key_parts[-2]]
        
        # Escreve os arquivos atualizados
        try:
            with open(pt_file, 'w', encoding='utf-8') as f:
                json.dump(pt_data, f, ensure_ascii=False, indent=2)
            with open(en_file, 'w', encoding='utf-8') as f:
                json.dump(en_data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            return jsonify({"error": f"Failed to write files: {e}"}), 500
        
        return jsonify({
            "message": "Translation keys deleted successfully",
            "deleted_keys": deleted_keys
        }), 200
        
    except Exception as e:
        print("Error deleting translations:", str(e))
        return jsonify({"error": str(e)}), 500

# Rota para atualizar traduções automaticamente
@app.route("/api/translations/update", methods=["POST"])
def update_translation_files():
    try:
        data = request.json
        print("Updating translation files with:", data)  # Debug
        
        # Caminhos dos arquivos de tradução
        import json
        pt_file = os.path.join("..", "src", "locales", "pt", "translation.json")
        en_file = os.path.join("..", "src", "locales", "en", "translation.json")
        
        # Lê arquivos existentes
        try:
            with open(pt_file, 'r', encoding='utf-8') as f:
                pt_data = json.load(f)
            with open(en_file, 'r', encoding='utf-8') as f:
                en_data = json.load(f)
        except FileNotFoundError as e:
            return jsonify({"error": f"Translation file not found: {e}"}), 404
        
        # Processa cada tradução
        for translation in data:
            key = translation.get('key', '')
            pt_text = translation.get('pt', '')
            en_text = translation.get('en', '')
            
            if key and pt_text and en_text:
                # Remove "achievements." do início se existir
                clean_key = key.replace('achievements.', '')
                
                # Divide a chave em partes (ex: "card7.title" -> ["card7", "title"])
                key_parts = clean_key.split('.')
                
                # Cria estrutura aninhada se necessário - PT
                pt_target = pt_data.setdefault('achievements', {})
                for part in key_parts[:-1]:
                    pt_target = pt_target.setdefault(part, {})
                pt_target[key_parts[-1]] = pt_text
                
                # Cria estrutura aninhada se necessário - EN
                en_target = en_data.setdefault('achievements', {})
                for part in key_parts[:-1]:
                    en_target = en_target.setdefault(part, {})
                en_target[key_parts[-1]] = en_text
        
        # Escreve os arquivos atualizados
        try:
            with open(pt_file, 'w', encoding='utf-8') as f:
                json.dump(pt_data, f, ensure_ascii=False, indent=2)
            with open(en_file, 'w', encoding='utf-8') as f:
                json.dump(en_data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            return jsonify({"error": f"Failed to write files: {e}"}), 500
        
        return jsonify({
            "message": "Translation files updated successfully",
            "updated_keys": [t.get('key') for t in data if t.get('key')]
        }), 200
        
    except Exception as e:
        print("Error updating translations:", str(e))
        return jsonify({"error": str(e)}), 500

# ROTAS SKILLS
@app.route("/api/skills", methods=["GET"])
def get_skills():
    skills = list(db.skills.find())
    for s in skills:
        s["_id"] = str(s["_id"])
    return jsonify(skills)

@app.route("/api/skills", methods=["POST"])
def create_skill():
    try:
        data = request.json
        print("Received skill data:", data)  # Debug
        
        # Valida se há dados obrigatórios
        if not data.get("name"):
            return jsonify({"error": "name é obrigatório"}), 400
            
        # Insere no banco
        result = db.skills.insert_one(data)
        
        # Retorna o skill criado
        new_skill = db.skills.find_one({"_id": result.inserted_id})
        new_skill["_id"] = str(new_skill["_id"])
        
        return jsonify(new_skill), 201
        
    except Exception as e:
        print("Error:", str(e))  # Debug
        return jsonify({"error": str(e)}), 500

@app.route("/api/skills/<skill_id>", methods=["PUT"])
def update_skill(skill_id):
    try:
        data = request.json
        print("Updating skill:", skill_id, "with data:", data)  # Debug
        
        # Remove o _id dos dados se existir
        data.pop("_id", None)
        
        # Atualiza no banco
        result = db.skills.update_one(
            {"_id": ObjectId(skill_id)},
            {"$set": data}
        )
        
        if result.matched_count == 0:
            return jsonify({"error": "Skill não encontrado"}), 404
            
        # Retorna o skill atualizado
        updated_skill = db.skills.find_one({"_id": ObjectId(skill_id)})
        updated_skill["_id"] = str(updated_skill["_id"])
        
        return jsonify(updated_skill)
        
    except Exception as e:
        print("Error:", str(e))  # Debug
        return jsonify({"error": str(e)}), 500

@app.route("/api/skills/<skill_id>", methods=["DELETE"])
def delete_skill(skill_id):
    try:
        print("Deleting skill:", skill_id)  # Debug
        
        # Deleta do banco
        result = db.skills.delete_one({"_id": ObjectId(skill_id)})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Skill não encontrado"}), 404
            
        return jsonify({"message": "Skill deletado com sucesso"})
        
    except Exception as e:
        print("Error:", str(e))  # Debug
        return jsonify({"error": str(e)}), 500

# Rota opcional para traduções (se necessário)
@app.route("/api/translations/bulk", methods=["POST"])
def bulk_translations():
    try:
        data = request.json
        print("Received translations:", data)  # Debug
        # Por enquanto só logga, você pode implementar a lógica se necessário
        return jsonify({"message": "Translations received"}), 200
    except Exception as e:
        print("Translation error:", str(e))  # Debug
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
