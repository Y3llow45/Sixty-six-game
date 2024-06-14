import './Card.css'

function Card({ key, image, card }) {

  function selectCard() {
    console.log(card);
  }

  return (
    <div className="card">
      <img src={`/cards/${image}`} alt={card} key={key} onClick={selectCard.bind(card)} />
      <p>{card}</p>
    </div>
  );
}

export default Card;