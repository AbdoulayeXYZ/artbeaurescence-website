# Effets Sonores AI-Karangué

Ce dossier contient la documentation des effets sonores pour l'expérience interactive AI-Karangué.

## Système Audio

L'expérience utilise un système audio générés synthétiquement via Web Audio API, ce qui signifie qu'aucun fichier audio externe n'est requis. Tous les sons sont créés en temps réel par le navigateur.

## Effets Sonores Disponibles

### 1. **opening** - Son d'ouverture majestueux
- **Usage**: Joué au début de l'expérience
- **Durée**: 3 secondes
- **Caractère**: Accord harmonieux et majestueux
- **Fréquences**: 220Hz, 330Hz, 440Hz, 660Hz

### 2. **hummingbirdFlap** - Battement d'ailes du colibri
- **Usage**: Animation du colibri, survol des boutons
- **Durée**: 0.1 seconde
- **Caractère**: Son rapide et léger
- **Fréquence**: 800Hz

### 3. **boxClick** - Clic métallique sur les boîtes
- **Usage**: Lors du clic sur une boîte fermée
- **Durée**: 0.1 seconde
- **Caractère**: Clic métallique distinctif
- **Fréquence**: 600Hz (onde carrée)

### 4. **boxOpen** - Ouverture magique des boîtes
- **Usage**: Quand une boîte s'ouvre et révèle son contenu
- **Durée**: 1.5 secondes
- **Caractère**: Effet magique et mystérieux
- **Fréquences**: 440Hz, 554Hz, 659Hz, 880Hz

### 5. **particleExplode** - Explosion de particules
- **Usage**: Effet visuel d'explosion de particules
- **Durée**: 0.8 secondes
- **Caractère**: Explosion énergique
- **Fréquences**: 200Hz, 400Hz, 800Hz, 1600Hz

### 6. **revelation** - Révélation épique
- **Usage**: Moments de révélation importants
- **Durée**: 4 secondes
- **Caractère**: Majestueux et puissant
- **Fréquences**: 220Hz, 277Hz, 330Hz, 440Hz, 554Hz, 660Hz

### 7. **screenShake** - Tremblement dramatique
- **Usage**: Effets de tremblement d'écran
- **Durée**: 0.5 secondes
- **Caractère**: Grave et impactant
- **Fréquence**: 60Hz (onde carrée)

### 8. **meteorShower** - Pluie de météores
- **Usage**: Effets visuels de météores
- **Durée**: 2 secondes
- **Caractère**: Cascade de sons
- **Fréquences**: 150Hz, 300Hz, 450Hz, 600Hz

### 9. **finalMessage** - Message final puissant
- **Usage**: Affichage du message final
- **Durée**: 3.5 secondes
- **Caractère**: Émotionnel et impactant
- **Fréquences**: 174Hz, 220Hz, 261Hz, 329Hz, 392Hz

### 10. **backgroundAmbient** - Ambiance de fond
- **Usage**: Son ambiant en continu
- **Durée**: 10 secondes (en boucle)
- **Caractère**: Atmosphérique et subtil
- **Fréquences**: 110Hz, 165Hz, 220Hz
- **Volume**: 0.08 (très discret)

## Configuration Audio

### Volumes par Défaut
- Sons d'interface: 0.3
- Sons d'ambiance: 0.08-0.1
- Sons d'impact: 0.4-0.5
- Sons de révélation: 0.3-0.5

### Contrôles Utilisateur
- **Bouton Audio**: Permet d'activer/désactiver tous les sons
- **Indicateur Visuel**: Animation du bouton quand le son est activé
- **État par Défaut**: Désactivé (respect des politiques de navigateur)

## Optimisations Techniques

1. **Génération Synthétique**: Aucun fichier externe requis
2. **Web Audio API**: Utilisation des capacités audio modernes
3. **Lazy Loading**: Sons créés seulement quand l'audio est activé
4. **Gestion Mémoire**: Libération automatique des ressources
5. **Fallback Gracieux**: Fonctionne même si l'audio est non supporté

## Intégration dans l'Expérience

Les effets sonores sont parfaitement synchronisés avec :
- Les animations Framer Motion
- Les transitions entre phases
- Les interactions utilisateur
- Les effets visuels (particules, couleurs)

## Politiques de Navigateur

Le système respecte les politiques d'autoplay des navigateurs modernes :
- Initialisation après interaction utilisateur
- Gestion gracieuse des erreurs audio
- Contrôle explicite par l'utilisateur

## Thème Musical

Tous les sons sont harmonisés avec le thème visuel du site :
- Couleurs bleues/teal → Fréquences correspondantes
- Rythme des animations → Timing audio
- Intensité émotionnelle → Volume et complexité harmonique

Cette approche crée une expérience audiovisuelle cohérente et immersive, parfaitement intégrée à l'identité du site Art'Beau-Rescence.
