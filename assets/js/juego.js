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

    let puntosJugadores = [];

  //Referencias HTML

    const btnPedir = document.querySelector("#btnPedirCarta"),
    btnDetener = document.querySelector("#btnDetener"),
    btnJuegoNuevo = document.querySelector("#btnNuevoJuego");

    const divCartasJugadores = document.querySelectorAll(".divCartas"),
          smalls = document.querySelectorAll("small"); //smalls es const porque es la referencia (ubicación)
          // a los elementos small y esta nunca va a cambiar, lo que cambia es el valor que se muestra en esa ubicación.


 /* const divCartasJugador = document.querySelector("#jugador-cartas"),
    divCartasComputadora = document.querySelector("#computadora-cartas");*/

  
  //Inicializar Juego

  const inicializarJuego = (numJugadores = 2) =>{

    deck = crearDeck();

    puntosJugadores = [];


    for(let i = 0; i < numJugadores; i++){

        puntosJugadores.push(0); //inicializa en 0 las posiciones del array

    }
    
    smalls.forEach(elem => elem.innerText = 0); //Pone en 0 los puntajes cuando se inicializa una partida
    divCartasJugadores.forEach(elem => elem.innerText = ""); //borra las cartas en una nueva partida


     btnPedir.disabled = false;
     btnDetener.disabled = false;
  }
  
  
  
  //Crea una nueva baraja

  const crearDeck = () => {
    deck = [];

    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }

    for (let especial of especiales) {
      for (let tipo of tipos) {
        deck.push(especial + tipo);
      }
    }

    return _.shuffle(deck); //función de la librería undescore. Cambia de posición los elementos del array de manera aleatoria.
  };


  //Pedir una carta del mazo(lógica del mazo)

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }

    return deck.pop();

  };

  //btn Detener

  const detener = () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  };

  //Tomar el valor de la carta

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); //El substring divide el string, en este
    //caso le indicamos que es desde la posición 0 a la anteúltima, es decir le borramos el palo
    //ej 2C quedaría 2, 10H quedaría 10.

    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1; //si no es una carta numerica y es un A vale 11 puntos,
    // si es una J, Q , K vale 10 puntos. Si es una carta númerica vale lo mismo que la carta.
    //El valor*1 pasamos el string a number
  };

  //Mostrar Puntaje

 /* const mostrarPuntaje = (carta, puntos, posSmall) => {
    puntos = puntos + valorCarta(carta);

    smalls[posSmall].innerText = puntos; //smalls es una Referencia HTML, document.QuerySelectorAll('small');

    return puntos;
  };*/

  //Turno 0 Jugador, último turno Computadora

  const acumularPuntos = (carta, turno) => {

    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    smalls[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

  //Mostrar imagen carta

  // const mostrarCarta = (carta, divCartas) => {
  //   const imagenCarta = document.createElement("img"); //creamos un elemento img

  //   imagenCarta.src = `assets/cartas/${carta}.png`; //Le indicamos la ruta de la imagen, y la carta a mostrar que cambia dependiendo que carta salga

  //   imagenCarta.classList.add("carta"); // Le agregamos la clase carta que creamos en css

  //   divCartas.append(imagenCarta); //Le indicamos donde mostrarlas, divCartasJugador es una Referencia HTML
  // };


  //Mostrar la imagen
const crearCarta = (carta, turno) =>{

  const imagenCarta = document.createElement("img"); //creamos un elemento img

     imagenCarta.src = `assets/cartas/${carta}.png`; //Le indicamos la ruta de la imagen, y la carta a mostrar que cambia dependiendo que carta salga

     imagenCarta.classList.add("carta"); // Le agregamos la clase carta que creamos en css

     divCartasJugadores[turno].append(imagenCarta);


}

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
  }, 1000); //para que el alert tarde unos milisegundos más en aparecer y primero se vea la jugada y después el alert

}


  //Turno de la computadora

  const turnoComputadora = (puntosMinimos) => {
    
    let puntosComputadora = 0;
    
    do {


      const carta = pedirCarta();

      //puntosComputadora = mostrarPuntaje(carta, puntosComputadora, 1);

     // mostrarCarta(carta, divCartasComputadora);

      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1); //el .length porque sabemos que la computadora siempre tiene el último turno.

     crearCarta(carta, puntosJugadores.length - 1); //puntosJugadores, acá no nos interesan los puntos sino la cantidad de posiciones del array
  
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

   determinarGanador();
  };

  //Eventos

  btnPedir.addEventListener("click", () => {

    let puntosJugador = 0;
    const carta = pedirCarta();

    //Mostrar puntaje

    //puntosJugador = mostrarPuntaje(carta, puntosJugador, 0);

    //mostrarCarta(carta, divCartasJugador);

    puntosJugador = acumularPuntos(carta, 0); //porque Jugador esta en la posición 0 del array (Mostrar Puntos)

    crearCarta(carta, 0); //(mostrar carta)

    //Lógica del juego

    if (puntosJugador > 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugadores[0]);
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugadores[0]);
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
