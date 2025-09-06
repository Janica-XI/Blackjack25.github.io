// Blackjack object

/**
 * Class that represents the Blackjack game.
 */
class Blackjack {
    // Constant that defines the maximum points to avoid busting in Blackjack
    static MAX_POINTS = 25;
    // Constant that defines the point threshold at which the dealer must stand
    static DEALER_MAX_TURN_POINTS = 21;

    /**
     * Creates an instance of Blackjack and initializes the deck.
     */
    constructor() {
        this.dealerCards = []; // Array to hold the dealer's cards
        this.playerCards = []; // Array to hold the player's cards
        this.dealerTurn = false; // Flag to indicate if it's the dealer's turn to play

        // State of the game with information about the outcome
        this.state = {
            gameEnded: false, // Indicates whether the game has ended
            playerWon: false, // Indicates if the player has won
            dealerWon: false, // Indicates if the dealer has won
            playerBusted: false, // Indicates if the player has exceeded MAX_POINTS
            dealerBusted: false // Indicates if the dealer has exceeded MAX_POINTS
        };

        // Initialize the deck of cards
        this.deck = this.shuffle(this.newDeck()); // Create and shuffle a new deck
    }

    //TODO: Implement this method
    /**
     * Creates a new deck of cards.
     * @returns {Card[]} - An array of cards.
     */

    newDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const deck = [];
    
        // Create deck of 52 cards with values and suits
        for (let value = 1; value <= 13; value++) {
            suits.forEach(suit => {
                deck.push({ value, suit });
            });
        }
    
        return deck;
    }

    //TODO: Implement this method
    /**
     * Shuffles the deck of cards.
     * @param {Card[]} deck - The deck of cards to be shuffled.
     * @returns {Card[]} - The shuffled deck.
     */
    shuffle(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap positions
        }
        return deck;
    }

    /**
     * Returns the dealer's cards.
     * @returns {Card[]} - An array containing the dealer's cards.
     */
    getDealerCards() {
        return this.dealerCards.slice(); // Return a copy of the dealer's cards
    }

    /**
     * Returns the player's cards.
     * @returns {Card[]} - An array containing the player's cards.
     */
    getPlayerCards() {
        return this.playerCards.slice(); // Return a copy of the player's cards
    }

    /**
     * Sets whether it is the dealer's turn to play.
     * @param {boolean} val - Value indicating if it's the dealer's turn.
     */
    setDealerTurn(val) {
        this.dealerTurn = val; // Update the dealer's turn status
    }

    //TODO: Implement this method
    /**
     * Calculates the total value of the provided cards.
     * @param {Card[]} cards - Array of cards to be evaluated.
     * @returns {number} - The total value of the cards.
     */
    getCardsValue(cards) {
        let total = 0;
        let aceCount = 0;
    
        cards.forEach(card => {
            if (card.value > 10) {
                total += 10; // Face cards (Jack, Queen, King) are worth 10 points
            } else if (card.value === 1) {
                aceCount += 1; // Track Aces
                total += 11; // Initially treat Ace as 11
            } else {
                total += card.value; // Number cards (2-10) add their value
            }
        });
    
        // Adjust Ace values from 11 to 1 if necessary to avoid busting
        while (total > Blackjack.MAX_POINTS && aceCount > 0) {
            total -= 10; // Reduce Ace from 11 to 1
            aceCount -= 1;
        }
    
        return total;
    }

    //TODO: Implement this method
    /**
     * Executes the dealer's move by adding a card to the dealer's array.
     * @returns {Object} - The game state after the dealer's move.
     */
    dealerMove() {
		while (this.getCardsValue(this.dealerCards) < Blackjack.DEALER_MAX_TURN_POINTS) {
            this.dealerCards.push(this.deck.pop()); // Dealer draws a card
        }
        return this.getGameState();
    }

    //TODO: Implement this method
    /**
     * Executes the player's move by adding a card to the player's array.
     * @returns {Object} - The game state after the player's move.
     */
    playerMove() {
	    this.playerCards.push(this.deck.pop()); // Player draws a card
        return this.getGameState();
    }

    //TODO: Implement this method
    /**
     * Checks the game state based on the dealer's and player's cards.
     * @returns {Object} - The updated game state.
     */
    getGameState() {
		const playerTotal = this.getCardsValue(this.playerCards);
        const dealerTotal = this.getCardsValue(this.dealerCards);
        document.getElementById('player_total').innerHTML = playerTotal; // Display game result
        document.getElementById('dealer_total').innerHTML = dealerTotal; // Display game result

        if (playerTotal > Blackjack.MAX_POINTS) {
            this.state.playerBusted = true;
            this.state.gameEnded = true;
        } else if (playerTotal === Blackjack.MAX_POINTS) {
            this.state.playerWon = true;
            this.state.gameEnded = true;
            triggerConfetti();
        }

        if (this.dealerTurn) {
            if (dealerTotal > Blackjack.MAX_POINTS) {
                this.state.dealerBusted = true;
                this.state.gameEnded = true;
                triggerConfetti();
            } else if (dealerTotal === Blackjack.MAX_POINTS || dealerTotal > playerTotal) {
                this.state.dealerWon = true;
                this.state.gameEnded = true;
            } else if (dealerTotal < playerTotal) {
                this.state.playerWon = true;
                this.state.gameEnded = true;
                triggerConfetti();
            } else if (dealerTotal === playerTotal) {
                this.state.gameEnded = true; // It's a tie
            }
        }

        return this.state;
    }
}
