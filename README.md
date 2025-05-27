# Jeu d'Énigmes – Node.js, React & Playwright

Bienvenue sur le dépôt du **jeu d’énigmes** fullstack utilisant Node.js, React, TypeScript, Vite et Playwright.
Le projet propose des énigmes interactives, des tests automatisés (Vitest & Playwright), du linting et du formatage automatisé, ainsi qu'une intégration continue avec GitHub Actions.

---

## 🚀 Commandes principales

| Commande            | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Démarre le serveur en mode développement (Vite)          |
| `npm run build`     | Build complet TypeScript + Vite                          |
| `npm run preview`   | Prévisualise le build production                         |
| `npm run lint`      | Analyse le code avec ESLint                              |
| `npm run test`      | Lance tous les tests unitaires et d'intégration (Vitest) |
| `npm run format`    | Formate le code avec Prettier                            |
| `node run e2e` | Lance les tests end-to-end Playwright en mode script     |

---

## 🏁 Démarrer le projet

```bash
npm install
npm run dev
```

Accède ensuite à [http://localhost:5173](http://localhost:5173)

---

## 🔑 Réponses pour les énigmes

* **StrongBox** : `1234`
* **HiddenWord** : `mystere`
* **ColorButton** : `Vert`, `Jaune`, `Orange`

---

## 🧪 Tests & Qualité

* **Tests unitaires/integration :**

  ```bash
  npm run test
  ```
* **Tests end-to-end Playwright :**

  ```bash
  node tests/e2e.js
  ```
* **Lint :**

  ```bash
  npm run lint
  ```
* **Formatage :**

  ```bash
  npm run format
  ```

---

## 🤖 Intégration Continue (GitHub Actions)

Le workflow CI se lance automatiquement sur chaque `push` sur la branche `main`.
Il réalise dans l'ordre : installation, lint, test, format.
Le pipeline se trouve dans `.github/workflows/ci.yml`.

---

## 🛠️ Stack technique

* **Node.js**, **TypeScript**, **React 19**, **Vite**
* **Playwright** (e2e), **Vitest** (unitaires)
* **ESLint** & **Prettier** (qualité)


**Créé par Abenojar Quentin**