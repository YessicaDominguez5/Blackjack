import _ from 'underscore'; // para que traiga todo el paquete sino import {shuffle} from 'underscore';
import {pedirCarta, crearDeck, valorCarta, turnoComputadora, acumularPuntos, crearCarta} from '../usecases';


//Patrón Módulo (para proteger el código)
const miModulo = (() => {
  'use strict';

  /* 2C 2 de Clubs(tréboles)*/
  /* 2H 2 de Hearts(corazones)*/
  /* 2D 2 de Diamonds(diamante)*/
  /* 2S 2 de Spades(espadas)*/

  let deck = [];
  const tipos = ["C", "H", "D", "S"],
    especiales = ["A", "J", "Q", "K"];

  //let puntosJugador = 0,
    //puntosComputadora = 0;

    let puntosJugadores = [0,0];
   

  //Referencias HTML

    const btnPedir = document.querySelector("#btnPedirCarta"),
    btnDetener = document.querySelector("#btnDetener"),
    btnJuegoNuevo = document.querySelector("#btnNuevoJuego");
    // imagenCarta = document.createElement("img"); //creamos un elemento img

    const smalls = document.querySelectorAll("small"); //smalls es const porque es la referencia (ubicación)
    // a los elementos small y esta nunca va a cambiar, lo que cambia es el valor que se muestra en esa ubicación.          
    const divCartasJugadores = document.querySelectorAll(".divCartas");

 /* const divCartasJugador = document.querySelector("#jugador-cartas"),
    divCartasComputadora = document.querySelector("#computadora-cartas");*/


  
  //Inicializar Juego

  const inicializarJuego = (numJugadores = 2) =>{

    deck = crearDeck(tipos, especiales);

    puntosJugadores = [];


    for(let i = 0; i < numJugadores; i++){

        puntosJugadores.push(0); //inicializa en 0 las posiciones del array

    }
    
    smalls.forEach(elem => elem.innerText = 0); //Pone en 0 los puntajes cuando se inicializa una partida
   
    divCartasJugadores.forEach(elem => elem.innerText = ""); //borra las cartas en una nueva partida


     btnPedir.disabled = false;
     btnDetener.disabled = false;
  }


  //btn Detener

  const detener = () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    puntosJugadores[1] = turnoComputadora(puntosJugadores[0], deck, puntosJugadores, divCartasJugadores);
    smalls[1].innerText = puntosJugadores[1];
    determinarGanador();
    //const imagenCarta = document.createElement("img");
    //imagenCartaPedida = crearCarta(carta, imagenCarta); //puntosJugadores, acá no nos interesan los puntos sino la cantidad de posiciones del array
    //divCartasJugadores[puntosJugadores.length - 1].append(imagenCartaPedida);
  
  };

  

  //Mostrar Puntaje

 /* const mostrarPuntaje = (carta, puntos, posSmall) => {
    puntos = puntos + valorCarta(carta);

    smalls[posSmall].innerText = puntos; //smalls es una Referencia HTML, document.QuerySelectorAll('small');

    return puntos;
  };*/


  //Mostrar imagen carta

  // const mostrarCarta = (carta, divCartas) => {
  //   const imagenCarta = document.createElement("img"); //creamos un elemento img

  //   imagenCarta.src = `assets/cartas/${carta}.png`; //Le indicamos la ruta de la imagen, y la carta a mostrar que cambia dependiendo que carta salga

  //   imagenCarta.classList.add("carta"); // Le agregamos la clase carta que creamos en css

  //   divCartas.append(imagenCarta); //Le indicamos donde mostrarlas, divCartasJugador es una Referencia HTML
  // };


 

const determinarGanador = () =>{

  const [puntosMinimos, puntosComputadora] = puntosJugadores; //destructuring

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Nadie gana");
    } else if (puntosMinimos > 21) {
      alert("Computadora gana");
    } else if (puntosComputadora > 21) {
      alert("Jugador gana");
    } else {
      alert("Computadora gana");
    }
  }, 700); //para que el alert tarde unos milisegundos más en aparecer y primero se vea la jugada y después el alert

}

  //Eventos

  btnPedir.addEventListener("click", () => {

    //let puntosJugador = 0;
   // let puntosComputadora = 0;
   let imagenCartaPedida;
    const carta = pedirCarta(deck);

    //Mostrar puntaje

    //puntosJugador = mostrarPuntaje(carta, puntosJugador, 0);

    //mostrarCarta(carta, divCartasJugador);

   puntosJugadores[0] = acumularPuntos(carta, 0, puntosJugadores); //porque Jugador esta en la posición 0 del array (Mostrar Puntos)
   smalls[0].innerText =  puntosJugadores[0];

   const imagenCarta = document.createElement("img");
    imagenCartaPedida = crearCarta(carta, imagenCarta); //(mostrar carta del jugador)
    divCartasJugadores[0].append(imagenCartaPedida);

    //Lógica del juego

    if (puntosJugadores[0] > 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      puntosJugadores[1]= turnoComputadora(puntosJugadores[0], deck, puntosJugadores, divCartasJugadores);
      smalls[1].innerText = puntosJugadores[1]; 
      determinarGanador();
     // imagenCartaPedida = crearCarta(carta, imagenCarta); //puntosJugadores, acá no nos interesan los puntos sino la cantidad de posiciones del array
      //divCartasJugadores[puntosJugadores.length - 1].append(imagenCartaPedida);

    } else if (puntosJugadores[0] === 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      puntosJugadores[1] = turnoComputadora(puntosJugadores[0], deck, puntosJugadores, divCartasJugadores);
      smalls[1].innerText = puntosJugadores[1];
      //imagenCartaPedida = crearCarta(carta, imagenCarta); //puntosJugadores, acá no nos interesan los puntos sino la cantidad de posiciones del array
      divCartasJugadores[puntosJugadores.length - 1].append(imagenCartaPedida);
      determinarGanador();
    }
  });

  btnDetener.addEventListener("click", () => {
    detener();
  });

  btnJuegoNuevo.addEventListener("click", () => {
    console.clear();

    inicializarJuego();

   // deck = [];
   // deck = crearDeck();

    //puntosJugador = 0;
    //puntosComputadora = 0;

    //smalls[0] = 0;
    // smalls[1] = 0;

    // divCartasJugador.innerHTML = "";
    // divCartasComputadora.innerHTML = "";


    //para que reinicie el puntaje a 0
    // mostrarPuntaje("0", 0, 0);
    // mostrarPuntaje("0", 0, 1);
    //1er valor:mandamos 0 en string para que la función valorCarta devuelva un valor numérico
    //2do valor: son los puntos mandamos 0 para que sume 0 + 0
    //3er valor: es la posición del array small el 0 sería para reiniciar los puntos
    // del jugador y el 1 para reiniciar los puntos de la computadora.
  });


  return {
    nuevoJuego: inicializarJuego
}; //para que sea público




})(); //fin Patrón Módulo



//Mostrar Puntos
/*export const mostrarPuntos = (turno, puntos) =>{
    

for(let i = 0; i < smalls.length - 1; i++){

smalls[turno].innerText = puntos;

}
}*/