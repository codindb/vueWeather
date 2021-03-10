[![Netlify Status](https://api.netlify.com/api/v1/badges/0d44952d-59ce-4476-9005-7bbc6180dea3/deploy-status)](https://app.netlify.com/sites/mycityweatherapp/deploys)

## Alternance - Projet Vue.js v3

_En préambule, pensez à créer un fork de ce projet dans votre espace personnel sur Github. Clonez ensuite ce fork dans votre espace de travail local._
_Assurez-vous également que Node.js et NPM sont installés et à jour sur votre poste de travail._

### Reprise du projet "Météo"

Ce dépôt contient une base de code équivalente à celle réalisée lors du module SPA 1ère partie. Il va vous servir de socle pour la suite du projet en Vue.js.
Commencez par installer les dépendances du projet avec NPM. Créez ensuite à la racine du projet un fichier `.env.development` qui contient les champs suivants :

```
VUE_APP_DEFAULT_LATITUDE=
VUE_APP_DEFAULT_LONGITUDE=
VUE_APP_OW_APP_ID=
```

Compléter le fichier en y intégrant la latitude et la longitude de votre choix, ainsi que la clé APP_ID qui vous permettra d'appeler l'API OpenWeatherMap.
Vérifiez ensuite que le projet démarre bien et que vous pouvez consulter les différentes vues.
