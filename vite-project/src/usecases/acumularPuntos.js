import { valorCarta } from "./valorCarta";
/**
 * 
Turno 0 Jugador, último turno Computadora
 * @param {String} carta 
 * @param {Number} turno posicion del array puntosJugadores  
 * @param {Array<number>}
 * @param {Number}
 * @returns 
 */


export const acumularPuntos = (carta, turno, puntosJugadores = []) => {
    
    
    if(!carta){
        
        throw new Error('La carta es necesaria');
    }
    
    
    

    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);


    return puntosJugadores[turno];
  }
