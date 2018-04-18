// Variable Declaration
const deck = document.getElementById("deck-id");
const moves = document.getElementsByClassName("moves")[0];
const star = document.getElementsByClassName("stars")[0];
const restart = document.getElementsByClassName("restart")[0];

let matchCard_list = []; // global matchList
let matchCard_count = 0;

/*
 * Create a list that holds all of your cards
 */
const cardsList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"]; // unique set
cardsList.push(...cardsList);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffle the list of cards
shuffle(cardsList);

for (let i=0; i<deck.children.length; i++){
    deck.children[i].children[0].classList.add(cardsList[i]);
}

// Set up the event listener for a card
deck.addEventListener("click", function(e) {
    if (e.target.nodeName === "LI" && e.target.className === "card") {
        displayCard(event.target);
    }
});


let boolStarted = false;
var clock;
function displayCard(target) {
    if (!boolStarted) {
        clock = setInterval(add, 1000); // timer
        boolStarted = true;
    }
    // prevent displaying card while there are two cards already
    if (matchCard_list.length < 2) {
        target.classList.add("open", "show");
        addCard(matchCard_list, target);
    }
}

//  Add the card to a *list* of "open" cards


function addCard(list, card) {
    list.push(card);
    if (list.length == 2) {
        isMatch(list[0], list[1]);
    }
}


 // If the list already has another card, check to see if the two cards match

function isMatch(aCard, bCard) {
    let a = aCard.children[0].className;
    let b = bCard.children[0].className;

    setTimeout(function(){
        if (a==b) {
            lockCards();
        } else if (a!=b) {
            removeCards();
        }
        emptyMatchList();
    }, 500);

    increaseMoveCount();
}

/**
 *  empty the matchCard_list
 */
function emptyMatchList() {
    matchCard_list = [];
}

/**
 *  If the cards do match, lock the cards in the open position
 */
function lockCards() {
    for (let card of matchCard_list) {
        card.classList.remove("open", "show");
        card.classList.add("match");
    }
    increaseMatchCount();
}


 // If the cards do not match, remove the cards from the list and hide the card's symbol

function removeCards() {
    for (let card of matchCard_list) {
        card.classList.remove("open", "show");
    }
}


 //Increase the move counter and display it on the page

function increaseMoveCount() {
    return displayStar(++moves.innerHTML);
}


 //The game displays a star rating (from 1-3).

function displayStar(count) {
    const difficulty = [16, 26, 36];
    if (count==difficulty[0]) {
        removeStar(2);
    }
    else if (count==difficulty[1]) {
        removeStar(1);
    }
    else if (count==difficulty[2]) {
         removeStar(0);
     }
}


 // Remove star by give index, for displayStar() function

function removeStar(index) {
    star.children[index].children[0].classList.remove("fa-star");
    star.children[index].children[0].classList.add("fa-star-o");
}

// Increase the match counter

function increaseMatchCount() {
    ++matchCard_count;
    if(matchCard_count==8) {
        // Congratulations Popup
        displayGameResult();
    }
}


 // A restart button allows the player to reset the game board, the timer, and the star rating.

restart.addEventListener("click", function() {
    window.location.reload();
});

// Stopwatch function from http://jsfiddle.net/oukjfavu/
const timer = document.getElementById("timer-id");
let seconds = 0, minutes = 0, hours = 0;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    timer.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00")
        + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")
        + ":" + (seconds > 9 ? seconds : "0" + seconds);
}

// https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
var modal = document.getElementById("modal-id");
// Get the button that plays again the game
var btnPlayAgain = document.getElementById("btn-play-again");

// Get the button that closes the modal
var btnCloseGame = document.getElementById("btn-close-game");


// When the use clicks on the btn-play-again, close the modal
btnPlayAgain.onclick = function() {
    //modal.style.display = "none";
    window.location.reload();
}

// When the use clicks on the btn-close-game, close the modal
btnCloseGame.onclick = function() {
    //modal.style.display = "none";
    window.top.close();
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


/**
 * A modal appears to congratulate the player and ask if they want to play agian.
 * It should also tell the user how much time it took to win the game, and what the star rating was.
 */
const gameResult = document.getElementById("game-result");
function displayGameResult() {
    // stop the timer
    clearTimeout(clock);
    // game result is...
    let tNum = timer.innerHTML;
    let mNum = moves.innerHTML;
    let sNum = document.getElementsByClassName("fa-star").length;
    // gameResult.innerHTML = "Took " + tNum + " with " + mNum + " Moves and " + sNum + " Stars.";
    // Practicing Template literals
    gameResult.innerHTML = `Took ${tNum} with ${mNum} Moves and ${sNum} Stars.`;
    // open modal
    modal.style.display = "block";
}
