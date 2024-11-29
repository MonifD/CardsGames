import { Cartes } from "../Interfaces/Cartes";

// Fonction pour obtenir la prochaine carte de la pile
export const voirProchaineCarte = (mainJoueur: Cartes[]): Cartes | null => {
  if (mainJoueur.length > 1) {
    return mainJoueur[0];
  }
  return null; // Pas de prochaine carte si la pile contient une seule carte ou est vide
};
