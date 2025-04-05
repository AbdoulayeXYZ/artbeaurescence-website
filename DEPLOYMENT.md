`bun run build && bunx serve@latest out`

# Guide de déploiement - Art'Beau-Rescence

Ce document détaille les étapes pour déployer le site web d'Art'Beau-Rescence sur différentes plateformes.

## Prérequis

- Node.js (version 18.x ou supérieure)
- npm ou bun
- Un compte sur la plateforme de déploiement choisie (Netlify ou Vercel)

## Options de déploiement

### 1. Déploiement sur Netlify (Recommandé)

Le projet est déjà configuré pour Netlify avec le fichier `netlify.toml` présent à la racine.

#### Déploiement via l'interface Netlify

1. Créez un compte sur [Netlify](https://www.netlify.com/) si vous n'en avez pas déjà un
2. Cliquez sur "New site from Git"
3. Sélectionnez votre fournisseur Git (GitHub, GitLab, Bitbucket)
4. Autorisez Netlify à accéder à vos dépôts
5. Sélectionnez le dépôt artbeau-rescence
6. Les paramètres de build sont déjà configurés dans le fichier `netlify.toml`:
   - Commande de build: `bun run build`
   - Répertoire de publication: `.next`
7. Cliquez sur "Deploy site"

#### Déploiement via Netlify CLI

1. Installez Netlify CLI: `npm install -g netlify-cli`
2. Authentifiez-vous: `netlify login`
3. Liez votre projet: `netlify init`
4. Déployez: `netlify deploy --prod`

### 2. Déploiement sur Vercel

Vercel est la plateforme créée par les développeurs de Next.js et offre une intégration optimale.

1. Créez un compte sur [Vercel](https://vercel.com/) si vous n'en avez pas déjà un
2. Installez Vercel CLI: `npm install -g vercel`
3. Authentifiez-vous: `vercel login`
4. Déployez: `vercel --prod`

Alternativement, vous pouvez utiliser l'interface web de Vercel:

1. Connectez-vous à votre compte Vercel
2. Cliquez sur "New Project"
3. Importez votre dépôt Git
4. Les paramètres seront automatiquement détectés
5. Cliquez sur "Deploy"

## Configuration du domaine personnalisé

Après le déploiement, vous pouvez configurer un domaine personnalisé:

### Sur Netlify

1. Allez dans les paramètres de votre site
2. Cliquez sur "Domain settings"
3. Cliquez sur "Add custom domain"
4. Suivez les instructions pour configurer les enregistrements DNS

### Sur Vercel

1. Allez dans les paramètres de votre projet
2. Cliquez sur "Domains"
3. Ajoutez votre domaine et suivez les instructions

## Optimisations post-déploiement

- Activez la mise en cache automatique des assets
- Configurez les en-têtes de sécurité (CSP, HSTS)
- Mettez en place un CDN pour une distribution globale optimale
- Configurez les redirections pour les anciennes URLs si nécessaire

## Maintenance et mises à jour

Pour mettre à jour le site:

1. Effectuez vos modifications dans le code source
2. Testez localement avec `npm run build` puis `npx serve@latest out`
3. Poussez vos modifications vers le dépôt Git
4. Le déploiement se fera automatiquement si vous avez configuré le déploiement continu

## Résolution des problèmes courants

### Problèmes de build

Si vous rencontrez des erreurs lors du build:

1. Vérifiez les logs de build sur la plateforme de déploiement
2. Assurez-vous que toutes les dépendances sont correctement installées
3. Vérifiez que les variables d'environnement nécessaires sont configurées

### Problèmes de performance

Si le site est lent après déploiement:

1. Utilisez des outils comme Lighthouse pour identifier les problèmes
2. Optimisez davantage les images et les assets
3. Vérifiez la configuration du CDN

## Support

Pour toute question ou assistance supplémentaire concernant le déploiement, contactez l'équipe technique d'Art'Beau-Rescence.