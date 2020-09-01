## UdaciCards
UdaciCards is a mobile flashcards quiz app, developed using React Native, as a required project of the Udacity React Nanodegree.

The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

## Functionalities
Use create-react-native-app to build your project.
Allow users to create a deck which can hold an unlimited number of cards.
Allow users to add a card to a specific deck.
The front of the card should display the question.
The back of the card should display the answer.
Users should be able to quiz themselves on a specific deck and receive a score once they're done.
Users should receive a notification to remind themselves to study if they haven't already for that day.

## Required Views
Deck List View (Default View).
Individual Deck View.
Quiz View.
New Deck View.
New Question View.

## Data
As there is currently no back end implemented, AsyncStorage is used to store decks and flashcards. Here is the format of the data

{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

## Getting Started

Step 1: Navigate to the Project Folder

Step 2: Install Dependencies
From within the project folder, install all dependencies using NPM ($npm install). 
Also install expo globally ($npm install -g expo-cli)

Step 3: $ npm start. You can also use expo start.

Step 4: Run the Simulator
Once the server has started you will be presented with several options.

The app has been tested in the iOS platform

## Acknowledgements
I want to thank Udacity for providing the framework and guidelines for this great project.
