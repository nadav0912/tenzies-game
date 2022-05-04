import React from "react";
import "./style.css";
import Die from "./components/Die";
import Timer from "./components/Timer";
import BestTime from "./components/BestTime";

function App() {
  const [dice, setDice] = React.useState(getStartedDice());

  const [endGame, setEndGame] = React.useState(false);

  const [time, setTime] = React.useState(getStartedTime());

  const [fastestTime, setFastestTime] = React.useState(() => {
    return (
      JSON.parse(localStorage.getItem("fastestTime")) || {
        minutes: 0,
        seconds: 0,
      }
    );
  });

  // update fastestTime in localStorage
  React.useEffect(() => {
    localStorage.setItem("fastestTime", JSON.stringify(fastestTime));
  }, [fastestTime]);

  // check win
  React.useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld);
    const allSameValue = dice.every((die) => die.value === dice[0].value);

    if (allDiceHeld && allSameValue) {
      setEndGame(true);
      setTime((prevTime) => ({ ...prevTime, isRuning: false }));
      updateFastestTime();
    }
  }, [dice]);

  // start/stop timer
  React.useEffect(() => {
    let timerInterval;
    if (time.isRuning) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => ({
          ...prevTime,
          minutes:
            prevTime.seconds === 60 ? prevTime.minutes + 1 : prevTime.minutes,
          seconds: prevTime.seconds === 60 ? 0 : prevTime.seconds + 1,
        }));
      }, 1000);
    } else clearInterval(timerInterval);

    return () => clearInterval(timerInterval);
  }, [time.isRuning]);

  function getStartedTime() {
    return {
      minutes: 0,
      seconds: 0,
      isRuning: false,
    };
  }

  function getStartedDice() {
    const array = [];
    for (let i = 0; i < 10; i++)
      array.push({ id: i, value: getRandomNumber(), isHeld: false });
    return array;
  }

  function updateFastestTime() {
    const improveFastestTime =
      time.minutes < fastestTime.minutes ||
      (time.minutes === fastestTime.minutes &&
        time.seconds < fastestTime.seconds);

    const notHaveFastestTime =
      fastestTime.minutes === 0 && fastestTime.seconds === 0;

    if (improveFastestTime || notHaveFastestTime)
      setFastestTime({
        minutes: time.minutes,
        seconds: time.seconds,
      });
  }

  function rollDice() {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.isHeld ? die : { ...die, value: getRandomNumber() };
      });
    });
  }

  function toggleIsHeld(dieId) {
    if (!endGame) {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return die.id == dieId ? { ...die, isHeld: !die.isHeld } : die;
        });
      });

      // when first die get held start run timer
      if (!time.isRuning)
        setTime((prevTime) => ({ ...prevTime, isRuning: true }));
    }
  }

  function resetGame() {
    setDice(getStartedDice());
    setEndGame(false);
    setTime(getStartedTime());
  }

  function getRandomNumber() {
    return Math.ceil(Math.random() * 6);
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      toggleIsHeld={() => toggleIsHeld(die.id)}
    />
  ));

  return (
    <div className="App">
      <main>
        <Timer minutes={time.minutes} seconds={time.seconds} />
        <h1 className="title">Tenzies</h1>
        <p className="description">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button
          className="btn-roll-dice"
          onClick={endGame ? resetGame : rollDice}
        >
          {endGame ? "Play Again" : "Roll"}
        </button>
        <BestTime seconds={fastestTime.seconds} minutes={fastestTime.minutes} />
      </main>
    </div>
  );
}

export default App;
