# Blackjack25

This project is a simple implementation of a card game called Blackjack, with a twist: the goal is to get as close to 25 points as possible without going over.

The project was developed as a school assignment to practice fundamental concepts in JavaScript and the frontend was implemented with the framework bootstrap.

## Key Features
**MVC Design Pattern**: The application is built using the Model-View-Controller (MVC) design pattern, separating the application's logic into three distinct parts:

**Model**: The core game logic, including the rules for card dealing, scoring, and game states. This is handled by the Blackjack class in js/blackjack_object.js.

**View**: The user interface, written in blackjack_oop.html and styled with CSS.

**Controller**: The interface that manages the interaction between the user interface and the game logic. This is handled by the functions in js/blackjack_manager.js.

**Gameplay**: The game pits the player against a dealer.

Card values are standard, with face cards (King, Queen, Jack) counting as 10 and an Ace counting as either 1 or 11, whichever is more beneficial.

The player can choose to "hit" (take another card) or "stand" (end their turn).

The game ends if the player or dealer exceeds 25 points, if the player reaches exactly 25, or if the dealer's score surpasses the player's.

## Project Structure
The repository contains the following files:

**blackjack_oop.html**: The HTML file for the game's user interface.

**js/blackjack_object.js**: Contains the Blackjack class with the core game logic.

**js/blackjack_manager.js**: Contains the controller functions that manage the game flow.

**css/blackjack_style.css**: A custom CSS file for styling.

**img/**: A folder containing SVG and PNG images of playing cards for the user interface.
