import './App.css';
import React from 'react';
import LetterBox from './LetterBox';
import SingleLetterSearchbar from './SingleLetterSearchBar';

// Images
import noose from './noose.png';
import upperBody from './upperbody.png';
import upperandlower from './upperandlowerbody.png';
import oneArm from './1arm.png';
import bothArms from './botharms.png';
import oneLeg from './1leg.png';
import dead from './dead.png';

const pics = [noose, upperBody, upperandlower, oneArm, bothArms, oneLeg, dead];
const words = ['saints', 'falcons', 'panthers', 'buccaneers', 'texans', 'bears', 'cowboys'];
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

class HangmanGame extends React.Component {
  state = {
    wordList: [],
    curWord: 0,
    lifeLeft: 0,
    usedLetters: [],
    incorrectLetters: [],
    playerName: '',
    resultRecorded: false,
  };

  componentDidMount() {
    this.setState({ wordList: words });
  }

  getPlayerName = (name) => {
    this.setState({ playerName: name });
  };

  onSearch = (letter) => {
    const { wordList, curWord, usedLetters, incorrectLetters, lifeLeft } = this.state;
    const word = wordList[curWord];
    const lowercaseLetter = letter.toLowerCase();

    if (word.toLowerCase().includes(lowercaseLetter)) {
      this.setState((prevState) => ({
        usedLetters: [...prevState.usedLetters, lowercaseLetter],
      }));
    } else {
      this.setState((prevState) => ({
        incorrectLetters: [...prevState.incorrectLetters, lowercaseLetter],
        lifeLeft: prevState.lifeLeft + 1,
      }));
      console.log(`Incorrect guess: ${letter}`);
    }
  };

  getDisplayWord = () => {
    const { wordList, curWord, usedLetters } = this.state;
    const word = wordList[curWord] || '';
    return word
      .split('')
      .map((letter) => (usedLetters.includes(letter) ? letter : '_'))
      .join(' ');
  };

  startNewGame = () => {
    this.setState({
      usedLetters: [],
      incorrectLetters: [],
      lifeLeft: 0,
      curWord: Math.floor(Math.random() * this.state.wordList.length),
      resultRecorded: false,
    });
  };

  recordResult = (didWin) => {
    if (this.state.resultRecorded) return; // Prevent double submission
    fetch('http://localhost:4000/api/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.playerName || 'Guest',
        didWin: didWin,
      }),
    });
    this.setState({ resultRecorded: true });
  };

  render() {
    const { wordList, curWord, usedLetters, incorrectLetters, lifeLeft } = this.state;
    const word = wordList[curWord] || '';
    const maxGuesses = pics.length - 1;

    const hasWon = word
      .toLowerCase()
      .split('')
      .every((letter) => usedLetters.includes(letter));

    const hasLost = lifeLeft >= maxGuesses;

    if (hasWon) this.recordResult(true);
    if (hasLost) this.recordResult(false);

    return (
      <div>
        <img src={pics[lifeLeft]} alt={`Hangman progress: ${lifeLeft} incorrect guesses`} />
        <button onClick={this.startNewGame}>New Game</button>
        <p>{this.getDisplayWord()}</p>
        {hasWon && <p>🎉 Congratulations! You've won!</p>}
        {hasLost && <p>💀 Game over! The word was: {word}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {alphabet.map((letter) => (
            <LetterBox
              key={letter}
              letter={letter}
              isVisible={!usedLetters.includes(letter) && !incorrectLetters.includes(letter)}
              isIncorrect={incorrectLetters.includes(letter)}
              onClick={() => this.onSearch(letter)}
              boxStyle={{ backgroundColor: 'lightblue', cursor: 'pointer' }}
              letterStyle={{ color: 'white', fontSize: '30px' }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default HangmanGame;
