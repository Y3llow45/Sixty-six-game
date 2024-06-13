function Card({ key, image, card }) {
  return (
    <div>
      {console.log(image)}
      <img src={`/cards/${image}`} alt={card} key={key} />
      <p>{card}</p>
    </div>
  );
}

export default Card;