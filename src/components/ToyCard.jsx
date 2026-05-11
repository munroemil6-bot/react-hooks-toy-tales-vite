function ToyCard({ toy, onDeleteToy, onLikeToy }) {
  const { id, name, image, likes } = toy;

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>

      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />

     <p>{likes} Likes </p>

      <button onClick={() => onLikeToy(id)}>
        Like {"<3"}
      </button>

      <button onClick={() => onDeleteToy(id)}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;