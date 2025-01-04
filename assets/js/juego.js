/* 2C 2 de Clubs(tréboles)*/
/* 2H 2 de Hearts(corazones)*/
/* 2D 2 de Diamonds(diamante)*/
/* 2S 2 de Spades(espadas)*/

let deck = [];
const tipos = ['C', 'H', 'D', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias HTML

const btnPedir = document.querySelector('#btnPedirCarta');

const smalls = document.querySelectorAll('small'); //smalls es const porque es la referencia (ubicación) 
// a los elementos small y esta nunca va a cambiar, lo que cambia es el valor que se muestra en esa ubicación. 

const divCartasJugador = document.querySelector('#jugador-cartas');

//Crea una nueva baraja 

const crearDeck = () => {

for(let i = 2; i <=10; i++){

    for(let tipo of tipos){

        deck.push(i + tipo);

    }

}

for(let especial of especiales){
for(let tipo of tipos){

    deck.push(especial + tipo);
}

}


deck = _.shuffle(deck); //función de la librería undescore. Cambia de posición los elementos del array de manera aleatoria.
console.log(deck);


}

crearDeck();

//Pedir una carta del mazo(lógica del mazo)

const pedirCarta = ()=>{


if(deck.length === 0){
throw 'No hay cartas en el deck';

}

let carta = deck.pop();

return carta;
}


//Tomar el valor de la carta

const valorCarta = (carta) =>{

    const valor = carta.substring(0, carta.length - 1); //El substring divide el string, en este
    //caso le indicamos que es desde la posición 0 a la anteúltima, es decir le borramos el palo 
    //ej 2C quedaría 2, 10H quedaría 10.

    return isNaN(valor)?((valor === 'A')?11:10):valor*1; //si no es una carta numerica y es un A vale 11 puntos, 
    // si es una J, Q , K vale 10 puntos. Si es una carta númerica vale lo mismo que la carta.
    //El valor*1 pasamos el string a number 


}

//Eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    console.log(carta);

    //Mostrar puntaje

    puntosJugador = puntosJugador + valorCarta(carta);

   smalls[0].innerText = puntosJugador; //smalls es una Referencia HTML, document.QuerySelectorAll('small');

   //Mostrar imagen carta

   const imagenCarta = document.createElement('img'); //creamos un elemento img

   imagenCarta.src = `assets/cartas/${carta}.png`; //Le indicamos la ruta de la imagen, y la carta a mostrar que cambia dependiendo que carta salga

   imagenCarta.classList.add('carta'); // Le agregamos la clase carta que creamos en css

   divCartasJugador.append(imagenCarta); //Le indicamos donde mostrarlas, divCartasJugador es una Referencia HTML


   //Lógica del juego

   if(puntosJugador > 21){

       btnPedir.disabled = true;
       console.warn('Perdiste');

   }else if(puntosJugador === 21)
   {
       btnPedir.disabled = true;
       console.warn('Ganaste');

   }
})