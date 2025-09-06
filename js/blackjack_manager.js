// Blackjack OOP

let game = null; // Stores the current instance of the game
let bettingSystem = null; // Declare betting system globally (initially null)

// Initialize the game and betting system only once on page load
$( document ).ready(function() {
    bettingSystem = new BettingSystem(100); // Initialize betting system with $100
    //updateBalanceDisplay(); // Display initial balance
});


/**
 * Function to debug and display the state of the game object.
 * @param {Object} obj - The object to be debugged.
 */
function debug(obj) {
    document.getElementById('debug').innerHTML = JSON.stringify(obj); // Displays the state of the object as JSON
}

/**
 * Initializes the game buttons.
 */
function buttonsInitialization() {
    document.getElementById('card').disabled = false; // Enables the button to draw a card
    document.getElementById('stand').disabled = false; // Enables the button to stand
    document.getElementById('new_game').disabled = true; // Disables the button for a new game
}

/**
 * Finalizes the buttons after the game ends.
 */
function finalizeButtons() {
    //TODO: Reveal the dealer's hidden card if you hid it like you were supposed to.

    document.getElementById('card').disabled = true; // Disables the button to draw a card
    document.getElementById('stand').disabled = true; // Disables the button to stand
    document.getElementById('new_game').disabled = false; // Enables the button for a new game
}

//TODO: Implement this method.
/**
 * Clears the page to start a new game.
 */
function clearPage() {
    document.getElementById('dealer').innerHTML = ''; // Clear dealer's cards
    document.getElementById('player').innerHTML = ''; // Clear player's cards
    document.getElementById('game_status').innerHTML = ''; // Clear game status
    document.getElementById('player_total').innerHTML = ''; // Clear game status
    document.getElementById('dealer_total').innerHTML = ''; // Clear game status
    debug(null); // Clear debug display
}

//TODO: Complete this method.
/**
 * Starts a new game of Blackjack.
 */
function newGame() {
    clearPage();
    game = new Blackjack(); // Creates a new instance of the Blackjack game
    
   // updateBalanceDisplay(); // Display initial balance
    debug(game); // Displays the current state of the game for debugging

    //TODO: Add missing code.
/*     game.playerMove(); // Player's first move
    game.dealerMove(); // Dealer's first move (one card face down)
 */

    // Deal two cards to player and dealer
    game.playerCards.push(game.deck.pop(), game.deck.pop());
    game.dealerCards.push(game.deck.pop(), game.deck.pop());


    $('#dealer_total').css("visibility", "hidden");

    // Display the cards
    updatePlayer(game.getGameState());
    updateDealer(game.getGameState(), true); // true for hiding the first dealer card

    document.getElementById('place-bet').disabled = false;

    buttonsInitialization();
}

//TODO: Implement this method.
/**
 * Calculates and displays the final score of the game.
 * @param {Object} state - The current state of the game.
 */
function finalScore(state) {
    let message = '';

    const playerTotal = game.getCardsValue(game.playerCards);
    const dealerTotal = game.getCardsValue(game.dealerCards);

    if (state.playerWon) {
        message = 'Player won with ' + playerTotal + ' points!';
    } else if (state.dealerWon) {
        message = 'Dealer won with ' + dealerTotal + ' points!';
    } else if (state.playerBusted) {
        message = "Player busted! Dealer wins!";
    } else if (state.dealerBusted) {
        message = "Dealer busted! Player wins!";
    } else {
        message = "It's a tie!";
    }
	console.log(message);
    $('#gameStatusModal').modal('show'); 
    document.getElementById('game_status').innerHTML = message; // Display game result
}

//TODO: Implement this method.
/**
 * Updates the dealer's state in the game.
 * @param {Object} state - The current state of the game.
 */

function updateDealer(state, hideFirstCard = false) {
    const dealerElement = document.getElementById('dealer');
 //   dealerElement.innerHTML = ''; // Clear previous cards

    const currentCardCount = dealerElement.querySelectorAll('.flip-card').length;
    console.log(currentCardCount);
    // If there are already cards in the DOM, slide them to the left
    if (currentCardCount > 0) {
        const existingCards = dealerElement.querySelectorAll('.flip-card');
        existingCards.forEach(card => {
            card.classList.add('card-slide'); // Apply slide animation to existing cards
        });
    }

    // Only add the new cards (beyond current count)
    game.getDealerCards().slice(currentCardCount).forEach((card, index) => {
        if (hideFirstCard && currentCardCount === 0 && index === 0) {
            printCard(dealerElement, card, false, true); // First card stays face down
        } else {
            printCard(dealerElement, card, true, true); // Other cards flip up
            const dealerCards = dealerElement.querySelectorAll('.flip-card');
            setTimeout(() => {
                dealerCards[dealerCards.length - 1].classList.add('flipped'); // Flip the newly added card
            }, 300); // Delay flip to match addition
        }
    });

    if (state.gameEnded) {
        finalizeGame();
/*         finalizeButtons();
        finalScore(state);  */
    }
}

//TODO: Implement this method.
/**
 * Updates the player's state in the game.
 * @param {Object} state - The current state of the game.
 */

