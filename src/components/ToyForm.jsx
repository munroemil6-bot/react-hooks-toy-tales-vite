import { useState } from "react";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [showForm, setShowForm] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name,
      image,
    };

    onAddToy(newToy);

    setName("");
    setImage("");
  }

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        Add a Toy
      </button>

      {showForm ? (
        <form className="new-toy-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a toy's name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter a toy's image URL..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

         <button type="submit">
          Create New Toy
        </button>
        </form>
      ) : null}
    </div>
  );
}

export default ToyForm;