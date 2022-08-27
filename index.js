import cards from "./data/cards.js";
const ancientsData = [
    {
        id: 'azathoth',
        name: 'azathoth',
        //   cardFace: Ancients.azathoth,
        firstStage: {
            greenCards: 1,
            blueCards: 1,
            brownCards: 2,
        },
        secondStage: {
            greenCards: 2,
            blueCards: 1,
            brownCards: 3,
        },
        thirdStage: {
            greenCards: 2,
            blueCards: 0,
            brownCards: 4,
        },
    },
    {
        id: 'cthulhu',
        name: 'cthulhu',
        //   cardFace: Ancients.cthulhu,
        firstStage: {
            greenCards: 0,
            blueCards: 2,
            brownCards: 2,
        },
        secondStage: {
            greenCards: 1,
            blueCards: 0,
            brownCards: 3,
        },
        thirdStage: {
            greenCards: 3,
            blueCards: 0,
            brownCards: 4,
        },
    },
    {
        id: 'iogSothoth',
        name: 'iogSothoth',
        //   cardFace: Ancients.iogSothoth,
        firstStage: {
            greenCards: 0,
            blueCards: 1,
            brownCards: 2,
        },
        secondStage: {
            greenCards: 2,
            blueCards: 1,
            brownCards: 3,
        },
        thirdStage: {
            greenCards: 3,
            blueCards: 0,
            brownCards: 4,
        },
    },
    {
        id: 'shubNiggurath',
        name: 'shubNiggurath',
        //   cardFace: Ancients.shubNiggurath,
        firstStage: {
            greenCards: 1,
            blueCards: 1,
            brownCards: 2,
        },
        secondStage: {
            greenCards: 3,
            blueCards: 1,
            brownCards: 2,
        },
        thirdStage: {
            greenCards: 2,
            blueCards: 0,
            brownCards: 4,
        },
    },
]


const difficulties = [
    {
        id: 'easy',
        name: 'Низкая'
    },
    {
        id: 'normal',
        name: 'Средняя'
    },
    {
        id: 'hard',
        name: 'Высокая'
    },
]

let choosen = 0;
let cardSet = [];
let cardsLeft = 0;
const ancientsList = document.querySelectorAll('.ancient-card');
let newCardDeck = [];
let currentCard = '';

ancientsList.forEach(item => item.addEventListener('click', choosenAncient))

function choosenAncient(e) {
    choosen = e.target.id;
    console.log(choosen);
    getCardSet();
}


function getCardSet() {
    let greenCardSet = ([ancientsData[choosen].firstStage.greenCards + ancientsData[choosen].secondStage.greenCards + ancientsData[choosen].thirdStage.greenCards]);
    let brownCardSet = ([ancientsData[choosen].firstStage.brownCards + ancientsData[choosen].secondStage.brownCards + ancientsData[choosen].thirdStage.brownCards]);
    let blueCardSet = ([ancientsData[choosen].firstStage.blueCards + ancientsData[choosen].secondStage.blueCards + ancientsData[choosen].thirdStage.blueCards]);
    cardSet = [greenCardSet, blueCardSet, brownCardSet];
    cardsLeft = +cardSet[0] + (+cardSet[1]) + (+cardSet[2]);
}



function randomizeCards() {
    let randomized = [];
    const color = ['blue', 'green', 'brown'];
   
    for (let i = 0; i < cards.length; i++) {
        let set = new Set;
        while (set.size < cardSet[i]) {
            set.add(`${color[i]}${1+Math.floor(Math.random() * cards[i].length)}`)
        }
        set = Array.from(set);
        randomized.push(set);
    }
    return randomized;

}

function getStages() {
    return [ancientsData[choosen].firstStage.greenCards + ancientsData[choosen].firstStage.brownCards + ancientsData[choosen].firstStage.blueCards, ancientsData[choosen].secondStage.greenCards + ancientsData[choosen].secondStage.brownCards + ancientsData[choosen].secondStage.blueCards, ancientsData[choosen].thirdStage.greenCards + ancientsData[choosen].thirdStage.brownCards + ancientsData[choosen].thirdStage.blueCards];

}

function getCardDeck() {
    let randomCards = randomizeCards();
    randomCards = randomCards.flat();
    let stages = getStages();
    newCardDeck = [];
    if (cardSet.length === 0) {
        alert('Выберите древнего');
    } else {

        for (let i = 0; i < stages.length; i++) {
            let set = new Set;
            while (set.size < stages[i]) {
                set.add(randomCards[1+Math.floor(Math.random() * (randomCards.length - 1))])
            }
            set = Array.from(set);
            newCardDeck.push(set);
        }
        console.log(newCardDeck);
        setTracker();
        newCardDeck = newCardDeck.flat();
        cardsOnscreenReset();
        return newCardDeck;
    }
}

