import { useEffect, useReducer, useState } from 'react';
import Timer from './Timer.jsx';
import cn from 'classnames';

function reducer(state, { status }) {
  switch(status) {
    case 'reset':
      return {...state, status: 'reset', isGameRunning: false };
    case 'shuffling':
      return { ...state, status: 'shuffling', isGameRunning: false };
    case 'preparing':
      return { ...state, status: 'preparing', isGameRunning: true };
    case 'starting':
      return { ...state, status: 'starting' };
    case 'lose':
      return {...state, status: 'lose', isGameRunning: false};
    case 'win':
      return {...state, status: 'win', isGameRunning: false};
  }
}

const initialState = {
  status: 'waiting',
  isGameRunning: false,
};

export default function CardsGame({ level, cards, shuffleCards }) {

  const [state, dispatch] = useReducer(reducer, initialState);

  const { isGameRunning, status } = state;

  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const handleLose = () => {
    dispatch({ status: 'lose' });
  };

  const handleWin = () => {
    dispatch({ status: 'win' })
  };

  const handleReset = () => {
    dispatch({ status: 'reset' });
  };

  const handleStartGame = () => {
    dispatch({ status: 'shuffling' });
  };

  const handleTimerEnd = () => {
    dispatch({ status: 'starting' });
  };

  const handleOpenCard = (card) => {
    if (status !== 'starting') return;
    setFlippedCards((prevState) => [...prevState, card]);
  };

  useEffect(() => {
    if (status === 'shuffling') {
      setFlippedCards([]);
      setMatchedCards([]);
      shuffleCards();
      dispatch({ status: 'preparing' });
    }
  }, [status])

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.id === secondCard.id) {
        setMatchedCards((prevState) => [...prevState, firstCard.uId, secondCard.uId]);
        setFlippedCards([]);
      } else {
        handleLose();
      }
    }

    if (matchedCards.length === cards.length && matchedCards.length !== 0) {
      handleWin();
    }
  }, [flippedCards]);

  useEffect(() => {
    handleReset();
  }, [level]);

  const renderCards = (cards) => {
    return cards.map((card) => {
      const {src, uId} = card;
      const cardClasses = cn('card', {
        'card_show': (status === 'preparing' || flippedCards.includes(card) || matchedCards[matchedCards.length - 1] === card.uId) && status !== 'shuffling',
        'card_open': matchedCards.slice(0, matchedCards.length - 1).includes(uId) && status !== 'shuffling',
      });
      return (
        <div key={uId} className={cardClasses}>
          <div className="card__front-side"><img className="card__img" src={src} alt="" /></div>
          <div className="card__back-side"><img onClick={() => handleOpenCard(card)} className="card__img" src="/images/questionmark.png" alt=""/></div>
        </div>
      )
    });
  };

  const gameGridClasses = cn('game__card-grid', {
    'game__card-grid_6': level === 6,
    'game__card-grid_8': level === 8,
    'game__card-grid_10': level === 10,
    'game__card-grid_12': level === 12,
    'game__card-grid_16': level === 16,
  })

  return (
    <div className='game'>
      {!isGameRunning && <button onClick={() => handleStartGame()} className="btn btn_secondary">Start Game</button>}
      {(status === 'preparing') && <Timer level={level} handleTimerEnd={handleTimerEnd} />}
      {(status === 'starting' && status !== 'lose' && status !== 'win') && <h2 className="game__heading">The game has started</h2>}
      {(status === 'lose') && <h2 className='game__heading'>You have lost</h2> }
      {(status === 'win') && <h2 className='game__heading'>You have won</h2> }
      <div className={gameGridClasses}>
        {renderCards(cards)}
      </div>
    </div>
  )
}