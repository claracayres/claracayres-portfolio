from pymongo import MongoClient
import json
import os
from dotenv import load_dotenv

load_dotenv()

# Conectar ao MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("DB_NAME")]

# Ler o arquivo JSON
with open('projects_seed.json', 'r', encoding='utf-8') as f:
    projects_data = json.load(f)

# Inserir no MongoDB
try:
    # Limpar coleção existente (opcional)
    db.projects.delete_many({})
    print("✅ Coleção projects limpa")
    
    # Inserir novos dados
    result = db.projects.insert_many(projects_data)
    print(f"✅ {len(result.inserted_ids)} projeto(s) inserido(s) com sucesso!")
    
    # Mostrar os dados inseridos
    projects = list(db.projects.find())
    for project in projects:
        project["_id"] = str(project["_id"])
        print(f"📄 Projeto: {project.get('titleKey', 'N/A')}")
        
except Exception as e:
    print(f"❌ Erro ao inserir dados: {e}")

client.close()
print("🔌 Conexão com MongoDB fechada")