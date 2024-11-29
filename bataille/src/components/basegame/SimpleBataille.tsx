// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { generateShuffledDeck } from "../../utils/ImagesLoader"; 
// import { Cartes } from "../../Interfaces/Cartes"; 
// import { gererTourDeBataille } from "../../mode/ModeJeu"; 

// const cardBack = "/img/cards/Red_back.jpg"; 

// const BatailleSimple = () => {
//   const [mainJoueur, setMainJoueur] = useState<Cartes[]>([]); 
//   const [mainOrdinateur, setMainOrdinateur] = useState<Cartes[]>([]); 
//   const [carteJoueur, setCarteJoueur] = useState<Cartes | null>(null); 
//   const [carteOrdinateur, setCarteOrdinateur] = useState<Cartes | null>(null);
//   const [message, setMessage] = useState("");
//   const [partieTerminee, setPartieTerminee] = useState(false);
//   const [cartesBrulees, setCartesBrulees] = useState<Cartes[]>([]);  

//   useEffect(() => {
//     const paquetMele = generateShuffledDeck(); 
//     setMainJoueur(paquetMele.slice(0, 26)); 
//     setMainOrdinateur(paquetMele.slice(26)); 
//   }, []);

//   const jouerTour = () => {
//     if (partieTerminee) return; 

//     if (mainJoueur.length === 0 || mainOrdinateur.length === 0) {
//       const gagnant = mainJoueur.length > mainOrdinateur.length ? "Joueur" : "Ordinateur";
//       setMessage(`Fin du jeu ! Le gagnant est : ${gagnant}`);
//       setPartieTerminee(true);
//       return;
//     }

//     const nouvelleCarteJoueur = mainJoueur[0];
//     const nouvelleCarteOrdinateur = mainOrdinateur[0];

//     setCarteJoueur(nouvelleCarteJoueur); 
//     setCarteOrdinateur(nouvelleCarteOrdinateur);

//     // Appel à gererTourDeBataille pour gérer la logique de l'égalité et des cartes brûlées
//     gererTourDeBataille(
//       nouvelleCarteJoueur,
//       nouvelleCarteOrdinateur,
//       mainJoueur,
//       mainOrdinateur,
//       cartesBrulees,
//       setMainJoueur,
//       setMainOrdinateur,
//       setCartesBrulees,
//       setMessage,
//       setPartieTerminee,
//       setCarteJoueur,
//       setCarteOrdinateur
//     );
//   };

//   return (
//     <div className="flex flex-col items-center p-4">
//       <h1 className="text-2xl font-bold mb-9">Bataille Simple</h1>
//       <div className="flex justify-around items-center w-full max-w-2xl">
//         <div className="text-center">
//           <h2 className="text-lg font-bold">Joueur</h2>
//           <p>{mainJoueur.length} cartes restantes</p>
//           {carteJoueur && (
//             <img
//               src={carteJoueur.image}
//               alt={`Carte Joueur`}
//               width="100"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = "/img/cards/default.jpg"; 
//               }}
//             />
//           )}
//         </div>

//         <div className="flex flex-col items-center justify-center p-5">
//           <button
//             onClick={jouerTour}
//             className="inline-flex items-center justify-center border-2 rounded-lg shadow-lg w-15 h-28 mb-2"
//             disabled={partieTerminee}
//           >
//             <img
//               src={cardBack}
//               alt="Dos de la carte"
//               className="object-contain max-w-full max-h-full"
//             />
//           </button>
//           <p className="mt-4 mb-8">{message}</p>
          
//           {/* Affichage des cartes brûlées */}
//           {cartesBrulees.length > 0 && (
//             <div className="mt-4">
//               <h3 className="text-lg font-bold">Cartes brûlées :</h3>
//               <div className="flex">
//                 {cartesBrulees.map((carte, index) => (
//                   <img
//                     key={index}
//                     src={carte.image}
//                     alt={`Carte Brûlée ${index}`}
//                     width="50"
//                     className="mx-2"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src = "/img/cards/default.jpg"; 
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="text-center">
//           <h2 className="text-lg font-bold">Ordinateur</h2>
//           <p>{mainOrdinateur.length} cartes restantes</p>
//           {carteOrdinateur && (
//             <img
//               src={carteOrdinateur.image}
//               alt={`Carte Ordinateur`}
//               width="100"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = "/img/cards/default.jpg"; 
//               }}
//             />
//           )}
//         </div>
//       </div>
//       <Link
//         to="/"
//         className="mt-4 px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
//       >
//         Retour à l'accueil
//       </Link>
//     </div>
//   );
// };

