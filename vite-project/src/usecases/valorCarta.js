
/**
 * Obtener el valor de la carta
 * @param {string} carta recibe un string
 * @returns {Number} devuelve el valor de la carta(number).
 * A vale 11 puntos. J, Q , K valen 10 puntos. Carta númerica vale lo mismo que la carta.
 */
 export const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); //El substring divide el string, en este
    //caso le indicamos que es desde la posición 0 a la anteúltima, es decir le borramos el palo
    //ej 2C quedaría 2, 10H quedaría 10.

    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1; //si no es una carta numerica y es un A vale 11 puntos,
    // si es una J, Q , K vale 10 puntos. Si es una carta númerica vale lo mismo que la carta.
    //El valor*1 pasamos el string a number
  };