import React, { useState, useEffect, useRef } from "react";

const CountryCapitalGame = ({ data }) => {
  const initialDataRef = useRef(Object.entries(data));
  const [gameData, setGameData] = useState({});
  const [message, setMessage] = useState("");

  const [currentGameState, setCurrentGameState] = useState({
    country: "",
    capital: "",
    sameCountry: "",
    sameCapital: "",
    wrongPair: false,
  });

  /*   useEffect(() => {
    console.log(currentGameState);
  }, [currentGameState]); */

  const updateGameState = (values) => {
    setCurrentGameState((prev) => ({
      ...prev,
      ...values,
    }));
  };

  useEffect(() => {
    randomizeCountries(data);
  }, []);

  const randomizeCountries = (values) => {
    // randomize the keys and values
    const randomizeObjectKeys = Object.keys(values).sort(
      () => Math.random() - 0.5
    );
    const randomizeObjectValues = Object.values(values).sort(
      () => Math.random() - 0.5
    );
    const arrOfObjects = randomizeObjectKeys.map((ele, index) => ({
      [ele]: randomizeObjectValues[index],
    }));
    // what is done here is that we are creating an object with the keys and values
    // and then we are merging them into one object
    const newData = Object.assign({}, ...arrOfObjects);
    // set the entries to the new object
    setGameData(Object.entries(newData));
  };

  const getCorrectPair_ = (val1, val2) => {
    let filter = [];
    if (val1) {
      //  if val1 is not undefined
      // then filter the data based on the country
      filter = initialDataRef.current.filter(
        ([key, _]) => key.toLowerCase() === val1.toLowerCase()
      );
    } else {
      // if val2 is not undefined
      // then filter the data based on the capital
      filter = initialDataRef.current.filter(
        ([_, val]) => val.toLowerCase() === val2.toLowerCase()
      );
    }
    // find the first element that is not undefined
    const find = filter.find((d) => d);
    return find;
  };

  const add = (val1, val2) => {
    // if the country is not selected
    // then set the country

    if (!currentGameState.country && val1) {
      updateGameState({ country: val1 });
    } else if (!currentGameState.capital && val2) {
      // if the capital is not selected
      // then set the capital
      updateGameState({ capital: val2 });
    } else if (
      // if the country is selected and the capital is selected
      // then check if the country is the same as the capital
      // if it is then set the duplicate country
      currentGameState.country &&
      val1 &&
      !currentGameState.sameCountry
    ) {
      updateGameState({ sameCountry: val1 });
    } else if (
      // if the country is selected and the capital is selected
      // then check if the country is the same as the capital
      // if it is then set the duplicate capital
      currentGameState.capital &&
      val2 &&
      !currentGameState.sameCapital
    ) {
      updateGameState({ sameCapital: val2 });
    } else if (currentGameState.wrongPair) {
      // if the wrong value is selected
      // then reset the state
      updateGameState({
        country: "",
        capital: "",
        sameCapital: "",
        sameCountry: "",
        wrongPair: false,
      });
    }
    updateGameState({ wrongPair: false });
    check(val1, val2);
  };

  const check = (val1, val2) => {
    const selectedCountry = currentGameState.country
      ? currentGameState.country
      : val1;
    const selectedCapital = currentGameState.capital
      ? currentGameState.capital
      : val2;
    // get the correct pair
    const correctPair = getCorrectPair_(val1, val2);
    if (
      !currentGameState.wrongPair &&
      correctPair[0]?.toLowerCase() === selectedCountry?.toLowerCase() &&
      correctPair[1]?.toLowerCase() === selectedCapital?.toLowerCase()
    ) {
      const removeSelected = initialDataRef.current.filter(
        ([key, _]) => key.toLowerCase() !== selectedCountry.toLowerCase()
      );
      updateGameState({
        country: "",
        capital: "",
        correctPair: [],
        wrongPair: false,
      });
      initialDataRef.current = removeSelected;
      randomizeCountries(Object.fromEntries(removeSelected));
    } else if (currentGameState.wrongPair && val1) {
      updateGameState({ country: val1, capital: "", wrongPair: false });
    } else if (currentGameState.wrongPair && val2) {
      updateGameState({ capital: val2, country: "", wrongPair: false });
    } else if (currentGameState.country || currentGameState.capital) {
      updateGameState({ wrongPair: true });
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (gameData.length === 0) {
      setMessage("Congratulations!");
    } else {
      setMessage("");
    }
  }, [gameData]);

  return (
    <div>
      <h1>Country Capitals Game</h1>
      {gameData.length ? (
        gameData.map(([key, val], i) => (
          <div key={i + 1}>
            <button
              style={{
                margin: "5px",
                backgroundColor:
                  currentGameState.country.toLowerCase() ===
                    key.toLowerCase() && !currentGameState.wrongPair
                    ? "#0000ff"
                    : (currentGameState.country.toLowerCase() ===
                        key.toLowerCase() ||
                        currentGameState.sameCountry.toLowerCase() ===
                          key.toLowerCase()) &&
                      currentGameState.wrongPair
                    ? "#FF0000"
                    : "",
              }}
              onClick={() => add(key, null)}
            >
              {key}
            </button>
            <button
              style={
                currentGameState.capital === val && !currentGameState.wrongPair
                  ? { backgroundColor: "#0000ff" }
                  : (currentGameState.capital.toLowerCase() ===
                      val.toLowerCase() ||
                      currentGameState.sameCapital.toLowerCase() ===
                        val.toLowerCase()) &&
                    currentGameState.wrongPair
                  ? { backgroundColor: "#FF0000" }
                  : {}
              }
              onClick={() => add(null, val)}
            >
              {val}
            </button>
          </div>
        ))
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default CountryCapitalGame;
