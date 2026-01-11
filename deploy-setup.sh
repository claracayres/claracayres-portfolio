#!/bin/bash
# Deploy Setup Script para Portfolio

echo "🚀 Portfolio Deploy Setup"
echo "========================="

# 1. Build do projeto
echo "📦 Building project..."
npm run build

# 2. Check se Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
fi

# 3. Deploy
echo "🌐 Deploying to Vercel..."
npm run deploy

echo "✅ Deploy completed!"
echo ""
echo "📋 Next steps:"
echo "1. Configure environment variables in Vercel dashboard:"
echo "   - MONGO_URI: Your MongoDB Atlas connection string"
echo "   - DB_NAME: portfolio"
echo ""
echo "2. Run seed scripts to populate your database:"
echo "   - Update Backend/.env with Atlas connection string"
echo "   - Run: python Backend/seed_skills.py"
echo "   - Run: python Backend/seed_projects.py" 
echo ""
echo "3. Test your admin panels:"
echo "   - /admin-skills"
echo "   - /admin-projects"  
echo "   - /admin"
echo ""
echo "🎉 Your portfolio is ready!"