// ============================================================
// src/delete.ts
// Fonctionnalité : Supprimer un CV
// Membre 6 — CV Manager
//
// Ce fichier expose une seule fonction principale : supprimerCV()
// Elle est appelée quand l'utilisateur clique sur "Supprimer"
// dans la liste des CVs (géré par Membre 4 — affichage).
// ============================================================

// ── Constantes (doivent correspondre à ce que Membre 2 a défini) ──
const DB_NAME = 'cv-manager-db';
const DB_VERSION = 1;
const STORE_NAME = 'cvs';

// ── Utilitaire : ouvrir la base IndexedDB ─────────────────
/**
 * Ouvre la connexion à IndexedDB.
 * On utilise la même base que Membre 2 — ne pas changer DB_NAME.
 *
 * @returns Promise<IDBDatabase>
 */
function ouvrirDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ── Fonction principale : supprimer un CV ─────────────────
/**
 * Supprime un CV de IndexedDB à partir de son identifiant.
 *
 * Étapes internes :
 *   1. Ouvrir la base
 *   2. Ouvrir une transaction en mode "readwrite"
 *   3. Appeler delete() sur le store avec l'id
 *   4. Résoudre la promesse si succès, rejeter si erreur
 *
 * @param id - L'identifiant unique du CV à supprimer
 * @returns Promise<void> — se résout quand la suppression est faite
 */
export async function supprimerCV(id: string): Promise<void> {
  const db = await ouvrirDB();

  return new Promise((resolve, reject) => {
    // Une transaction "readwrite" est nécessaire pour modifier les données.
    // "readonly" ne suffit pas pour supprimer.
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.delete(id);

    request.onsuccess = () => {
      console.log(`CV ${id} supprimé avec succès.`);
      resolve();
    };

    request.onerror = () => {
      console.error(`Erreur lors de la suppression du CV ${id} :`, request.error);
      reject(request.error);
    };
  });
}

// ── Fonction UI : attacher les boutons Supprimer ──────────
/**
 * Attache un écouteur de clic sur tous les boutons "Supprimer"
 * présents dans la liste des CVs.
 *
 * À appeler depuis main.ts après que Membre 4 a affiché la liste.
 *
 * Exemple HTML attendu (généré par Membre 4) :
 *   <button class="btn-supprimer" data-id="abc-123">Supprimer</button>
 *
 * Quand l'utilisateur clique :
 *   1. Une boîte de confirmation apparaît
 *   2. Si confirmé → suppression + rechargement de la liste
 *   3. Si annulé → rien ne se passe
 */
export function attacherBoutonsSupprimer(): void {
  // Sélectionner tous les boutons de suppression dans la page
  const boutons = document.querySelectorAll<HTMLButtonElement>('.btn-supprimer');

  boutons.forEach((bouton) => {
    bouton.addEventListener('click', async () => {
      // Récupérer l'id stocké dans l'attribut data-id du bouton
      const id = bouton.dataset.id;

      if (!id) {
        console.error('Bouton sans data-id — impossible de supprimer.');
        return;
      }

      // Demander confirmation avant de supprimer définitivement
      const confirme = window.confirm(
        'Voulez-vous vraiment supprimer ce CV ? Cette action est irréversible.'
      );

      if (!confirme) return;

      try {
        // Désactiver le bouton pendant la suppression (évite double-clic)
        bouton.disabled = true;
        bouton.textContent = 'Suppression...';

        await supprimerCV(id);

        // Retirer la carte du CV du DOM sans recharger toute la page
        // On cherche le conteneur parent avec data-cv-id
        const carteCV = document.querySelector(`[data-cv-id="${id}"]`);
        if (carteCV) {
          // Animation de disparition avant de retirer l'élément
          (carteCV as HTMLElement).style.transition = 'opacity 0.3s ease';
          (carteCV as HTMLElement).style.opacity = '0';

          setTimeout(() => {
            carteCV.remove();
            afficherNotification('CV supprimé avec succès.', 'succes');
          }, 300);
        } else {
          // Si pas de carte trouvée, recharger la page
          window.location.reload();
        }

      } catch (erreur) {
        console.error('Échec de la suppression :', erreur);
        afficherNotification('Erreur lors de la suppression.', 'erreur');
        bouton.disabled = false;
        bouton.textContent = 'Supprimer';
      }
    });
  });
}

// ── Notification visuelle ─────────────────────────────────
/**
 * Affiche un message temporaire en bas de l'écran.
 * Disparaît automatiquement après 3 secondes.
 *
 * @param message - Texte à afficher
 * @param type    - 'succes' (vert) | 'erreur' (rouge)
 */
function afficherNotification(message: string, type: 'succes' | 'erreur'): void {
  // Créer l'élément notification
  const notif = document.createElement('div');
  notif.className = `notification notification-${type}`;
  notif.textContent = message;

  // Styles inline pour être autonome (sans dépendre du CSS de Membre 7)
  Object.assign(notif.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    padding: '12px 20px',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: '600',
    fontSize: '14px',
    backgroundColor: type === 'succes' ? '#2e7d32' : '#c62828',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: '9999',
    transition: 'opacity 0.3s ease',
    opacity: '1',
  });

  document.body.appendChild(notif);

  // Disparaît après 3 secondes
  setTimeout(() => {
    notif.style.opacity = '0';
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}
