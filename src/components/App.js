import React, {useState, useEffect} from "react";
import DogBar from './DogBar';
import DogDetails from "./DogDetails";

function App() {

  const [dogs, setDogs] = useState([])
  const [showDog, setShowDog] = useState(null)
  const [isFiltered, setisFiltered] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3001/pups')
    .then(res => res.json())
    .then(data => setDogs(data))
  }, [])

  function handleShowDog(dogObj) {
    setShowDog(dogObj)
  }

  function handleToggleGoodness(dogObj, state) {
    console.log(dogObj)
    fetch(`http://localhost:3001/pups/${dogObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: !state
      })
    })
    .then(res => res.json())
    .then(data => {
      const newArray = dogs.map(dog => {
        if (data.id === dog.id) {
          return data
        } else {
          return dog
        }
      })
      setDogs(newArray)
    })
  }

  function handleClick() {
    setisFiltered(!isFiltered)
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button onClick={handleClick} id="good-dog-filter">Filter good dogs: {isFiltered ? "ON" : "OFF"}</button>
      </div>
      <div id="dog-bar">
        <DogBar isFiltered={isFiltered} handleShowDog={handleShowDog} dogs={dogs} />
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {showDog ? <DogDetails onToggleGoodness={handleToggleGoodness} dogObj={showDog} /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
