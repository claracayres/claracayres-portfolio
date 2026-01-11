# 🔐 Configuração de Senha Admin

## ✅ Segurança Implementada

A senha admin agora é protegida através de **variáveis de ambiente** e **NÃO está mais exposta no código do GitHub**!

## Como Funciona

1. A senha é armazenada no arquivo `.env` (local)
2. O arquivo `.env` está no `.gitignore` e **não é enviado ao GitHub**
3. Apenas o `.env.example` (sem senha real) é público
4. Cada desenvolvedor/ambiente tem sua própria senha

## Como Configurar Localmente

1. Abra o arquivo `.env` na raiz do projeto
2. Adicione ou edite a linha:
   ```
   VITE_ADMIN_PASSWORD=sua_senha_aqui
   ```
3. Salve o arquivo
4. Reinicie o servidor de desenvolvimento

## Como Configurar no Vercel (Produção)

1. Acesse seu projeto no Vercel Dashboard
2. Vá em **Settings** → **Environment Variables**
3. Adicione uma nova variável:
   - **Name:** `VITE_ADMIN_PASSWORD`
   - **Value:** sua senha segura
4. Faça redeploy do projeto

## Acessar o Painel Admin

1. Acesse: `http://localhost:5173/admin-login`
2. Digite a senha configurada
3. Você será redirecionado para o painel admin

## Páginas Admin Protegidas

- `/admin` - Gerenciar Achievements
- `/admin-projects` - Gerenciar Projetos
- `/admin-skills` - Gerenciar Skills

Todas as páginas admin agora requerem autenticação!

## Segurança

✅ **Melhorias implementadas:**

- Senha em variável de ambiente (não exposta no código)
- `.env` no `.gitignore` (não enviado ao GitHub)
- Cada ambiente tem sua própria senha
- Sessão mantida no localStorage
- Botão de logout em todas as páginas admin

⚠️ **Notas importantes:**

- A validação ainda é client-side (no navegador)
- Para máxima segurança, considere implementar autenticação backend
- Nunca commite o arquivo `.env` com senhas reais
- Use senhas fortes em produção

## 📝 Arquivos

- `.env` - Suas senhas (NÃO commitado) ✅
- `.env.example` - Template público (pode ser commitado)
- `src/contexts/AuthContext.jsx` - Lê a senha da variável de ambiente
