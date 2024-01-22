import { createSignal } from "solid-js";

function App() {
  const [step, setStep] = createSignal(1);
  const [pClass, setPClass] = createSignal(3);
  const [age, setAgeSignal] = createSignal(29);
  const [fare, setFareSignal] = createSignal(32);
  const [isFemale, setIsFemale] = createSignal(1);

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
      .then(console.log)
      .catch(console.log);
  };

  return (
    <>
      <Show when={step() == 1}>
        <p>What passenger class are you travelling in? </p>
        <input
          checked={pClass() == 1}
          onChange={setClass}
          type="radio"
          id="first"
          name="class"
          value="1"
        />
        <label for="first">1st Class</label>
        <br />
        <input
          checked={pClass() == 2}
          onChange={setClass}
          type="radio"
          id="second"
          name="class"
          value="2"
        />
        <label for="second">2nd Class</label>
        <br />
        <input
          checked={pClass() == 3}
          onChange={setClass}
          type="radio"
          id="third"
          name="class"
          value="3"
        />
        <label for="third">3rd Class</label>
      </Show>
      <Show when={step() == 2}>
        <div>
          <p>How old are you? </p>
          <input
            type="number"
            min="1"
            max="100"
            value={age()}
            onChange={setAge}
          />
        </div>
      </Show>
      <Show when={step() == 3}>
        <p>How much did you pay in fare?</p>
        <input
          type="number"
          min="0"
          max="513"
          value={fare()}
          onChange={setFare}
        />
        <br />
        <input
          type="range"
          min="0"
          max="520"
          value={fare()}
          onChange={setFare}
        />
      </Show>
      <Show when={step() == 4}>
        <div>
          <p>You are a: </p>
          <label for="male">A male</label>
          <input
            type="radio"
            id="male"
            checked={!isFemale()}
            onChange={() => setIsFemale(0)}
          />
          <label for="female">A female</label>
          <input
            type="radio"
            id="female"
            checked={isFemale()}
            onChange={() => setIsFemale(1)}
          />
        </div>
      </Show>
      <br />
      <button
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
      <Show when={step() == 4}>
        <button class="btn" onClick={getPrediction}>
          Get Prediction!
        </button>
      </Show>
    </>
  );
}

export default App;