function getCardsOnScreen() {
    const cardOnScreen = document.querySelector('.current-card__container');
    cardOnScreen.style.backgroundImage = `url('./assets/mythicCards/${currentCard.toString().replace(/\d/g,'')}/${currentCard}.png')`;

}
function cardsOnscreenReset() {
    const cardOnScreen = document.querySelector('.current-card__container');
    cardOnScreen.style.backgroundImage = 'none';
}

const dealCards = document.querySelector('.deal-cards');

dealCards.addEventListener('click', getCardDeck);

const takeCard = document.querySelector('.pass-card__container');


console.log(cardsLeft);

function setTracker() {

    const firstGreen = document.querySelector('.first.stage.card.green_card');
    const firstBrown = document.querySelector('.first.stage.card.brown_card');
    const firstBlue = document.querySelector('.first.stage.card.blue_card');
    const secondGreen = document.querySelector('.second.stage.card.green_card');
    const secondBrown = document.querySelector('.second.stage.card.brown_card');
    const secondBlue = document.querySelector('.second.stage.card.blue_card');
    const thirdGreen = document.querySelector('.third.stage.card.green_card');
    const thirdBrown = document.querySelector('.third.stage.card.brown_card');
    const thirdBlue = document.querySelector('.third.stage.card.blue_card');

    const firstStage = ancientsData[choosen].firstStage.greenCards + ancientsData[choosen].firstStage.brownCards
        + ancientsData[choosen].firstStage.blueCards;
    const secondStage = ancientsData[choosen].secondStage.greenCards + ancientsData[choosen].secondStage.brownCards
        + ancientsData[choosen].secondStage.blueCards;
    const thirdStage = ancientsData[choosen].thirdStage.greenCards + ancientsData[choosen].thirdStage.brownCards
        + ancientsData[choosen].thirdStage.blueCards;


    firstGreen.textContent = ancientsData[choosen].firstStage.greenCards;
    firstBrown.textContent = ancientsData[choosen].firstStage.brownCards;
    firstBlue.textContent = ancientsData[choosen].firstStage.blueCards;
    secondGreen.textContent = ancientsData[choosen].secondStage.greenCards;
    secondBrown.textContent = ancientsData[choosen].secondStage.brownCards;
    secondBlue.textContent = ancientsData[choosen].secondStage.blueCards;
    thirdGreen.textContent = ancientsData[choosen].thirdStage.greenCards;
    thirdBrown.textContent = ancientsData[choosen].thirdStage.brownCards;
    thirdBlue.textContent = ancientsData[choosen].thirdStage.blueCards;

}

function decentTracker() {
    const firstGreen = document.querySelector('.first.stage.card.green_card');
    const firstBrown = document.querySelector('.first.stage.card.brown_card');
    const firstBlue = document.querySelector('.first.stage.card.blue_card');
    const secondGreen = document.querySelector('.second.stage.card.green_card');
    const secondBrown = document.querySelector('.second.stage.card.brown_card');
    const secondBlue = document.querySelector('.second.stage.card.blue_card');
    const thirdGreen = document.querySelector('.third.stage.card.green_card');
    const thirdBrown = document.querySelector('.third.stage.card.brown_card');
    const thirdBlue = document.querySelector('.third.stage.card.blue_card');

    const firstStage = ancientsData[choosen].firstStage.greenCards + ancientsData[choosen].firstStage.brownCards
        + ancientsData[choosen].firstStage.blueCards;
    const secondStage = ancientsData[choosen].secondStage.greenCards + ancientsData[choosen].secondStage.brownCards
        + ancientsData[choosen].secondStage.blueCards;
    const thirdStage = ancientsData[choosen].thirdStage.greenCards + ancientsData[choosen].thirdStage.brownCards
        + ancientsData[choosen].thirdStage.blueCards;

    
            cardsLeft--
    if (cardsLeft == 0)
        alert('Карты кончились! Тасанем еще?');
    console.log(cardsLeft);

    if (cardsLeft <= cardsLeft - secondStage - thirdStage)
        firstGreen.textContent -= 1;

}

function openCard() {
    currentCard = newCardDeck.splice(0, 1);
    getCardsOnScreen();
    decentTracker();
}

takeCard.addEventListener('click', openCard)

