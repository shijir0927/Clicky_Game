import React, { Component } from "react";
import Wrapper from "./components/GameWrapper";
import Title from "./components/Title";
import Card from "./components/Card";
import CardsWrapper from "./components/CardsWrapper";
import cardsData from "./cards.json";
import "./index.css";
import { Animated } from "react-animated-css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      cards: [],
      score: 0,
      highscore: 0
    };
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

    this.setState({ message: "Game Over!" });
    this.state.cards.forEach(card => (card.count = 0));
    this.setState({ score: 0 });
  };

  victoryCheck = () => {
    let remainingCards = this.state.cards.filter(card => card.count === 0);
    if (remainingCards.length === 0) {
      this.setState({
        message:
          "You Have Selected All The Cards! Keep Going To Increase Your Score"
      });
      this.state.cards.forEach(card => (card.count = 0));
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
        <Animated
          animationIn="fadeInDown"
          animationOut="fadeOut"
          isVisible={true}
        >
          <Title score={score} highscore={highscore} message={message} />
        </Animated>

        <Animated
          animationIn="fadeInRight"
          animationOut="fadeOut"
          isVisible={true}
        >
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
        </Animated>
      </Wrapper>
    );
  }
}

export default App;
