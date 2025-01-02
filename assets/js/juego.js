/* 2C 2 de Clubs(tréboles)*/
/* 2H 2 de Hearts(corazones)*/
/* 2D 2 de Diamonds(diamante)*/
/* 2S 2 de Spades(espadas)*/

let deck = [];
const tipos = ['C', 'H', 'D', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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
//console.log(carta);

//console.log(deck);

return carta;
}

//pedirCarta();

//Tomar el valor de la carta

const valorCarta = (carta) =>{

    const valor = carta.substring(0, carta.length - 1); //El substring divide el string, en este
    //caso le indicamos que es desde la posición 0 a la anteúltima, es decir le borramos el palo 
    //ej 2C quedaría 2, 10H quedaría 10.

    return isNaN(valor)?((valor === 'A')?11:10):valor*1;


}

const valor = valorCarta(pedirCarta());