// export default BatailleSimple;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { generateShuffledDeck } from "../../utils/ImagesLoader"; 
import { Cartes } from "../../Interfaces/Cartes"; 
import { gererTourDeBataille } from "../../mode/ModeJeu"; 

const cardBack = "/img/cards/Red_back.jpg"; 

const BatailleSimple = () => {
  const [mainJoueur, setMainJoueur] = useState<Cartes[]>([]); 
  const [mainOrdinateur, setMainOrdinateur] = useState<Cartes[]>([]); 
  const [carteJoueur, setCarteJoueur] = useState<Cartes | null>(null); 
  const [carteOrdinateur, setCarteOrdinateur] = useState<Cartes | null>(null);
  const [message, setMessage] = useState("");
  const [partieTerminee, setPartieTerminee] = useState(false);
  const [cartesBrulees, setCartesBrulees] = useState<Cartes[]>([]);  

  useEffect(() => {
    const paquetMele = generateShuffledDeck(); 
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

    // Appel à gererTourDeBataille pour gérer la logique de l'égalité et des cartes brûlées
    gererTourDeBataille(
      nouvelleCarteJoueur,
      nouvelleCarteOrdinateur,
      mainJoueur,
      mainOrdinateur,
      cartesBrulees,
      setMainJoueur,
      setMainOrdinateur,
      setCartesBrulees,
      setMessage,
      setPartieTerminee,
      setCarteJoueur,
      setCarteOrdinateur
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-9">Bataille Simple</h1>
      <div className="flex justify-around items-center w-full max-w-4xl">
        {/*Source pour utiliser des commentaire en react : https://stackoverflow.com/questions/30766441/how-to-use-comments-in-react*/}
        
        {/* Section Joueur */} 
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold mb-9">Joueur</h2>
          <div className="flex items-center">
            <div className="relative flex flex-col mr-24">
              {mainJoueur.map((_, index) => (
                <img
                  key={index}
                  src={cardBack}
                  alt="Carte dos"
                  className="absolute w-20 h-28 object-cover"
                  style={{
                    top: `${index * 2}px`,
                    left: `${index * 2}px`,
                  }}
                />
              ))}
              <p className="mt-44 text-center">{mainJoueur.length} cartes</p>
            </div>

            {/* Carte jouée par le jouer */}
            {carteJoueur && (
              <img
                src={carteJoueur.image}
                alt={`Carte Joueur`}
                className="w-24 h-36"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/img/cards/default.jpg";
                }}
              />
            )}
          </div>
        </div>

        {/* Zone centrale */}
        <div className="flex flex-col items-center justify-center">
          {cartesBrulees.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold">Cartes brûlées :</h3>
              <div className="flex">
                {cartesBrulees.map((carte, index) => (
                  <img
                    key={index}
                    src={carte.image}
                    alt={`Carte Brûlée ${index}`}
                    width="50"
                    className="mx-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/img/cards/default.jpg"; 
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section Ordinateur */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold mb-9">Ordinateur</h2>
          <div className="flex items-center">
            {/* Carte jouée par l'ordinateur */}
            {carteOrdinateur && (
              <img
                src={carteOrdinateur.image}
                alt={`Carte Ordinateur`}
                className="w-24 h-36"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/img/cards/default.jpg";
                }}
              />
            )}
            <div className="relative flex flex-col ml-8">
              {mainOrdinateur.map((_, index) => (
                <img
                  key={index}
                  src={cardBack}
                  alt="Carte dos"
                  className="absolute w-20 h-28 object-cover"
                  style={{
                    top: `${index * 2}px`,
                    left: `${index * 2}px`,
                  }}
                />
              ))}
              <p className="mt-44 text-center">{mainOrdinateur.length} cartes</p>
            </div>
          </div>

        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
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
          <p className="mt-4 mb-8 text-center">{message}</p>
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
