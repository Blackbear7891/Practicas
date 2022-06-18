
//array de objetos para crear las cartas
const cardArray = [
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },

    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
]
//Mesclamos los elementos dentro del array
cardArray.sort(() => .5 - Math.random())


//arreglo vacio para almacenar las cards que se voltean
let Chosen = [];
let ChosenIds = [];
const cardsWon = [];
//referencia al contenedor del tablero en el documento html
const grid = document.querySelector('#grid');
const result = document.querySelector('#result');

//funcion que crea una card por cada elemento en el array agregandole 2 atributos una imagen y un id ademas de un escuchador de evento y lo agrega a el contenedor o tablero
function createBoard() {
    const length = cardArray.length;
    for (let i = 0; i < length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', './images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
}
createBoard();
//si esta constante se mueve mas arriba no funcionara ya que los elementos img son creadon con la funcio createboard antes de ella no existen

const cards = document.querySelectorAll('img');
function removeCardMatched(optionOneId, optiontwoId) {
    cards[optionOneId].setAttribute('src', 'images/white.png');
    cards[optiontwoId].setAttribute('src', 'images/white.png');
    cards[optionOneId].removeEventListener('click', flipCard);
    cards[optiontwoId].removeEventListener('click', flipCard);
}

function cardsNotMatchReset(optionOneId, optiontwoId) {
    cards[optionOneId].setAttribute('src', 'images/blank.png');
    cards[optiontwoId].setAttribute('src', 'images/blank.png');
    document.querySelector(`[data-id='${optionOneId}']`).style.pointerEvents = 'auto';
    document.querySelector(`[data-id='${optiontwoId}']`).style.pointerEvents = 'auto';
}

function checkMatch() {
    const optOneId = ChosenIds[0];
    const optTwoId = ChosenIds[1];
    if (Chosen[0] == Chosen[1]) {
        removeCardMatched(optOneId, optTwoId);
        cardsWon.push(Chosen);
        result.textContent = cardsWon.length;
    } else {
        cardsNotMatchReset(optOneId, optTwoId);
    }
    Chosen = [];
    ChosenIds = [];
    if (cardsWon.length == cardArray.length / 2) {
        result.textContent = 'You found all!';
    }
}

//funcion que da el efecto de voltear la card
function flipCard() {
    let cardId = this.getAttribute('data-id');
    document.querySelector(`[data-id='${cardId}']`).style.pointerEvents = 'none';
    Chosen.push(cardArray[cardId].name);
    ChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (Chosen.length == 2) {
        setTimeout(checkMatch, 500);
    }
}