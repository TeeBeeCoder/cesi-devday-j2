# DevDay : créer, contrôler et publier un mini-site

DevDay est le site fictif d’un événement tech. Le visiteur consulte trois ateliers, recherche un titre ou un thème et filtre les ateliers avec des places. Aucune inscription n’est enregistrée. Le dossier technique fourni s’appelle `delta-web`.

## 1. Ouvrir la page

Préparer Node.js 24.16.0, npm, Git, un compte GitHub et un assistant autorisé. Docker Desktop ou Docker Engine avec Compose doit être installé pour l’étape Sonar. Ouvrir **ce dossier** dans l’éditeur et son terminal : `package.json` doit être présent.

```sh
npm ci
npm run dev
```

Ouvrir l’adresse affichée. Garder ce terminal actif ; en ouvrir un autre dans le même dossier pour les contrôles. La page de départ contient des erreurs volontaires. Chercher `react` doit retrouver l’atelier React ; le départ n’y arrive pas encore.

## 2. Concevoir avec l’IA

Ouvrir `src/App.jsx` pour la page et `src/data.js` pour le programme. Utiliser `PROMPTS.md` : décrire le public, choisir une organisation puis demander un petit changement. Conserver les trois ateliers et les libellés des filtres. Le pilote manipule, le navigateur humain relit ; échanger après une correction. Tenir `journal.md` : choix, prompt utile, changement, résultat et difficulté restante.

## 3. Corriger puis tester

```sh
npm run lint:report
npm run test:unit
```

Le lint explique une règle et un emplacement : variable inutilisée, comparaison non stricte, rendu HTML interdit ou diagnostic de console. Les tests vérifient notamment la recherche dans le titre et le thème, les majuscules/accents, les places et les interactions React. La fonction est dans `src/workshops.js`. Ne pas changer les attendus pour faire accepter un filtre incorrect.

Les rapports sont `reports/eslint.json` et `coverage/index.html`. Le LCOV `coverage/lcov.info` est produit pour Sonar. La surcharge minimatch 11.0.1 corrige [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) dans les outils de développement ; lint, tests et build ont été exercés avec cette version. Refaire `npm audit` avant la séance.

## 4. Vérifier la page construite

```sh
npm run build
npx playwright install chromium
npm run test:e2e
npm run quality:summary
```

Le build crée `dist/`. Playwright démarre un aperçu de ce build et essaie la page sur ordinateur et mobile, au clavier et avec une recherche ressemblant à du HTML. Ouvrir `playwright-report/index.html` pour les scénarios, puis `reports/qualite.md` pour le résumé. `npm run check` enchaîne lint, tests, build et parcours navigateur ; à utiliser lorsque les corrections sont terminées.

## Contrôles ajoutés dans cette démonstration

Utilisez Node.js 24.16.0. Après `npm ci`, activez le hook Commitlint sur ce clone avec `npm run hooks:install`. Le pipeline vérifie aussi les messages de l’historique.

```sh
npm run test:logic
npm run test:component
npm run check
npm run quality:summary
npm run lint:commits
```

Le contrôle complet combine Prettier, Stylelint, ESLint/React, lint JSX, couverture Vitest, build et scénarios Chromium sur bureau et mobile. Playwright vérifie le comportement, l’accessibilité avec axe et les captures de référence. Relisez les différences avant d’accepter une capture. Les références Linux sont produites par le même workflow Ubuntu que celui qui les compare, puis versionnées après revue. Une exécution de génération de références ne déploie pas le site.

Pour publier sur GitHub Pages, sélectionnez GitHub Actions comme source puis définissez la variable de dépôt `ENABLE_PAGES=true`. Le job de publication dépend du job qualité sur `main`. Sonar s’exécute sur le poste avec Docker Compose.

## 5. Installer SonarQube local avec Docker

Les images sont figées par digest dans `compose.sonar.yml` et `.env.example`. Précharger et tester ces images ainsi que les prérequis mémoire/système de chaque poste avant la séance. La base embarquée sert au laboratoire temporaire, pas à la production.

```sh
docker compose -f compose.sonar.yml up -d sonarqube
docker compose -f compose.sonar.yml logs -f sonarqube
```

Attendre le démarrage, ouvrir **http://localhost:9000**, se connecter avec `admin` / `admin` et changer le mot de passe. Créer manuellement le projet de clé `delta-web`, définir sa période de nouveau code et générer un jeton d’analyse de ce projet. Copier `.env.example` vers `.env` ; y renseigner `SONAR_TOKEN`. Ce fichier est ignoré par Git : ne pas publier le jeton ni le placer dans React ou un prompt.

