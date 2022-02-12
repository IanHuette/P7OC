## FONCTIONNALITES ESSENTIELLES

1. voir les posts dans un ordre chronologique ✅
2. restreindre l'accès aux posts si non authentifié ✅
3. 1. création d'un compte ✅ 2) notification de succès à l'utilisateur ✅ 3) redirection vers les posts ✅
4. 1. connexion à un compte ✅ 2) notification de succès à l'utilisateur ✅ 3) redirection vers les posts ✅
5. notifications d'échec pour le signup et login ✅
6. suppression d'un compte (ajouter une route qui redirige vers une page "profil" pour supprimer le user) ⏱
7. quand je suis connecté à l'application, je ne peux pas accéder à LoginSignup ✅
8. mettre en place un système de personalisation des users (bonjour 'username') ⏱
   1) style de l'icone de profil + lien associé dans la banner
   2) si la personne est connecté affiché son username comme sur la base de donnée
   3) si elle n'est pas connecté affiché un lien vers login
9. publication d'un post ⏱
10. associer une image à un post
11. 1) valider formulaires de signup et login côté front 2) valider formulaires signup et login côté back

## FONCTIONNALITES BONUS

1. pouvoir mettre en place un système de notification sur les nouveaux posts ( 5 nouveaux post depuis votre derniere visite )

// DIFFICULTÉS //
etape 7 - problème d'avoir l'userId dans le localStorage (undefined), ce qui bloque mon étape de suppression de compte
etape 8 - problème auth, le token n'est pas visible dans le header autorization , voir peut être localstorage pour enregistrer le token et le vérifier
etape 9- problème pour enlever les "" et pour enlever dans Bannière login signup le username
