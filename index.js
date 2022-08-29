import cards from "./data/cards.js";
import ancientsData from "./data/ancients.js";
import difficulties from "./data/difficulties.js"


let choosen = 0;
let cardSet = [];
let cardsLeft = 0;
const ancientsList = document.querySelectorAll('.ancient-card');
let newCardDeck = [];
let finalCardDeck = [];
let currentCard = '';
const color = ['blue', 'green', 'brown']

ancientsList.forEach(item => item.addEventListener('click', choosenAncient))

function choosenAncient(e) {
    deleteActiveState();
    choosen = e.target.id;
    getCardSet();
    e.target.classList.add('active');
}

function deleteActiveState() {
    ancientsList.forEach(item => item.classList.remove('active'))
}

function getCardSet() {
    let greenCardSet = ([ancientsData[choosen].firstStage.greenCards + ancientsData[choosen].secondStage.greenCards + ancientsData[choosen].thirdStage.greenCards]);
    let brownCardSet = ([ancientsData[choosen].firstStage.brownCards + ancientsData[choosen].secondStage.brownCards + ancientsData[choosen].thirdStage.brownCards]);
    let blueCardSet = ([ancientsData[choosen].firstStage.blueCards + ancientsData[choosen].secondStage.blueCards + ancientsData[choosen].thirdStage.blueCards]);
    cardSet = [blueCardSet, greenCardSet, brownCardSet];
    cardsLeft = +cardSet[0] + (+cardSet[1]) + (+cardSet[2]);
}



function randomizeCards() {
    let randomized = [];
    ;

    for (let i = 0; i < cards.length; i++) {
        let set = new Set;
        while (set.size < cardSet[i]) {
            set.add(`${color[i]}${1 + Math.floor(Math.random() * cards[i].length)}`);
        }
        set = Array.from(set);
        randomized.push(set);

    }
    return randomized;

}

function getStages() {
    return [[ancientsData[choosen].firstStage.blueCards, ancientsData[choosen].firstStage.greenCards, ancientsData[choosen].firstStage.brownCards], [ancientsData[choosen].secondStage.blueCards, ancientsData[choosen].secondStage.greenCards, ancientsData[choosen].secondStage.brownCards], [ancientsData[choosen].thirdStage.blueCards, ancientsData[choosen].thirdStage.greenCards, ancientsData[choosen].thirdStage.brownCards]];

}

function getCardDeck() {
    let randomCards = randomizeCards();
    let stages = getStages();
    newCardDeck = [];
    if (cardSet.length === 0) {
        alert('Выберите древнего');
    } else {

        for (let i = 0; i < stages.length; i++) {
            let setCards = [];
            let card;
            for (let j = 0; j < stages[i].length; j++) {
                setCards = [];
                for (let y = 0; y < stages[i][j]; y++) {
                    card = Math.floor(Math.random() * (1 + randomCards[j].length - 1));
                    setCards.push(randomCards[j].splice([card], 1));
                }
                newCardDeck.push(setCards);


            }

        }
        newCardDeck = [newCardDeck[0].concat(newCardDeck[1], newCardDeck[2]).flat(), newCardDeck[3].concat(newCardDeck[4], newCardDeck[5]).flat(), newCardDeck[6].concat(newCardDeck[7], newCardDeck[8]).flat()];
        return newCardDeck;
    }
}

function getFinalCardDeck() {
    let stagesCardDeck = getCardDeck();
    let stages = getStages();
    finalCardDeck = [];
    for (let i = 0; i < stagesCardDeck.length; i++) {
        let setCards = new Set;
        let card;
        while (setCards.size != stagesCardDeck[i].length) {

            card = Math.floor(Math.random() * (1 + stagesCardDeck[i].length - 1));
            setCards.add(stagesCardDeck[i][card]);
        }
        setCards = Array.from(setCards)
        finalCardDeck.push(setCards);

    }
    setTracker();
    cardsOnscreenReset();
    finalCardDeck = finalCardDeck.flat();
}

function getCardsOnScreen() {
    const cardOnScreen = document.querySelector('.current-card__container');
    cardOnScreen.style.backgroundImage = `url('./assets/MythicCards/${currentCard.toString().replace(/\d/g, '')}/${currentCard}.png')`;

}
function cardsOnscreenReset() {
    const cardOnScreen = document.querySelector('.current-card__container');
    cardOnScreen.style.backgroundImage = 'none';
}

const dealCards = document.querySelector('.deal-cards');

dealCards.addEventListener('click', getFinalCardDeck);

const takeCard = document.querySelector('.pass-card__container');




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

        if (cardsLeft == 0)
        alert('Карты кончились! Тасанем еще?');
    if (cardsLeft <= cardsLeft - secondStage - thirdStage)
        firstGreen.textContent -= 1;
        
    if (cardsLeft - secondStage - thirdStage <= firstStage && cardsLeft - secondStage - thirdStage > 0) {
        switch (currentCard.toString().replace(/\d/g, '')) {
            case ('blue'):
                firstBlue.textContent--;
                break;
            case ('green'):
                firstGreen.textContent--;
                break;
            case ('brown'):
                firstBrown.textContent--;
                break;
        }
    } else
        if (cardsLeft <= secondStage + thirdStage && cardsLeft > thirdStage)
            switch (currentCard.toString().replace(/\d/g, '')) {
                case ('blue'):
                    secondBlue.textContent--;
                    break;
                case ('green'):
                    secondGreen.textContent--;
                    break;
                case ('brown'):
                    secondBrown.textContent--;
                    break;
            }
        else {
            switch (currentCard.toString().replace(/\d/g, '')) {
                case ('blue'):
                    thirdBlue.textContent--;
                    break;
                case ('green'):
                    thirdGreen.textContent--;
                    break;
                case ('brown'):
                    thirdBrown.textContent--;
                    break;
            }
        }
    cardsLeft--;
 

}

function openCard() {
    currentCard = finalCardDeck.splice(0, 1);
    getCardsOnScreen();
    decentTracker();
}

takeCard.addEventListener('click', openCard)

