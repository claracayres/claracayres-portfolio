# 🚀 Deploy Rápido - GitHub + Vercel

## 1️⃣ Push para GitHub

```bash
# Adicionar todos os arquivos
git add .

# Commit
git commit -m "Setup completo para deploy no Vercel"

# Push
git push origin main
```

## 2️⃣ Configurar Vercel

### Opção A: Via Dashboard (Recomendado)

1. Vá para https://vercel.com
2. Login com GitHub
3. **New Project** > Selecione `claracayres-portfolio`
4. **Configure Project**:
   - Framework Preset: **Vite**
   - Root Directory: **/**
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Opção B: Via CLI

```bash
npm i -g vercel
vercel
```

## 3️⃣ Environment Variables no Vercel

No dashboard do Vercel > Settings > Environment Variables:

| Nome        | Valor                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| `MONGO_URI` | `mongodb+srv://claracayres1205:12m17g14d19n@portfolio.jwkqxpi.mongodb.net/?retryWrites=true&w=majority&appName=portfolio` |
| `DB_NAME`   | `portfolio`                                                                                                               |

⚠️ **IMPORTANTE**: Adicione para **Production, Preview E Development**

## 4️⃣ Popular MongoDB Atlas

```bash
# No terminal, na pasta Backend
cd Backend
python seed_skills.py
python seed_projects.py
```

## 5️⃣ Redeploy

Após configurar as variáveis:

```bash
vercel --prod
```

Ou faça um novo commit que triggera deploy automático:

```bash
git commit --allow-empty -m "Trigger deploy"
git push
```

## ✅ Testar

Acesse sua URL do Vercel:

- `/` - Home
- `/admin-skills` - Admin Skills
- `/admin-projects` - Admin Projects
- `/admin` - Admin Achievements

---

## 🔧 Troubleshooting

**Erro de API?**

- Verifique environment variables no Vercel
- Redeploye após adicionar vars

**MongoDB connection error?**

- Confirme que IP 0.0.0.0/0 está liberado no Atlas
- Teste connection string localmente primeiro

**Build error?**

- Verifique se todos os imports estão corretos
- Run `npm run build` localmente primeiro
