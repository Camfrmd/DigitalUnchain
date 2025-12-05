# DigitalUnchain - Plateforme Éducative pour la Littératie Numérique

Une plateforme éducative conçue pour sensibiliser à l'autonomie numérique: devenir indépendant des solutions privées et savoir se débrouiller avec l'open source. Tout ceci à travers des jeux interactifs et des articles, couvrant des sujets comme les pratiques numériques responsables, la durabilité, l'accessibilité et la liberté numérique.

## Utilisation

Le site est déployé à l'adresse suivante: [https://digital-unchain.vercel.app/](https://digital-unchain.vercel.app/)

### Démarrage

#### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn

#### Installation

```bash
# Cloner le dépôt
git clone [url-du-dépôt]

# Naviguer vers le répertoire du projet
cd DigitalUnchain

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

# Vue d'ensemble

Les utilisateurs commencent par un quiz pour évaluer leur profil numérique, puis explorent différents "mondes" axés sur des aspects spécifiques de la responsabilité numérique :

- **Numérique** : Comprendre ses outils, gagner en autonomie et découvrir les alternatives
- **Inclusif** : Rendre le numérique accessible à toutes et tous
- **Responsable** : Éthique des données, souveraineté et choix responsables
- **Durable** : Sobriété numérique, réemploi et longévité des appareils
- **Articles** : Ressources et contenus approfondis

## Fonctionnalités

### Évaluation Initiale
- **Quiz introductif** : Les utilisateurs commencent par un quiz d'évaluation de profil qui détermine leur niveau de littératie numérique et recommande des domaines à privilégier

### Architecture
- **Quatre mondes thématiques**. Chaque monde se concentre sur un aspect spécifique de la responsabilité numérique,avec des mini jeux interactifs:
  - Jeu style Pac-Man avec thèmes de durabilité
  - Simulation d'architecture
  - Jeu Snake caché (déverrouillé avec un mot secret)

#### 1. Monde Numérique
**Objectif** : Aider les utilisateurs à comprendre leurs outils numériques et gagner en autonomie
- **Jeu** : Mots mêlés présentant des concepts clés autour des données, du traçage et des alternatives responsables
- **Objectifs d'apprentissage** : Alternatives logicielles, sauvegardes, compréhension des systèmes

#### 2. Monde Inclusif
**Objectif** : Rendre le numérique accessible et compréhensible pour tout le monde
- **Composant** : Grille de cartes avec des sujets sur l'inclusion numérique
- **Objectifs d'apprentissage** : Accessibilité, compréhension, réassurance

#### 3. Monde Responsable
**Objectif** : Comprendre la responsabilité numérique et les choix éthiques
- **Jeu** : Jeu de reconditionnement PC - associer les composants informatiques pour apprendre le réemploi
- **Objectifs d'apprentissage** : Souveraineté des données, sensibilisation aux GAFAM, choix d'outils éthiques

#### 4. Monde Durable
**Objectif** : Promouvoir la sobriété numérique et la longévité des appareils
- **Jeu** : Jeu style Pac-Man associant les géants de la tech à des pratiques durables
- **Objectifs d'apprentissage** : Réparation, reconditionnement, hébergement modeste, prolongation de la durée de vie

#### 5. Section Articles
**Objectif** : Fournir des contenus de lecture approfondis et des ressources structurées
- Liste d'articles avec liens vers des ressources externes
- Contexte pour les expériences de jeu

#### Hub de Contenu
- **Section articles** : Articles et ressources sélectionnés pour un apprentissage approfondi
- **Grille de cartes** : Présentation visuelle des sujets liés à l'inclusion numérique

#### Fonctionnalités Secrètes
- **Déblocage de jeu caché** : Une énigme avec mot secret ("DURABLE") déverrouille un jeu Snake bonus

