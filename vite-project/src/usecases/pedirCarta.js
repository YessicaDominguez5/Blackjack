
/**
 * Pedir una carta del mazo(lógica del mazo)

 * Recibe el Deck 
 * @param {Array<String>} deck
 * @returns {String}la carta tomada del mazo
 */
export const pedirCarta = (deck) => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }

    return deck.pop();

  };

