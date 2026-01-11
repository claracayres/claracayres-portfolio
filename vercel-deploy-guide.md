# Guia de Deploy no Vercel

## 1. MongoDB Atlas Setup

1. Vá para https://cloud.mongodb.com/
2. Crie uma conta/login
3. Crie um novo cluster (free tier)
4. Configure Network Access (0.0.0.0/0 para permitir todas as IPs)
5. Crie um Database User
6. Copie a connection string

## 2. Configurar Backend como Serverless Functions

Vercel suporta Python via serverless functions na pasta `/api`

## 3. Configurar Environment Variables no Vercel

- MONGO_URI: sua connection string do Atlas
- DB_NAME: nome do seu database

## 4. Build Settings no Vercel

- Framework Preset: Vite
- Root Directory: ./
- Output Directory: dist
