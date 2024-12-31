import { revealCardAnimation } from "./animations";

const mainDom = document.getElementById('main');
var suspectCards = ['Avatar1', 'Avatar2', 'Avatar3', 'Avatar4', 'Avatar5', 'Avatar6'];
var actionCards = ['Arme1', 'Arme2', 'Arme3', 'Arme4', 'Arme5', 'Arme6'];
var roomCards = ['Kitchen', 'Dining Room', 'Bedroom', 'Bathroom', 'Living Room', 'Study', 'Library', 'Lounge', 'Hall'];
var cards:string[] = suspectCards.concat(actionCards, roomCards);
const numberofPlayers:number = 6;

function chooseMysteryCards(cards:string[]): string[] {
    let mysterySuspect = suspectCards[Math.floor(suspectCards.length * Math.random())];
    let suspecttoremove = cards.indexOf(mysterySuspect);
    cards.splice(suspecttoremove, 1);

    let mysteryAction = actionCards[Math.floor(actionCards.length * Math.random())];
    let actiontoremove = cards.indexOf(mysteryAction);
    cards.splice(actiontoremove, 1);

    let mysteryRoom = roomCards[Math.floor(roomCards.length * Math.random())];
    let roomtoremove = cards.indexOf(mysteryRoom);
    cards.splice(roomtoremove, 1);

    return [mysterySuspect, mysteryAction, mysteryRoom];
}

var mysteryCards:string[] = chooseMysteryCards(cards);
var cardsToHandOut:string[] = [];
cards.forEach(element => {
    if(!mysteryCards.includes(element)){
        cardsToHandOut.push(element);
    }
});

function cardsHandOut(cards:string[], numberofPlayers: number): string[][] {

    const numberofCards = cards.length;
    var handedOutCards:string[][] = [];
    for (let index = 0; index < numberofPlayers; index++) {
        handedOutCards.push([]);
    }

    var playerIndex = 0;
    for (let i = 0; i < numberofCards; i++) {
        let randomCard = cards[Math.floor(cards.length * Math.random())];
        let indextoremove = cards.indexOf(randomCard);
        cards.splice(indextoremove, 1);
        if(playerIndex == numberofPlayers){
            playerIndex = 0;
        }
        handedOutCards[playerIndex].push(randomCard);
        playerIndex++;  
    }

    return handedOutCards;
}
var sortedCards: string[][] = cardsHandOut(cardsToHandOut, numberofPlayers);
var playerCards: string[] = sortedCards[0];
var cpuCards: string[][] = sortedCards.splice(1, sortedCards.length);
var selectedSuspect:string = suspectCards[0];
var selectedRoom:string = roomCards[0];
var selectedAction:string = actionCards[0];

//console.log("mysteryCards:", mysteryCards);

console.log(cpuCards);


// init game
function gameInit() {

    for (let i = 0; i < playerCards.length; i++) {
        let player_cardContainer = <HTMLElement>mainDom?.querySelector('.playerCards');
        player_cardContainer.innerHTML += `<span>${playerCards[i]}</span>`;
    }

    initPlayerTurn();
}

// start player turn
function initPlayerTurn() {

    var playerTheory:HTMLFormElement = <HTMLFormElement>document.getElementById('playerTheory');
    var suspect:HTMLSelectElement = <HTMLSelectElement>document.getElementById('suspect');
    var room:HTMLSelectElement = <HTMLSelectElement>document.getElementById('room');
    var action:HTMLSelectElement = <HTMLSelectElement>document.getElementById('action');
    playerTheory.addEventListener('submit', (e) => checkTheory([selectedSuspect, selectedAction, selectedRoom], cpuCards, true, e));

    suspect.addEventListener('change', function(){
        selectedSuspect = suspect.value;
    })
    room.addEventListener('change', function(){
        selectedRoom = room.value;
    })
    action.addEventListener('change', function(){
        selectedAction = action.value;
    })
}

/*function cpuTurn(cpuIndex:number) {

    var cardsArray:string[][] = [];
    let v = cpuIndex+1;
    while (cardsArray.length < cpuCards.length) {
        if(v === cpuCards.length){
            v = 0;
            cardsArray.push(playerCards);
        }
        cardsArray.push(cpuCards[v]);
        v++;
    }

    console.log('cardsArray: ', cardsArray);
    console.log(`CPU ${cpuIndex+1}:`, cpuCards[cpuIndex]);

    let selectedcpuSuspect:string = suspectCards[Math.floor(suspectCards.length * Math.random())];
    let selectedcpuRoom:string = roomCards[Math.floor(roomCards.length * Math.random())];
    let selectedcpuAction:string = actionCards[Math.floor(actionCards.length * Math.random())];

    var cpuChoice:string[] = [selectedcpuSuspect, selectedcpuAction, selectedcpuRoom];

    console.log(`CPU ${cpuIndex+1} choice:`+cpuChoice);

    checkTheory(null, [selectedcpuSuspect, selectedcpuAction, selectedcpuRoom], cardsArray, false);
}*/

// check current player theory, stops at the first found match
function checkTheory(submittedTheory:string[] = [selectedSuspect, selectedAction, selectedRoom], haystack:string[][], isPlayer:boolean, e?:Event){

    if(e){
      e.preventDefault();
    }

    var foundMatch:boolean = false;
    loop1:
    for (let i = 0; i < haystack.length; i++) {
        let cpuHand = haystack[i];
        for (let j = 0; j < cpuHand.length; j++) {
            if(submittedTheory.includes(haystack[i][j])){
                foundMatch = true;
                
                if(isPlayer){
                    let labelToReveal:HTMLSpanElement = <HTMLSpanElement>document.getElementById('cpuHand'+(i+1)+'_card'+(j+1)+'_clear');
                    labelToReveal.innerHTML = haystack[i][j];

                    revealCardAnimation('cpuHand'+(i+1)+'_card'+(j+1));
                }else{
                    if (cpuHand === playerCards) {
                        //alert('You have at least one card: '+ haystack[i][j]);
                    } else {
                        alert('Player '+(i+1)+' has at least one card.');
                    }
                }
                break loop1;
            }
        } 
    }

    if(foundMatch == false){
      alert('No matches found with these cards');
    }

    return foundMatch;
}

gameInit();