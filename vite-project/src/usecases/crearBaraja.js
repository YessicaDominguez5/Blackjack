
 import { shuffle } from "underscore";

 /**
  * Esta función crea un nuevo deck
  * @param {Array<String>} tiposDeCartas  ejemplo: ["C", "H", "D", "S"]
  * @param {Array<String>} CartasEspeciales ejemplo: ["A", "J", "Q", "K"]
  * @returns {Array} retorna un nuevo Deck de Cartas
  */

  export const crearDeck = (tiposDeCartas, cartasEspeciales) => {
   
   if(!tiposDeCartas || tiposDeCartas.length === 0){
    throw new Error('tiposDCartas es obligatorio como un array de string');
   } //En typescript no hacen falta estas validaciones pero en js te pueden mandar por ejemplo crearDeck([]);

   if(!cartasEspeciales || cartasEspeciales.length === 0){
    throw new Error('cartasEspeciales es obligatorio como un array de string');
   }
   
   
    let deck = [];

    for (let i = 2; i <= 10; i++) {
      for (let tipo of tiposDeCartas) {
        deck.push(i + tipo);
      }
    }

    for (let especial of cartasEspeciales) {
      for (let tipo of tiposDeCartas) {
        deck.push(especial + tipo);
      }
    }

    return shuffle(deck); //función de la librería undescore. Cambia de posición los elementos del array de manera aleatoria.
  };
