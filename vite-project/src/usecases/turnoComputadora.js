
import { pedirCarta } from "./pedirCarta";
import { acumularPuntos } from "./acumularPuntos";
import { crearCarta } from "./crearCarta";
import { valorCarta } from "./valorCarta";
//import { crearCarta } from "./crearCarta";
/**
 Turno de la computadora
 * 
 * @param {Number} puntosMinimos  puntos minimos que la computadora necesita para ganar
 * @param {Array<String>} deck
 */


  export const turnoComputadora = (puntosMinimos, deck = [], puntosJugadores, divCartasJugadores) => {
    
    if(!puntosMinimos){

        throw new Error('puntosMinimos son necesarios');
    }

    let puntosComputadora = 0;
    
    
    do {

    

      const carta = pedirCarta(deck);

      //puntosComputadora = mostrarPuntaje(carta, puntosComputadora, 1);

     // mostrarCarta(carta, divCartasComputadora);

     puntosComputadora = puntosComputadora + valorCarta(carta);

     const imagenCarta = document.createElement("img");

      let imagenCartaPedida = crearCarta(carta, imagenCarta); //puntosJugadores, acá no nos interesan los puntos sino la cantidad de posiciones del array
      //divCartasJugadores[puntosJugadores.length - 1].append(imagenCartaPedida);

      divCartasJugadores[puntosJugadores.length - 1].append(imagenCartaPedida);
       
      //puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1, puntosJugadores); //el .length porque sabemos que la computadora siempre tiene el último turno.
      

     
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    return puntosComputadora;
   //determinarGanador();
  };
