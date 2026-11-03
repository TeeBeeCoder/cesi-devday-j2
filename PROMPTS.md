# Les prompts de construction de DevDay

Chaque demande part de la page de l’événement. Coller seulement les fichiers fictifs utiles. Après la réponse : relire le diff, essayer la page et conserver le résultat. Le pilote utilise l’outil ; le navigateur humain questionne et vérifie.

## 1. Cadrer le site

> Nous créons DevDay, le mini-site d’un événement tech pour [public]. Il présente la journée et trois ateliers, avec recherche par titre/thème et filtre des places. React/Vite/Tailwind sont déjà installés. La page sera statique sur GitHub Pages. Pose-nous trois questions de conception et attends nos réponses avant de coder.

## 2. Comparer deux interfaces

> Voici nos réponses et deux critères : [coller]. Propose deux organisations de la page DevDay, sur ordinateur et téléphone. Décris sections, cartes et emplacement des filtres. Explique un avantage et une difficulté de chaque option. Garde les données ; ne génère pas encore le code.

## 3. Améliorer une zone

> Voici App.jsx et notre choix. Propose un petit diff React/Tailwind pour [zone]. Garde les trois ateliers, les libellés et l’appel à filterWorkshops. N’ajoute ni serveur ni dépendance. Explique le changement, puis deux actions pour le vérifier dans le navigateur.

## 4. Réparer la recherche sous test

> Voici src/workshops.js. Le filtre doit chercher dans le titre et le thème, ignorer majuscules, accents et espaces autour de la recherche, puis appliquer le filtre des places. Attendus : react donne l’atelier React ; qualite donne l’atelier Qualité ; recherche vide avec places cochées donne deux ateliers. Explique l’échec et propose une correction limitée. Conserve tests, ordre et données.

## 5. Comprendre une alerte

> Voici la sortie ESLint et le code concerné. Explique le fichier, la règle et ce qu’elle signale réellement. Propose une correction limitée sans désactiver de règle ni supprimer de test. Donne la commande à relancer et le changement attendu dans sa sortie. Distingue le constat du risque supposé.

## 6. Lire un test et le compléter

> Voici le besoin de recherche et les trois ateliers, sans l’implémentation. Propose trois exemples avec résultats attendus et raisons, puis attends nos calculs avant d’écrire les assertions Vitest. Ne déduis pas les attendus d’un code qui peut être incorrect.

## 7. Lire Sonar local

> Voici un résultat réel de notre SonarQube Docker, sans jeton. Aide-nous à retrouver règle, fichier, périmètre et état de l’alerte. Distingue profil et Quality Gate, couverture globale et nouveau code. Propose une correction à vérifier ; n’invente pas une alerte ni un résultat manquant.

## 8. Comprendre la publication

> Voici qualite-pages.yml. Explique l’ordre des commandes, le chemin d’une PR puis d’un push sur main et la condition qui bloque publier. Notre Sonar tourne localement dans Docker : explique pourquoi le runner GitHub ne le contacte pas. Ne propose pas d’ignorer un échec. Termine par les clics et commandes que nous devons réellement effectuer.

## 9. Décider ensemble

> Voici nos résultats réellement obtenus [coller] et notre URL. Aide-nous à rédiger quatre lignes : ce qui fonctionne, la preuve, la limite et la prochaine correction. Ne transforme ni un rapport absent ni un gate vert en garantie de qualité totale.
