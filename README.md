# Théfada

Boutique de thé en ligne. Stack : **Next.js** (frontend) + **Strapi** (backend/CMS).

---

## Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm

---

## Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd theland
```

### 2. Installer les dépendances

```bash
# Backend
cd Backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configurer les variables d'environnement

**Backend** — copie le fichier exemple et remplis les valeurs :

```bash
cd Backend
cp .env.example .env
```

Ouvre `.env` et remplis les secrets. Pour générer une valeur aléatoire pour chaque clé 

**Frontend** — le fichier `.env` sera complété après avoir démarré Strapi (voir étape 5) :

```bash
cd frontend
cp .env.example .env
```

---

### 4. Démarrer le backend (Strapi)

```bash
cd Backend
npm run dev
```

Strapi sera accessible sur [http://localhost:1337](http://localhost:1337).

La première fois, Strapi te demandera de créer un compte administrateur.

---

### 5. Générer un token API Strapi

1. Va sur [http://localhost:1337/admin](http://localhost:1337/admin)
2. **Settings** → **API Tokens** → **Create new API Token**
3. Nom : ce que tu veux (ex: `frontend`)
4. Type : **Full access**
5. Clique sur **Save** et copie le token généré
6. Colle-le dans `frontend/.env` :

```
STRAPI_API_KEY=ton_token_ici
```

---

### 6. Peupler la base de données

Le script suivant crée automatiquement toutes les catégories et les thés (merci claude pour le script de seed) :

```bash
cd frontend
node scripts/seed-teas.mjs
```

---

### 7. Démarrer le frontend

```bash
cd frontend
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

---

## Structure du projet

```
theland/
├── Backend/        # Strapi (API & CMS)
└── frontend/       # Next.js (site)
```
