import cards from "./data/cards.js";
import ancientsData from "./data/ancients.js";
console.log('Привет. Реализованы только три уровня сложности, остальные все пункты ТЗ выполненны. Спасибо за проверку!')

let choosen = 0;
let complexity = 2;
let cardSet = [];
let cardsLeft = 0;
const ancientsList = document.querySelectorAll('.ancient-card');
let newCardDeck = [];
let finalCardDeck = [];
let currentCard = '';
const lightCard = [[cards[0][2], cards[0][3], cards[0][4], cards[0][6], cards[0][8], cards[0][9], cards[0][10], cards[0][11]],
[cards[1][0], cards[1][6], cards[1][7], cards[1][8], cards[1][9], cards[1][10], cards[1][11], cards[1][12], cards[1][13], cards[1][14], cards[1][15], cards[1][16], cards[1][17]],
[cards[2][0], cards[2][1], cards[2][2], cards[2][3], cards[2][4], cards[2][10], cards[2][11], cards[2][12], cards[2][13], cards[2][14], cards[2][15], cards[2][16], cards[2][17], cards[2][18], cards[2][19], cards[2][20]]];
const mediumCard = cards;
const hardCard = [[cards[0][0], cards[0][1], cards[0][5], cards[0][6], cards[0][7], cards[0][8], cards[0][10], cards[0][11]],
[cards[1][1], cards[1][2], cards[1][3], cards[1][4], cards[1][5], cards[1][6], cards[1][7], cards[1][8], cards[1][9], cards[1][10], cards[1][12], cards[1][13], cards[1][14]],
[cards[2][0], cards[2][1], cards[2][2], cards[2][3], cards[2][4], cards[2][5], cards[2][6], cards[2][7], cards[2][8], cards[2][9], cards[2][14], cards[2][15], cards[2][16], cards[2][17], cards[2][18], cards[2][19]]];
const levelCardSet = [[], lightCard, mediumCard, hardCard, []];

ancientsList.forEach(item => item.addEventListener('click', choosenAncient))

function choosenAncient(e) {
    deleteActiveState(ancientsList);
    choosen = e.target.id;
    e.target.classList.add('active');
}

function deleteActiveState(tag) {
    tag.forEach(item => item.classList.remove('active'));

}

function getCardSet() {
    let greenCardSet = ([ancientsData[choosen].firstStage.greenCards + ancientsData[choosen].secondStage.greenCards + ancientsData[choosen].thirdStage.greenCards]);
    let brownCardSet = ([ancientsData[choosen].firstStage.brownCards + ancientsData[choosen].secondStage.brownCards + ancientsData[choosen].thirdStage.brownCards]);
    let blueCardSet = ([ancientsData[choosen].firstStage.blueCards + ancientsData[choosen].secondStage.blueCards + ancientsData[choosen].thirdStage.blueCards]);
    cardSet = [blueCardSet, greenCardSet, brownCardSet];
    cardsLeft = +cardSet[0] + (+cardSet[1]) + (+cardSet[2]);
}

//---------------------------------Выбор сложности--------------------------------
const levelBtns = document.querySelectorAll('.complexity');
levelBtns.forEach(item => item.addEventListener('click', getLevel))

function getLevel(e) {
    deleteActiveState(levelBtns);
    complexity = e.target.id;
    e.target.classList.add('active');
}

function randomizeCards() {
    let randomized = [];
    
    for (let i = 0; i < levelCardSet[complexity].length; i++) {
        let set = new Set;
        while (set.size < cardSet[i]) {
            let cardNumber = Math.floor(Math.random() * levelCardSet[complexity][i].length);
            let card = levelCardSet[complexity][i][cardNumber];
               set.add(card.toString());
        }
        let arr = Array.from(set);
    
        randomized.push(arr);

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
    getCardSet();
    let stagesCardDeck = getCardDeck();
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

takeCard.addEventListener('click', openCard);
