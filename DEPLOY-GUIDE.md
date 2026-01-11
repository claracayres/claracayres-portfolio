# 🚀 Guia Completo de Deploy no Vercel

## ⚠️ IMPORTANTE: MongoDB Atlas Setup (OBRIGATÓRIO)

1. **Criar conta no MongoDB Atlas**
   - Vá para https://cloud.mongodb.com/
   - Crie conta ou faça login

2. **Criar cluster**
   - Crie um novo cluster (free tier é suficiente)
   - Escolha região mais próxima

3. **Configurar Network Access**
   - Vá em Network Access > IP Access List
   - Clique "Add IP Address"
   - Selecione "Allow access from anywhere" (0.0.0.0/0)
   - Confirme

4. **Criar Database User**
   - Vá em Database Access > Add New Database User
   - Username/Password authentication
   - **ANOTE o usuário e senha**
   - Database User Privileges: Read and write to any database

5. **Copiar Connection String**
   - Vá no cluster > Connect > Connect your application
   - MongoDB Driver, version 3.6 or later
   - Copy connection string
   - Exemplo: `mongodb+srv://usuario:senha@cluster.abc123.mongodb.net/portfolio?retryWrites=true&w=majority`

## 📦 Deploy Steps

### 1. Instalar Vercel CLI

```bash
npm i -g vercel
```

### 2. Build e Test Local

```bash
npm run build
```

### 3. Deploy Inicial

```bash
vercel
```

Responda:

- ✅ Set up and deploy? **Y**
- ✅ Which scope? **sua-conta**
- ✅ Project name? **portfolio**
- ✅ Directory? **.**

### 4. Configurar Environment Variables

No dashboard do Vercel:

1. Vá em **Settings > Environment Variables**
2. Adicione para **Production, Preview e Development**:

| Key            | Value                          |
| -------------- | ------------------------------ |
| `MONGO_URI`    | sua connection string do Atlas |
| `DB_NAME`      | `portfolio`                    |
| `VITE_API_URL` | deixe vazio (auto-detecta)     |

### 5. Redeploy Produção

```bash
vercel --prod
```

## 🔧 Files Criados Automaticamente

✅ **vercel.json** - Configuração do Vercel  
✅ **requirements.txt** - Dependencies Python  
✅ **api/skills.py** - Serverless function skills  
✅ **api/projects.py** - Serverless function projetos  
✅ **src/config/api.js** - URLs da API  
✅ **.env** - Variáveis locais

## ⚡ Migração de Dados

1. **Conectar ao Atlas localmente**
   - Atualize seu `.env` local com MONGO_URI do Atlas
   - Execute: `python Backend/seed_skills.py`
   - Execute: `python Backend/seed_projects.py`

2. **Verificar no Atlas**
   - Collections > portfolio > skills (12 documents)
   - Collections > portfolio > projects (seus projetos)

## 🎯 Teste Final

1. **Acesse**: `https://seu-projeto.vercel.app/`
2. **Admin Skills**: `https://seu-projeto.vercel.app/admin-skills`
3. **Admin Projects**: `https://seu-projeto.vercel.app/admin-projects`

## 🔄 Para Updates Futuros

```bash
# Sempre que fizer changes
git add .
git commit -m "Update"
git push

# Vercel auto-deploys quando push no main
```

---

## ❗ Troubleshooting

**API não funciona?**

- Verifique environment vars no Vercel
- Verifique CORS na MongoDB
- Veja logs no Vercel dashboard

**Frontend carrega mas API 404?**

- Confirme que `/api` folder existe
- Verifique routes no vercel.json

**MongoDB connection error?**

- Confirme connection string
- Verifique IP whitelist (0.0.0.0/0)
- Teste connection string localmente primeiro
