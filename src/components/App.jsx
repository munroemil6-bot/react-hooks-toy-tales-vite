import { useState, useEffect } from "react";
import ToyContainer from "./ToyContainer";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  function handleAddToy(newToyData) {
    const toyToSend = {
      ...newToyData,
      likes: 0,
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toyToSend),
    })
      .then((res) => res.json())
      .then((newToy) => {
        setToys([...toys, newToy]);
      });
  }

  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedToys = toys.filter((toy) => toy.id !== id);
      setToys(updatedToys);
    });
  }

  function handleLikeToy(id) {
    const toyToUpdate = toys.find((toy) => toy.id === id);

    const updatedToy = {
      ...toyToUpdate,
      likes: toyToUpdate.likes + 1,
    };

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatedToy.likes,
      }),
    })
      .then((res) => res.json())
      .then((returnedToy) => {
        const updatedToys = toys.map((toy) =>
          toy.id === id ? returnedToy : toy
        );

        setToys(updatedToys);
      });
  }

  return (
    <div className="App">
      <ToyForm onAddToy={handleAddToy} />

      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onLikeToy={handleLikeToy}
      />
    </div>
  );
}

export default App;