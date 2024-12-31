/* 2C 2 de Clubs(tréboles)*/
/* 2H 2 de Hearts(corazones)*/
/* 2D 2 de Diamonds(diamante)*/
/* 2S 2 de Spades(espadas)*/

let deck = [];
const tipos = ['C', 'H', 'D', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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

console.log(deck);

deck = _.shuffle(deck);
console.log(deck);



}

crearDeck();