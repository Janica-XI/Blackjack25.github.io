class BettingSystem {
    constructor(initialBalance) {
        this.balance = initialBalance; // Player's initial balance
        this.bet = 0; // Current bet
    }

    // Set the bet for the round, ensures player has enough balance
    setBet(amount) {
        if (amount > this.balance) {
            throw new Error("Insufficient balance for this bet.");
        }
        this.bet = amount;
    }

    // Update balance based on the result of the round
    adjustBalance(playerWon, dealerBusted) {
        if (playerWon || dealerBusted) {
            // Player wins: Gain back the bet (already subtracted) and win equal to the bet
            this.balance += this.bet; 
        } else {
            // Player loses: Lose the bet amount once
            this.balance -= this.bet;
        }
    }

    // Return the current balance
    getBalance() {
        return this.balance;
    }

    // Get the current bet for display
    getBet() {
        return this.bet;
    }

    // Reset bet to 0 after each round
    resetBet() {
        this.bet = 0;
    }

}
