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
const btnDetener = document.querySelector('#btnDetener');
const btnJuegoNuevo = document.querySelector('#btnNuevoJuego');

const smalls = document.querySelectorAll('small'); //smalls es const porque es la referencia (ubicación) 
// a los elementos small y esta nunca va a cambiar, lo que cambia es el valor que se muestra en esa ubicación. 

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

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

return deck;

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


//btn Detener

const detener = () =>{


btnPedir.disabled = true;
btnDetener.disabled = true;
turnoComputadora(puntosJugador);

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

//Mostrar Puntaje

const mostrarPuntaje = (carta, puntos,posSmall) =>{



    puntos = puntos + valorCarta(carta);
    
    smalls[posSmall].innerText = puntos; //smalls es una Referencia HTML, document.QuerySelectorAll('small');

    return puntos;

} 

//Mostrar imagen carta

const mostrarCarta = (carta, divCartas) =>{

         
        const imagenCarta = document.createElement('img'); //creamos un elemento img
        
        imagenCarta.src = `assets/cartas/${carta}.png`; //Le indicamos la ruta de la imagen, y la carta a mostrar que cambia dependiendo que carta salga
    
        imagenCarta.classList.add('carta'); // Le agregamos la clase carta que creamos en css
        
        divCartas.append(imagenCarta); //Le indicamos donde mostrarlas, divCartasJugador es una Referencia HTML
       

}



//Turno de la computadora

const turnoComputadora = (puntosMinimos) => {

do{

    const carta = pedirCarta();

    puntosComputadora = mostrarPuntaje(carta, puntosComputadora, 1);

    mostrarCarta(carta, divCartasComputadora);

    if(puntosMinimos > 21){
        break;
    }


}while((puntosComputadora < puntosMinimos) && (puntosMinimos <=21));

setTimeout(() =>{

if(puntosComputadora === puntosMinimos){

    alert('Nadie gana');
}else if(puntosMinimos > 21){


    alert('Computadora gana');
}else if(puntosComputadora >21){

    alert('Jugador gana');
}else{

    alert('Computadora gana');
}

}, 500 ); //para que el alert tarde unos milisegundos más en aparecer y primero se vea la jugada y después el alert
}

//Eventos

btnPedir.addEventListener('click', () => {



    const carta = pedirCarta();


    //Mostrar puntaje

    puntosJugador = mostrarPuntaje(carta, puntosJugador,0);


  mostrarCarta(carta, divCartasJugador);



   //Lógica del juego

   if(puntosJugador > 21){

       btnPedir.disabled = true;
       btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
       

   }else if(puntosJugador === 21)
   {
       btnPedir.disabled = true;
       btnDetener.disabled = true;
       turnoComputadora(puntosJugador);



   }


})

btnDetener.addEventListener('click',() =>{

detener(puntosJugador);

})

btnJuegoNuevo.addEventListener('click',() =>{

    console.clear();
    deck = [];
    deck = crearDeck();


    puntosJugador = 0;
    puntosComputadora = 0;

    //smalls[0] = 0;
   // smalls[1] = 0;
    
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    
    btnPedir.disabled = false;
    btnDetener.disabled = false;
   
    //para que reinicie el puntaje a 0
        mostrarPuntaje('0',0,0); 
        mostrarPuntaje('0',0,1);
    //1er valor:mandamos 0 en string para que la función valorCarta devuelva un valor numérico
    //2do valor: son los puntos mandamos 0 para que sume 0 + 0
    //3er valor: es la posición del array small el 0 sería para reiniciar los puntos 
    // del jugador y el 1 para reiniciar los puntos de la computadora.
    

})