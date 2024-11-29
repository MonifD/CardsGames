import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { generateShuffledDeck } from "../../utils/ImagesLoader"; // Source de la fonction de création d'un paquet mélangé
import { Card } from "../../Interfaces/Card"; // Importation du type Card pour la gestion des cartes

const cardBack = "/img/cards/Red_back.jpg"; 

const BatailleSimple = () => {
  const [mainJoueur, setMainJoueur] = useState<Card[]>([]); 
  const [mainOrdinateur, setMainOrdinateur] = useState<Card[]>([]); 
  const [carteJoueur, setCarteJoueur] = useState<Card | null>(null); 
  const [carteOrdinateur, setCarteOrdinateur] = useState<Card | null>(null);
  const [message, setMessage] = useState("");
  const [partieTerminee, setPartieTerminee] = useState(false);

  useEffect(() => {
    const paquetMele = generateShuffledDeck(); // Génération d'un paquet mélangé (source : https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
    setMainJoueur(paquetMele.slice(0, 26)); 
    setMainOrdinateur(paquetMele.slice(26)); 
  }, []);

  const jouerTour = () => {
    if (partieTerminee) return; 

    if (mainJoueur.length === 0 || mainOrdinateur.length === 0) {
      const gagnant = mainJoueur.length > mainOrdinateur.length ? "Joueur" : "Ordinateur";
      setMessage(`Fin du jeu ! Le gagnant est : ${gagnant}`);
      setPartieTerminee(true);
      return;
    }

    const nouvelleCarteJoueur = mainJoueur[0];
    const nouvelleCarteOrdinateur = mainOrdinateur[0];

    setCarteJoueur(nouvelleCarteJoueur); 
    setCarteOrdinateur(nouvelleCarteOrdinateur);

    if (nouvelleCarteJoueur.value > nouvelleCarteOrdinateur.value) {
      setMessage("Le joueur gagne ce tour !");
      setMainJoueur([...mainJoueur.slice(1), nouvelleCarteJoueur, nouvelleCarteOrdinateur]);
      setMainOrdinateur(mainOrdinateur.slice(1));
    } else if (nouvelleCarteJoueur.value < nouvelleCarteOrdinateur.value) {
      setMessage("L'ordinateur gagne ce tour !");
      setMainOrdinateur([...mainOrdinateur.slice(1), nouvelleCarteJoueur, nouvelleCarteOrdinateur]);
      setMainJoueur(mainJoueur.slice(1));
    } else {
      setMessage("Égalité !");
      setMainJoueur(mainJoueur.slice(1));
      setMainOrdinateur(mainOrdinateur.slice(1));
    }

    if (mainJoueur.length === 1 && mainOrdinateur.length === 1) {
      setTimeout(() => {
        const gagnantFinal = mainJoueur.length > mainOrdinateur.length ? "Joueur" : "Ordinateur";
        setMessage(`Fin du jeu ! Le gagnant est : ${gagnantFinal}`);
        setPartieTerminee(true);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-9">Bataille Simple</h1>
      <div className="flex justify-around items-center w-full max-w-2xl">
        <div className="text-center">
          <h2 className="text-lg font-bold">Joueur</h2>
          <p>{mainJoueur.length} cartes restantes</p>
          {carteJoueur && (
            <img
              src={carteJoueur.image}
              alt={`Carte Joueur`}
              width="100"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/img/cards/default.jpg"; 
              }}
            />
          )}
        </div>

        <div className="flex flex-col items-center justify-center p-5">
          <button
            onClick={jouerTour}
            className="inline-flex items-center justify-center border-2 rounded-lg shadow-lg w-15 h-28 mb-2"
            disabled={partieTerminee}
          >
            <img
              src={cardBack}
              alt="Dos de la carte"
              className="object-contain max-w-full max-h-full"
            />
          </button>
          <p className="mt-4 mb-8">{message}</p>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-bold">Ordinateur</h2>
          <p>{mainOrdinateur.length} cartes restantes</p>
          {carteOrdinateur && (
            <img
              src={carteOrdinateur.image}
              alt={`Carte Ordinateur`}
              width="100"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/img/cards/default.jpg"; 
              }}
            />
          )}
        </div>
      </div>
      <Link
        to="/"
        className="mt-4 px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default BatailleSimple;