```sh
npm run test:unit
npm run sonar
```

Le scanner Docker utilise le même réseau Compose que le serveur : `http://sonarqube:9000`. Le navigateur du poste utilise `http://localhost:9000/dashboard?id=cesi-devday-j2`. Le script importe les sources et le LCOV, reprend l’utilisateur Unix du poste et fixe un dossier de travail accessible. Le scanner attend le Quality Gate : lire son journal et la tâche du serveur pour distinguer erreur technique et gate refusé.

Dans le dashboard, relever le projet, la révision, une alerte ou une mesure, le profil réellement actif et les conditions du gate. Les mesures du nouveau code et du code global sont différentes. Corriger, relancer les tests et scanner une seconde fois. Une alerte corrigée peut rester visible comme CLOSED/FIXED. Conserver les deux résultats dans le journal.

Pour arrêter sans supprimer les données : `docker compose -f compose.sonar.yml stop sonarqube`. Si le fichier est introuvable, vérifier le dossier ; si le daemon est inaccessible, démarrer Docker ; si le port 9000 est occupé, identifier le service déjà présent avant de modifier la configuration.

### Scanner une instance locale installée depuis le ZIP

Si le serveur Community Build est installé directement sur le poste, configurez son adresse de boucle locale dans `.env` avec le jeton du projet `cesi-devday-j2`. Le scanner npm utilise le même périmètre et le même rapport LCOV que le scanner Compose.

```sh
npm run test:unit
npm run sonar:host
```

Pour cet exercice, le serveur a été démarré sur macOS depuis le ZIP officiel avec Java 21 et la base embarquée. L’instance écoute sur `127.0.0.1`. Suivez les étapes d’installation du serveur pour reproduire cette variante. [Documentation SonarQube](https://docs.sonarsource.com/sonarqube-community-build/server-installation/from-zip-file/basic-installation)

## 6. Mettre le projet sur GitHub et publier

Créer un dépôt public d’exercice `devday` sur GitHub, puis choisir **Settings → Pages → Source: GitHub Actions**. Depuis ce dossier, adapter l’URL à votre compte autorisé :

```sh
git init -b main
git add .
git commit -m "feat: initialize the DevDay classroom project"
git remote add origin https://github.com/VOTRE-COMPTE/devday.git
git push -u origin main
```

Si le dépôt existe déjà dans le module, l’utiliser sans le réinitialiser. Le workflow `.github/workflows/qualite-pages.yml` est fourni. Les PR font les contrôles ; `main` les refait puis publie si le job `qualite` réussit. Aucun secret Sonar GitHub ni accès au poste local ne sont demandés. Le scan Sonar local reste une preuve à examiner avant la décision de livraison.

La base Vite est automatiquement `/<nom-du-depot>/`. Pour un dépôt `<compte>.github.io` ou un domaine personnalisé, créer la variable `PAGES_BASE=/`. Ouvrir l’URL de l’environnement `github-pages` après succès ; essayer recherche, places et clavier avec un autre binôme.

## 7. Prouver que le contrôle peut refuser

Dans une branche d’exercice, modifier temporairement `src/workshops.js` pour ne chercher que dans le titre. La recherche `react`, présente dans le thème, doit alors échouer aux tests. Ouvrir une PR et lire l’étape rouge : aucune publication ne doit avoir lieu. Restaurer la recherche titre + thème, pousser puis vérifier le retour au vert avant intégration. Conserver les révisions et les liens des exécutions.

## Configurations à ouvrir pendant le cours

| Fichier | Ce qu’il configure |
|---|---|
| `eslint.config.js` | Règles de lint, fichiers et niveaux |
| `vite.config.js` | React/Tailwind, tests, couverture et base de publication |
| `playwright.config.js` | Aperçu du build, ordinateur/mobile et rapports |
| `sonar-project.properties` | Sources, tests et chemin LCOV |
| `compose.sonar.yml` | Serveur et scanner Sonar locaux |
| `.github/workflows/qualite-pages.yml` | Contrôles et publication GitHub Pages |

[React](https://react.dev/learn), [Tailwind/Vite](https://tailwindcss.com/docs/installation/using-vite), [Vite/Pages](https://vite.dev/guide/static-deploy.html#github-pages), [Sonar Docker](https://docs.sonarsource.com/sonarqube-community-build/server-installation/from-docker-image/set-up-and-start-container).
