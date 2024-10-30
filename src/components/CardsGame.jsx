import { useEffect, useReducer, useState } from 'react';
import Card from './Card.jsx';
import { uniqueId } from 'lodash';
import Timer from './Timer.jsx';
import cn from 'classnames';

function reducer(state, { status }) {
  switch(status) {
    case 'reset':
      return {...state, status: 'reset', isGameRunning: false }
    case 'preparing':
      return { ...state, status: 'preparing', isGameRunning: true };
    case 'starting':
      return { ...state, status: 'starting' };
    case 'lose':
      return {...state, status: 'lose', isGameRunning: false}
    case 'win':
      return {...state, status: 'win', isGameRunning: false}
  }
}

const initialState = {
  status: 'waiting',
  isGameRunning: false,
};

export default function CardsGame({ level, cards, shuffleCards }) {

  const [state, dispatch] = useReducer(reducer, initialState);

  const { isGameRunning, status } = state;

  const [ids, setIds] = useState([]);

  const [uIds, setUIds] = useState([]);

  const [openedCards, setOpenedCards] = useState([]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (ids.length === 2) {
      const [firstId, secondId] = ids;
      if (firstId === secondId) {
        setIds([]);
      } else {
        handleLose();
      }
    }

    if (uIds.length === level) {
      handleWin({ status: 'win' });
    }
  }, [ids, uIds]);

  useEffect(() => {
    handleReset();
  }, [level]);

  useEffect(() => {
    if (uIds.length > 1) {
      setOpenedCards((value) => [...value, uIds[index]])
      setIndex((value) => value + 1);
    }
  }, [uIds])

  const handleLose = () => {
    dispatch({ status: 'lose' })
  };

  const handleWin = () => {
    dispatch({ status: 'win' })
  };

  const handleReset = () => {
    dispatch({ status: 'reset' });
  }

  const handleStartGame = () => {
    dispatch({ status: 'preparing' });
    shuffleCards();
    setUIds([]);
    setIds([]);
    setOpenedCards([]);
    setIndex(0);
  };

  const handleTimerEnd = () => {
    dispatch({ status: 'starting' });
  };

  const renderCards = (cards) => {
    return cards.map((card) => (
      <Card
        openedCards={openedCards}
        uIds={uIds}
        setUIds={setUIds}
        ids={ids}
        setIds={setIds}
        status={status}
        id={card.id}
        uId={card.uId}
        key={uniqueId()}
        src={card.src} />
    ));
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
      {(status !== 'preparing' && status !== 'waiting' && status !== 'lose' && status !== 'win' && status !== 'reset') && <h2 className="game__heading">The game has started</h2>}
      {(status === 'lose') && <h2 className='game__heading'>You have lost</h2> }
      {(status === 'win') && <h2 className='game__heading'>You have won</h2> }
      <div className={gameGridClasses}>
        {renderCards(cards)}
      </div>
    </div>
  )
}