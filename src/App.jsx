import { useState, useEffect } from "react";
import cards from "./fixtures/cards";
import CardsGame from "./components/CardsGame";
import { shuffle, uniqueId } from "lodash";
import Menu from "./components/Menu";

export default function App() {
  const [level, setLevel] = useState(6);

  const [shuffledCards, setShuffledCards] = useState([]);

  const handleChoosingLevel = (value) => () => {
    setLevel(value);
  };

  useEffect(() => {
    const levelCards = cards.slice(0, Number(level / 2));
    setShuffledCards(
      shuffle([...levelCards, ...levelCards])
        .map((card) => ({...card, uId: uniqueId()}))
    );
  }, [level])


  const shuffleCards = () => {
    setShuffledCards((value) => shuffle(value));
  }

  return (
    <div className="page">
      <div className="header">
        <div className="header__container">
          <h1 className="header__heading">Memory Cards Game</h1>
        </div>
      </div>
      <div className="main">
        <div className="main__container">
          <div className="main__grid">
            <Menu handleChoosingLevel={handleChoosingLevel} />
            <CardsGame level={level} cards={shuffledCards} shuffleCards={shuffleCards} />
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer__container flex-container">
          <p className="footer__description">Made by Daniil Kalabukhov</p>
        </div>
      </div>
    </div>
  )
};
