
## TODOS

5. coder les modèles SQL NodeJS soi même et tester uniquement `user`
    - cela signifie qu'il faut implémenter les méthodes des modèles mongo précédemment utilisées dans nos nouveaux modèles SQL (`findOne`, `save`, etc.)
    - commencer par user
7. se débarasser du code relatif à mongodDB dans l'app' une fois que les objectifs sont remplis // A FAIRE

OBJECTIF: 
- faire en sorte que le modèle user fonctionne avec MySQL en faisant les mêmes calls API que pour Mongo depuis Postman (pour créer un user et se login)
- toutes les tables que tu vas utiliser dans ton application devront être créées dans MySQL, avec leurs relations => on va commencer par la table `posts` que tu vas devoir créer avec 
sa relation avec `users`

parallel-todo: cours React sur OC (commencer ce cours quand besoin de varier)



TODOS FINIES:
<!-- 1. renommer le modèle `post` en `post` et ses champs (qui sont listés dans le mongoose Schema) de manière à ce que ça reflète la logique de l'application du P7; peut être que le nombre et 
le type de champs seront différents; en gros répondre à la question: "quelles seront la/les entité(s) de mon application ?" FAIT  -->
<!-- 2. mettre les conditions "if mongodb" dans le contrôleur "post", qui devra être renommé `post` en fonction du nom de l'entité choisie FAIT -->
<!-- 3. créer la database du P7 + créer dans MySQL (hors de NodeJS) les tables `users` et ... (le ou les entités auxquelles tu auras pensé) FAIT  -->
<!-- 4. se connecter à MySQL avec NodeJS FAIT-->
<!-- 6. trouver le moyen avec NodeJS de ne pas avoir à faire une requête "USE le_nom_de_ma_db" à chaque fois qu'on utilise SQL FAIT -->

