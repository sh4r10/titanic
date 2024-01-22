import { createSignal } from "solid-js";
import "./App.css";
import { confetti } from "./confetti.js";

function App() {
  const [step, setStep] = createSignal(1);
  const [pClass, setPClass] = createSignal(3);
  const [age, setAgeSignal] = createSignal(29);
  const [fare, setFareSignal] = createSignal(32);
  const [isFemale, setIsFemale] = createSignal(1);
  const [showingResult, setShowingResult] = createSignal(false);
  const [result, setResult] = createSignal(
    "Would you have survived the titanic? Let the data decide!",
  );

  const setClass = (e) => {
    setPClass(e.target.value);
  };

  const setAge = (e) => {
    if (e.target.value <= 0) return setAgeSignal(1);
    if (e.target.value >= 100) return setAgeSignal(100);
    setAgeSignal(e.target.value);
  };

  const setFare = (e) => {
    if (e.target.value < 0) return setAgeSignal(0);
    if (e.target.value >= 513) return setAgeSignal(513);
    setFareSignal(e.target.value);
  };

  const getPrediction = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pclass: pClass(),
        age: age(),
        fare: fare(),
        is_female: isFemale(),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.survive) {
          setResult("Congratulations! You would have survived");
          confetti();
          document.getElementById("myVideo").src = "/king.mp4";
        } else {
          setResult("Unfortunately you would have died an icy death");
          document.getElementById("myVideo").src = "/letgo.mp4";
        }
        setShowingResult(true);
      })
      .catch(console.log);
  };

  const reset = () => {
    setStep(1);
    setPClass(3);
    setFareSignal(32);
    setAgeSignal(29);
    setIsFemale(1);
    setResult("Would you have survived the titanic? Let the data decide!");
    setShowingResult(false);
    document.getElementById("myVideo").src = "/titanic.mp4";
    const confettis = document.getElementsByClassName("confetti");
    for (let div of confettis) {
      div.remove();
    }
  };

  return (
    <>
      <div class="overlay"></div>
      <video autoplay muted={true} loop id="myVideo">
        <source src="/titanic.mp4" type="video/mp4" />
      </video>
      <h1>{result}</h1>
      <Show when={step() == 1}>
        <div class="container center">
          <h2>What passenger class are you travelling in? </h2>
          <div>
            <input
              checked={pClass() == 1}
              onChange={setClass}
              type="radio"
              id="first"
              name="class"
              value="1"
            />
            <label for="first">1st Class</label>
          </div>
          <div>
            <input
              checked={pClass() == 2}
              onChange={setClass}
              type="radio"
              id="second"
              name="class"
              value="2"
            />
            <label for="second">2nd Class</label>
          </div>
          <div>
            <input
              checked={pClass() == 3}
              onChange={setClass}
              type="radio"
              id="third"
              name="class"
              value="3"
            />
            <label for="third">3rd Class</label>
          </div>
        </div>
      </Show>
      <Show when={step() == 2}>
        <div class="container center">
          <h2>How old are you? </h2>
          <input
            class="number-input"
            type="number"
            min="1"
            max="100"
            value={age()}
            onChange={setAge}
          />
        </div>
      </Show>
      <Show when={step() == 3}>
        <div class="container center">
          <h2>How much did you pay in fare (USD)?</h2>
          <h3>${fare()}</h3>
          <input
            class="range-slider"
            type="range"
            min="0"
            max="513"
            value={fare()}
            onInput={setFare}
            step="0.5"
          />
        </div>
      </Show>
      <Show when={step() == 4}>
        <div class="container center">
          <h2>You are a: </h2>
          <div>
            <input
              type="radio"
              id="male"
              checked={!isFemale()}
              onChange={() => setIsFemale(0)}
            />
            <label for="male">A male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              checked={isFemale()}
              onChange={() => setIsFemale(1)}
            />
            <label for="female">A female</label>
          </div>
        </div>
      </Show>
      <div class="btn-container">
        <button
          disabled={step() == 1}
          class="btn"
          onClick={() => (step() > 1 ? setStep(step() - 1) : step())}
        >
          Previous
        </button>

        <Show when={step() != 4}>
          <button
            class="btn"
            onClick={() => (step() < 4 ? setStep(step() + 1) : step())}
          >
            Next
          </button>
        </Show>
        <Show when={step() == 4 && !showingResult()}>
          <button
            id="prediction"
            class="btn prediction"
            onClick={getPrediction}
          >
            Predict!
          </button>
        </Show>
        <Show when={step() == 4 && showingResult()}>
          <button class="btn prediction" onClick={reset}>
            Try Again!
          </button>
        </Show>
      </div>
    </>
  );
}

export default App;
