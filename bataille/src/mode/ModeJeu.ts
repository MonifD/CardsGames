import { Cartes } from "../Interfaces/Cartes";

// cette fonction a le mécaniqme du jeu avec le fais de si les joueur ont des cartes similaires ou tout simplement le jeu de base

export const gererTourDeBataille = (
  carteJoueur: Cartes,
  carteOrdinateur: Cartes,
  mainJoueur: Cartes[],
  mainOrdinateur: Cartes[],
  cartesBrulees: Cartes[],
  setMainJoueur: React.Dispatch<React.SetStateAction<Cartes[]>>,
  setMainOrdinateur: React.Dispatch<React.SetStateAction<Cartes[]>>,
  setCartesBrulees: React.Dispatch<React.SetStateAction<Cartes[]>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setPartieTerminee: React.Dispatch<React.SetStateAction<boolean>>,
  setCarteJoueur: React.Dispatch<React.SetStateAction<Cartes | null>>,
  setCarteOrdinateur: React.Dispatch<React.SetStateAction<Cartes | null>>
) => {

  if (carteJoueur.value === carteOrdinateur.value) {
    setCartesBrulees([...cartesBrulees, carteJoueur, carteOrdinateur]);
    setMessage("Égalité ! Carte brûlée, tirage suivant.");
    
    setMainJoueur(mainJoueur.slice(1));
    setMainOrdinateur(mainOrdinateur.slice(1));

    setCarteJoueur(null);
    setCarteOrdinateur(null);
  } else if (carteJoueur.value > carteOrdinateur.value) {
    setMessage("Le joueur gagne ce tour !");
    setMainJoueur([
      ...mainJoueur.slice(1),
      carteJoueur,
      carteOrdinateur,
      ...cartesBrulees,
    ]);
    setMainOrdinateur(mainOrdinateur.slice(1));
    setCartesBrulees([]); 
  } else if (carteJoueur.value < carteOrdinateur.value) {

    setMessage("L'ordinateur gagne ce tour !");
    setMainOrdinateur([
      ...mainOrdinateur.slice(1),
      carteJoueur,
      carteOrdinateur,
      ...cartesBrulees,
    ]);
    setMainJoueur(mainJoueur.slice(1));
    setCartesBrulees([]);
  }

  if (mainJoueur.length === 0 || mainOrdinateur.length === 0) {
    const gagnant = mainJoueur.length > mainOrdinateur.length ? "Joueur" : "Ordinateur";
    setMessage(`Fin du jeu ! Le gagnant est : ${gagnant}`);
    setPartieTerminee(true);
  }
};
