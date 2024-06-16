import './Card.css'

function Card({ key, image, card, onClick }) {

  function selectCard() {
    onClick(card);
  }

  return (
    <div className="card">
      <img src={`/cards/${image}`} alt={card} key={key} onClick={selectCard.bind(card)} />
    </div>
  );
}

export default Card;