import cn from 'classnames';

export default function Card({ src, id, setIds, status, uId, uIds, setUIds, openedCards }) {
  const openCard = (id, uId) => {
    if (status === 'starting') {
      setIds((arr) => [...arr, id]);
      setUIds((arr) => [...arr, uId])
    }
  }

  const cardClasses = cn('card', {
    'card_show': status === 'preparing' || uIds.includes(uId),
    'card_open': openedCards.includes(String(uId)),
  })

  return (
    <div className={cardClasses}>
      <div className="card__front-side"><img className="card__img" src={src} alt="" /></div>
      <div className="card__back-side"><img onClick={() => openCard(id, uId)} className="card__img" src="/images/questionmark.png" alt=""/></div>
    </div>
  )
}