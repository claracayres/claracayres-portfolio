import json
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Carrega as variáveis do .env
load_dotenv()

def seed_skills():
    # Conecta ao MongoDB
    client = MongoClient(os.getenv("MONGO_URI"))
    db = client[os.getenv("DB_NAME")]
    
    # Lê o arquivo JSON
    with open("skills_seed.json", "r", encoding="utf-8") as file:
        skills_data = json.load(file)
    
    # Limpa a collection (opcional)
    db.skills.delete_many({})
    print("Collection skills limpa.")
    
    # Insere os dados
    result = db.skills.insert_many(skills_data)
    print(f"{len(result.inserted_ids)} skills inseridos no MongoDB.")
    
    # Lista os skills inseridos
    skills = list(db.skills.find())
    print("\nSkills inseridos:")
    for skill in skills:
        print(f"- {skill['name']} ({skill['percentage']}%) - Categoria: {skill.get('category', 'N/A')}")
    
    client.close()

if __name__ == "__main__":
    seed_skills()