function updatePlayer(state) {
    const playerElement = document.getElementById('player');
//    playerElement.innerHTML = ''; // Clear previous cards
    
    // Get the current number of cards in the DOM
    const currentCardCount = playerElement.getElementsByClassName('flip-card').length;
    console.log(currentCardCount);
    // If there are already cards in the DOM, slide them to the left
    if (currentCardCount > 0) {
        const existingCards = playerElement.querySelectorAll('.flip-card');
        existingCards.forEach(card => {
            card.classList.add('card-slide'); // Apply slide animation to existing cards
        });
    }

    // Only add the new card (i.e., cards beyond the current count)
    game.getPlayerCards().slice(currentCardCount).forEach((card, index) => {
        // New card needs to be added
        printCard(playerElement, card, true, true); // Add new card face down
        const playerCards = playerElement.querySelectorAll('.flip-card');
        
        // Flip the new card (only the last one added)
        setTimeout(() => {
            playerCards[playerCards.length - 1].classList.add('flipped'); // Flip the newly added card
        }, 300); // Flip after it's added
    });


    if (state.gameEnded) {
        finalizeGame();
/*         finalizeButtons();
        finalScore(state); // Display final result */
    }
}


//TODO: Implement this method.
/**
 * Causes the dealer to draw a new card.
 * @returns {Object} - The game state after the dealer's move.
 */
function dealerNewCard() {
	const state = game.dealerMove();
    updateDealer(state);
}

//TODO: Implement this method.
/**
 * Causes the player to draw a new card.
 * @returns {Object} - The game state after the player's move.
 */
function playerNewCard() {
    const state = game.playerMove();
    updatePlayer(state);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

//TODO: Implement this method.
/**
 * Finishes the dealer's turn.
 */

function dealerFinish() {
    game.setDealerTurn(true);
    
    const dealerElement = document.getElementById('dealer');
    const firstCard = dealerElement.querySelector('.flip-card');
    
    // Trigger flip animation
    setTimeout(() => {
        firstCard.classList.add('flipped'); // Flip the first card
    }, 300); // Add a slight delay to make the flip noticeable
    
    sleep(1000).then(() => {     
        $('#dealer_total').css("visibility", "visible");  
        const state = game.dealerMove();
        updateDealer(state, false); // No need to hide any cards now
    });

}
//TODO: Implement this method.
/**
 * Prints the card in the graphical interface.
 * @param {HTMLElement} element - The element where the card will be displayed.
 * @param {Card} card - The card to be displayed.
 * @param {boolean} [replace=false] - Indicates whether to replace the existing image.
 */

function printCard(element, card, flipImmediately = true, isFaceDown = true, replace = false) {
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('flip-card');
        
        let cardInner = document.createElement('div');
        cardInner.classList.add('flip-card-inner');
    
        // Front (face) of the card
        let cardFront = document.createElement('img');
        let cardName;
        if (card.value === 13) {
            cardName = `king_of_${card.suit}.svg`;
        } else if (card.value === 12) {
            cardName = `queen_of_${card.suit}.svg`;
        } else if (card.value === 11) {
            cardName = `jack_of_${card.suit}.svg`;
        } else if (card.value === 1) {
            cardName = `ace_of_${card.suit}.svg`;
        } else {
            cardName = `${card.value}_of_${card.suit}.svg`; // For number cards (2-10)
        }
        cardFront.src = `img/cards/svg/${cardName}`;
        cardFront.classList.add('flip-card-front');
    
        // Back of the card
        let cardBack = document.createElement('img');
        cardBack.src = 'img/cards/svg/card_back.svg'; // Back of card image
        cardBack.classList.add('flip-card-back');
    
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardContainer.appendChild(cardInner);
    
        if (replace) {
            element.innerHTML = ''; // Clear existing cards
        }
    
        element.appendChild(cardContainer); // Add the card to the provided HTML element
    
        // Add the flip animation if the card is initially face down
        setTimeout(() => {
            if (!isFaceDown && flipImmediately) {
                cardContainer.classList.add('flipped'); // Flip the card if it's not supposed to stay face down
            }
        }, 300); // Small delay to ensure the card is rendered before flipping
    }

// Function to place a bet
function placeBet() {
    const betInput = document.getElementById('betRange');
    const betAmount = parseInt(betInput.value);

    try {
        bettingSystem.setBet(betAmount);
        updateBalanceDisplay(); // Update the balance display after placing the bet
        updatePotDisplay(); // Show the current pot

        // Disable the Place Bet button after the bet is placed
        document.getElementById('place-bet').disabled = true;
    
    } catch (error) {
        alert(error.message); // Display error if bet exceeds balance
    }
}


// Function to update the balance display
function updateBalanceDisplay() {
    const actualBalance = bettingSystem.getBalance();
    
    // Get the current bet amount
    const currentBet = bettingSystem.getBet();
    
    // Calculate the displayed balance (actual balance - current bet)
    const displayedBalance = actualBalance - currentBet;
    console.log(actualBalance);
    // Update the UI with the displayed balance
    $("#balance").text(`$${displayedBalance.toFixed(0)}`); // Format to zero decimal places
}

function finalBalanceDisplay() {
    const actualBalance = bettingSystem.getBalance(); 
    // Update the UI with the displayed balance
    $("#balance").text(`$${actualBalance.toFixed(0)}`); // Format to zero decimal places
}

function updatePotDisplay() {
    // Display the current pot (bet amount)
    $("#current-pot").text(`$${bettingSystem.getBet()}`);
}

function finalizeGame() {
    const state = game.getGameState();
    const playerWon = state.playerWon;
    const dealerBusted = state.dealerBusted;

    // Adjust balance based on the result
    bettingSystem.adjustBalance(playerWon, dealerBusted);

    // Update balance and reset pot
    finalBalanceDisplay();
    bettingSystem.resetBet();
    updatePotDisplay(); // Reset pot to $0 after the game

    finalizeButtons(); // Disable buttons at the end of the round
    finalScore(state); // Display final result
}