# Bilan DevDay J2

Le dépôt part du ZIP étudiant, figé par `c8b6b7d` avec le message `chore: ✨ Initial commit`. Le dossier d’exercice est distinct du dépôt DevDay déjà présent dans CESI. `git log --reverse --oneline` restitue l’ordre des étapes.

## Parcours réalisé

| Étape | Résultat observé |
|---|---|
| Règles de contribution | `AGENTS.md` impose le cycle rouge, vert, refactorisation. Le hook `commit-msg` a refusé un message invalide. Commitlint valide l’historique en CI. |
| Recherche React | Les tests existants ont échoué avant correction. Le filtre combine titre, thème et disponibilité en normalisant casse et accents. La saisie est rendue comme texte. |
| Lint et formatage | Prettier a détecté les fichiers à formater. Stylelint a refusé une couleur hexadécimale invalide. ESLint, les règles React et le lint JSX passent après restauration. |
| Tests Vitest | 7 tests de logique et 4 de composant réussis, avec rapport LCOV. |
| Tests Playwright | 12 tests sur les profils bureau et mobile. Les parcours vérifient la recherche, le clavier, le rendu du texte, axe et les captures de la page entière. Une modification temporaire des couleurs a fait échouer les deux comparaisons. |
| CI et régression | Les références Linux ont été générées par GitHub Actions, relues puis commitées. La comparaison normale passe sur Ubuntu. La PR d’exercice conserve un passage rouge et un passage vert après restauration du filtre. |

## Mesures et décisions

| Mesure et périmètre | Seuil | Avant | Après | Limite |
|---|---|---|---|---|
| Erreurs ESLint sur les fichiers analysés | 0 erreur | 3 erreurs, 1 avertissement | 0 erreur, 0 avertissement | Le lint ne vérifie pas les parcours. |
| Échecs Vitest sur la suite du projet | 0 échec sur 11 tests | 5 échecs | 0 échec | Les assertions portent sur les cas retenus. |
| Alertes Sonar actives sur le code analysé | 0 alerte active | 0 au premier scan | 0 au second scan | La stabilité dépend du profil et du périmètre d’analyse. |

Vitest mesure 100 % des lignes sur son périmètre configuré. Sonar mesure 97,1 % sur le sien et affiche un Quality Gate vert aux deux scans. Le périmètre Sonar inclut également les données de démonstration. Un résultat vert reste une preuve à examiner avec les scénarios et leurs limites.

## Exécutions GitHub

- [Génération des références visuelles Linux](https://github.com/TeeBeeCoder/cesi-devday-j2/actions/runs/41618931442).
- [Contrôle complet de main avec les références versionnées](https://github.com/TeeBeeCoder/cesi-devday-j2/actions/runs/41619461915).
- [PR de démonstration](https://github.com/TeeBeeCoder/cesi-devday-j2/pull/1), [4 échecs Vitest après régression](https://github.com/TeeBeeCoder/cesi-devday-j2/actions/runs/41619576943), [contrôles réussis après restauration](https://github.com/TeeBeeCoder/cesi-devday-j2/actions/runs/41619789301).

Le workflow conserve les rapports et le build statique vérifié dans les artefacts. Le dépôt est public et le job Pages a publié le site après la réussite du job qualité. [Exécution du déploiement](https://github.com/TeeBeeCoder/cesi-devday-j2/actions/runs/41620588080)

**[Ouvrir DevDay sur GitHub Pages](https://teebeecoder.github.io/cesi-devday-j2/)**

Les 12 tests Playwright ont réussi directement sur cette URL, avec Chromium en profils bureau et mobile. Ils couvrent le programme, la recherche, le filtre au clavier, le rendu du texte saisi, l’audit axe et la comparaison visuelle.

## SonarQube sur le poste

Le CLI Docker est bloqué par la configuration locale de l’allowlist. SonarQube Community Build 26.10 a été démarré depuis le ZIP officiel sur macOS avec Java 21, la base H2 d’exercice et une écoute sur `127.0.0.1`. Le cluster Elasticsearch isolé utilise des seuils de 10, 8 et 5 Go libres pour les niveaux bas, haut et critique. Le projet `cesi-devday-j2` a reçu deux rapports d’analyse locaux.

Un premier essai de la commande native a contacté le serveur par défaut du scanner et échoué avant l’envoi d’un rapport. Le jeton d’analyse local a été renouvelé. La commande livrée charge explicitement `.env`, vérifie l’URL de boucle locale et la passe au scanner. Elle a refusé une URL externe lors de sa vérification. Les identifiants et les rapports de travail sont conservés localement.

[Ouvrir le tableau de bord SonarQube local](http://127.0.0.1:9000/dashboard?id=cesi-devday-j2)

```sh
npm ci
npm run hooks:install
npm run lint:commits
npm run check
npm run test:unit
npm run sonar:host
```

L’instance ZIP est dans `/private/tmp/devday-j2-sonar`. Le README donne aussi la procédure Docker Compose prévue dans le support.
