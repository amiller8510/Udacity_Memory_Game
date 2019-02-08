// Using the starter code provided by Udacity for creating the memory game.

// card symbols
var cards = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
				'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube',
				'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];

// Create an array to hold opened cards
var openCard = [];
var moves = 0;
var matchFound = 0;
var startGame = 0;
var starRating = "3";
var timer;

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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// loop through each card and create its HTML
function createCard() {
  	var cardList = shuffle(cards);
  	cardList.forEach(function(card) {
    	$('.deck').append('<li><i class="card ' + card + '"></i></li>');
  	})
}

// Logic to find matching cards
function findMatch() {
	//show cards on click
	$(".card").on("click", function(){
		if ($(this).hasClass("open show")) { return }
			$(this).toggleClass("flipInY open show");
		openCard.push($(this));
		startGame = true;
		// check if classlist matches when openCard length == 2
		if (openCard.length === 2) {
			if (openCard[0][0].classList[2] === openCard[1][0].classList[2]) {
				openCard[0][0].classList.add("bounceIn", "match");
				openCard[1][0].classList.add("bounceIn", "match");
				$(openCard[0]).off('click');
				$(openCard[1]).off('click');
				matchFound += 1;
				moves++;
				removeOpenCards();
				findWinner();
			} else {
				// if classes don't match, add 'wrong' class
				openCard[0][0].classList.add("shake", "wrong");
				openCard[1][0].classList.add("shake", "wrong");
				// Set timeout to remove 'show' and 'open' class
				setTimeout(removeClasses, 1100);
				// Reset openCard.length to 0
				setTimeout(removeOpenCards, 1100);
				moves++;
			}
		}
	updateMoves();
	})
}

//Update HTML with number of moves
function updateMoves() {
	if (moves === 1) {
		$("#movesText").text(" Move");
	} else {
		$("#movesText").text(" Moves");
	}
	$("#moves").text(moves.toString());

	if (moves > 0 && moves < 16) {
		starRating = starRating;
	} else if (moves >= 16 && moves <= 20) {
		$("#starOne").removeClass("fa-star");
		starRating = "2";
	} else if (moves > 20) {
		$("#starTwo").removeClass("fa-star");
		starRating = "1";
	}
}

// Open popup when game is complete source: www.w3schools.com
function findWinner() {

  if (matchFound === 8) {

    var modal = document.getElementById('win-popup');
    var span = document.getElementsByClassName("close")[0];

    $("#total-moves").text(moves);
    $("#total-stars").text(starRating);

    modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

   $("#play-again-btn").on("click", function() {
       location.reload()
   });

   clearInterval(timer);


 }
}

// Reset openCard.length to 0
function removeOpenCards(){
	openCard = [];
}

// Remove all classes exept 'match'
function removeClasses(){
	$(".card").removeClass("show open flipInY bounceIn shake wrong");
	removeOpenCards();
}

// Disable clicks
function disableClick() {
	openCard.forEach(function (card) {
		card.off("click");
	})
}

// start timer on the first card click
function startTimer() {
	var clicks = 0;
	$(".card").on("click", function() {
		clicks += 1;
		if (clicks === 1){
			var sec = 0;
			function time ( val ) {return val > 9 ? val : "0" + val;}
			timer = setInterval( function(){
				$(".seconds").html(time(++sec % 60));
				$(".minutes").html(time(parseInt(sec / 60, 10)));
			}, 1000);
		}
	})
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 //call functions
 shuffle(cards);
 createCard();
 findMatch();
 startTimer();


//Function to restart the game on restart-icon click
function restartGame() {
	$("#restart").on("click", function(){
		location.reload()
	});
}

restartGame();
