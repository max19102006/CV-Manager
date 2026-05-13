# 🗑️ Membre 6 — Fonctionnalité Supprimer un CV

> **Branche :** `feature/supprimer-cv`  
> **Fichier créé :** `src/delete.ts`  
> **Rôle :** Permettre à l'utilisateur de supprimer définitivement un CV depuis IndexedDB et de le retirer de l'affichage.

---

## 📁 Fichier créé

```
src/
└── delete.ts    ← tout le code de suppression est ici
```

---

## 🧠 Comment ça marche

La suppression se passe en **3 étapes** :

```
Utilisateur clique "Supprimer"
        ↓
Boîte de confirmation (oui / non)
        ↓ oui
supprimerCV(id) → IndexedDB.delete(id)
        ↓
La carte disparaît du DOM + notification verte
```

---

## 📦 Fonctions exportées

### `supprimerCV(id: string): Promise<void>`

Supprime le CV dans IndexedDB. C'est la fonction principale, elle ne touche pas à l'affichage.

```typescript
import { supprimerCV } from './delete';

await supprimerCV('abc-123');
// Le CV avec l'id 'abc-123' est supprimé de la base
```

---

### `attacherBoutonsSupprimer(): void`

Cherche tous les boutons `.btn-supprimer` dans la page et leur attache un écouteur de clic. À appeler depuis `main.ts` **après** que Membre 4 a affiché la liste.

```typescript
import { attacherBoutonsSupprimer } from './delete';

// Dans main.ts, après affichage de la liste :
attacherBoutonsSupprimer();
```

---

## 🔌 Intégration avec les autres membres

### Ce que Membre 4 doit faire (affichage de la liste)

Chaque carte de CV doit avoir :
1. Un attribut `data-cv-id` sur le conteneur de la carte
2. Un bouton avec la classe `btn-supprimer` et un attribut `data-id`

```html
<!-- Exemple de carte générée par Membre 4 -->
<div class="carte-cv" data-cv-id="abc-123">
  <h3>Jean Dupont</h3>
  <p>Développeur Web</p>

  <!-- Ce bouton est celui que Membre 6 gère -->
  <button class="btn-supprimer" data-id="abc-123">
    Supprimer
  </button>
</div>
```

### Ce que Membre 7 peut ajouter (CSS optionnel)

Le bouton et la notification fonctionnent sans CSS supplémentaire. Mais Membre 7 peut styler `.btn-supprimer` dans `style.css` :

```css
.btn-supprimer {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-supprimer:hover {
  background-color: #c62828;
}

.btn-supprimer:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Intégration dans `main.ts` (Membre 1 ou Membre 7)

```typescript
import { attacherBoutonsSupprimer } from './delete';

// Appeler après que la liste des CVs est affichée dans le DOM
attacherBoutonsSupprimer();
```

---

## 🔒 Pourquoi une confirmation avant suppression ?

La suppression dans IndexedDB est **irréversible** — il n'y a pas de corbeille. Si l'utilisateur clique par erreur, il perd ses données. La boîte `window.confirm()` est simple mais efficace pour éviter les suppressions accidentelles.

---

## ❓ Questions fréquentes

**Q : Pourquoi `transaction(STORE_NAME, 'readwrite')` et pas `'readonly'` ?**  
R : IndexedDB n'autorise les modifications (ajout, suppression, mise à jour) que dans une transaction `readwrite`. Une transaction `readonly` lève une erreur si on essaie de supprimer.

**Q : Que se passe-t-il si l'id n'existe pas dans la base ?**  
R : IndexedDB ne lève pas d'erreur dans ce cas — `delete()` réussit silencieusement même si l'enregistrement n'existe pas. C'est le comportement standard de l'API.

**Q : Pourquoi retirer la carte du DOM directement au lieu de recharger la page ?**  
R : Recharger la page (`window.location.reload()`) est plus simple mais moins agréable — l'utilisateur voit un flash blanc. Retirer la carte avec une animation (`opacity: 0`) donne une meilleure expérience. Si la carte n'est pas trouvée dans le DOM, on recharge quand même en fallback.

**Q : Pourquoi `DB_NAME` et `STORE_NAME` sont définis ici aussi ?**  
R : Pour que le fichier soit autonome et testable indépendamment. En intégration finale, Membre 2 peut exporter sa fonction `ouvrirDB()` et Membre 6 peut l'importer à la place.

---

*Membre 6 — Groupe CV Manager | Licence 2 Informatique | Université de Yaoundé 1*
