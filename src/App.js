import React, { useState } from "react";
import "./App.css";
import {
  getRandomGlagolCardData,
  getRandomNumberCardData,
  getRandomSymbolCardData,
  getRandomWordCardData,
} from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [dataFunctions, setDataFunctions] = useState({
    glagoli: getRandomGlagolCardData,
    brojevi: getRandomNumberCardData,
    oznake: getRandomSymbolCardData,
    reci: getRandomWordCardData,
  });

  const [checkboxStates, setCheckboxStates] = useState({
    glagoli: true,
    brojevi: true,
    oznake: true,
    reci: true,
  });

  // FILTRIRA FUNKCIJE TAKO DA NE BIRA ONE KOJE NISU CEKIRANE
  const dataFunctionsArray = Object.keys(dataFunctions)
    .filter((key) => checkboxStates[key])
    .map((key) => dataFunctions[key]);

  const randomFunction =
    dataFunctionsArray[Math.floor(Math.random() * dataFunctionsArray.length)];

  const [cardData, setCardData] = useState(randomFunction());
  const [isFading, setIsFading] = useState(false);

  const handleClick = () => {
    setIsFading(true);
    setTimeout(() => {
      const newCardData = randomFunction();
      setCardData(newCardData);
      setIsFading(false);
    }, 300);
  };

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    const checkedCount = Object.values(checkboxStates).filter(Boolean).length;
    if (!checked && checkedCount === 1) {
      return;
    }

    setCheckboxStates({
      ...checkboxStates,
      [event.target.name]: event.target.checked,
    });
  };

  const settingsPanel = Object.keys(dataFunctions).map((key) => (
    <div className="settings-panel-item" key={key}>
      <input
        type="checkbox"
        id={key}
        name={key}
        checked={checkboxStates[key]}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={key}>{key}</label>
    </div>
  ));

  return (
    <div className="app">
      <div className="settings">
        <FontAwesomeIcon icon={faGear} />
      </div>
      <div className="settings-panel">{settingsPanel}</div>
      <div className="cards">
        {/* <div className="minus" onClick={handleClick}>
          N
        </div> */}
        <div className={`flip-card ${isFading ? "fade" : ""}`}>
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <h1>{cardData.pitanje}</h1>
            </div>
            <div class="flip-card-back">
              <h1>{cardData.odgovor}</h1>
            </div>
          </div>
        </div>
        <div className="plus" onClick={handleClick}>
          Y
        </div>
      </div>
    </div>
  );
}

export default App;
