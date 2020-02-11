import React, { Component } from "react";
import Wrapper from "./components/GameWrapper";
import Title from "./components/Title";
import Card from "./components/Card";
import CardsWrapper from "./components/CardsWrapper";
import GameInfo from "./components/GameInfo";
import cardsData from "./cards.json";
import Footer from "./components/Footer/index";
import Popup from "./components/Popup";
import WinPop from "./components/WinPopUp";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      cards: [],
      score: 0,
      highscore: 0,
      showPopup: false,
      showWinPopup: false
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  toggleWinPopup() {
    this.setState({
      showWinPopup: !this.state.showWinPopup
    });
  }

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem("memoryGame")) || {
      highscore: 0
    };
    this.setState({
      highscore: storage.highscore,
      cards: this.shuffleCards(cardsData)
    });
  }
  shuffleCards = data => {
    let arr = [...data];
    for (let i in arr) {
      let randIndex = Math.floor(Math.random() * arr.length);
      let temp1 = arr[randIndex];
      let temp2 = arr[i];
      arr[randIndex] = temp2;
      arr[i] = temp1;
    }
    return arr;
  };
  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      const storeData = JSON.stringify({ highscore: this.state.score });
      localStorage.setItem("memoryGame", storeData);
      this.setState({ highscore: this.state.score });
    }
    // this.setState({ message: 'Game Over!' })
    this.state.cards.forEach(card => (card.count = 0));
    this.setState({ score: 0 });
  };
  victoryCheck = () => {
    let remainingCards = this.state.cards.filter(card => card.count === 0);
    if (remainingCards.length === 0) {
      // this.setState({ message: 'You Win' })
      this.toggleWinPopup();
      this.state.cards.forEach(card => (card.count = 0));
      this.setState({ highscore: this.state.score + 1 });
    }
  };
  clickCount = id => {
    this.state.cards.find(card => {
      if (card.id === id) {
        if (card.count === 0) {
          this.setState({ message: "" });
          this.setState({ score: this.state.score + 1 });
          card.count = card.count + 1;
          this.setState({ cards: this.shuffleCards(this.state.cards) });
          this.victoryCheck();
          return true;
        } else {
          this.gameOver();
          this.togglePopup();
          this.setState({ cards: this.shuffleCards(this.state.cards) });
          return true;
        }
      }
      return false;
    });
  };
  render() {
    const { cards, score, highscore, message } = this.state;
    return (
      <Wrapper>
        <Title score={score} highscore={highscore} message={message} />
        <GameInfo />
        <div>
          {this.state.showPopup ? (
            <Popup
              text='Too bad, you lost. Click "OK" to beat your top score.'
              closePopup={this.togglePopup.bind(this)}
              score={this.state.score}
            />
          ) : null}
        </div>
        <div>
          {this.state.showWinPopup ? (
            <WinPop
              text='You Win! Click "OK" to beat your top score.'
              closeWinPopup={this.toggleWinPopup.bind(this)}
              score={this.state.score}
            />
          ) : null}
        </div>
        <CardsWrapper>
          {cards.map(card => (
            <Card
              clickCount={this.clickCount}
              id={card.id}
              key={card.id}
              name={card.name}
              image={card.image}
            />
          ))}
        </CardsWrapper>
        <Footer />
      </Wrapper>
    );
  }
}
export default App;
