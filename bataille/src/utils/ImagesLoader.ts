
//cette fonction va me permettre de charger les carte 
//et les mettre dans une liste que je peux la traiter plus trad dans SimpleBataille.tsx
// Génération d'un paquet mélangé (source : https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
import { Cartes } from "../Interfaces/Cartes";

export const genererPaquetMelange  = (): Cartes[] => {
  const suits = ["C", "D", "H", "S"];
  const values = [
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
    { value: 11, label: "J" },
    { value: 12, label: "Q" },
    { value: 13, label: "K" },
    { value: 14, label: "A" },
  ];

  const fullDeck: Cartes[] = [];
  for (const suit of suits) {
    for (const { value, label } of values) {
      const image = `/img/cards/${label}${suit}.jpg`;
      fullDeck.push({ value, suit, image });
    }
  }
  
  return fullDeck.sort(() => Math.random() - 0.5);
};
