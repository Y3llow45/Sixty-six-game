import './Card.css'

function Card({ image, card, onClick }) {

  function selectCard() {
    onClick(card);
  }

  return (
    <div className="card">
      <img src={`/cards/${image}`} alt={card} onClick={selectCard.bind(card)} />
    </div>
  );
}

export default Card;