# SportSee - Frontend Dashboard

Application frontend d'un tableau de bord d'analyse sportive, realise avec React et Vite.

## Apercu

SportSee permet a un utilisateur de consulter ses indicateurs de performance:
- sessions d'activite
- progression des objectifs
- statistiques journalieres
- visualisations via graphiques interactifs

Le projet est concu pour un usage portfolio et met en avant:
- architecture React modulaire
- routage protege (authentification)
- integration API REST (ou mocks)
- composants de data-visualisation avec Recharts

## Stack Technique

- React 19
- Vite 8
- React Router DOM 7
- Recharts
- CSS

## Fonctionnalites

- Ecran de connexion
- Protection des routes privees (`/dashboard`, `/profile`)
- Affichage des donnees utilisateur
- Graphiques de performance
- Gestion des etats `loading` et `error`
- Fallback possible sur des donnees mockees

## Lancement du Projet

### Prerequis

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Demarrer le frontend

```bash
npm run dev
```

Le frontend est ensuite disponible sur l'URL affichee par Vite (en general `http://localhost:5173`).

## API Backend (optionnel)

Le frontend consomme l'API sur `http://localhost:8000`.

Si tu souhaites lancer l'API locale fournie:

```bash
cd backend
npm install
npm run dev
```

Ensuite, dans un autre terminal:

```bash
npm run dev
```

## Comptes de demonstration (API locale)

- `sophiemartin` / `password123`
- `emmaleroy` / `password789`
- `marcdubois` / `password456`

## Structure du Projet

```text
src/
  components/     # Graphiques et composants UI
  pages/          # Ecrans (Login, Dashboard, Profile)
  routes/         # Routage et protection des routes
  context/        # Etat global de l'application
  services/       # Hooks/API/auth
  layout/         # Header, Footer, AppLayout
  mocks/          # Donnees de test
```

## Notes Portfolio

- Ce repository est volontairement centre sur le frontend.
- Le dossier `backend/` est ignore par Git dans ce depot.

## Auteur

Gwenael Emans
