import client from "./client.js";

const TIMEOUT = 5000;

const getPrediction = (input) => {
  const expectedProps = ["pclass", "age", "fare", "is_female"];
  const promise = new Promise((resolve, reject) => {
    if (!expectedProps.every((prop) => Object.keys(input).includes(prop))) {
      reject("All expected properties not found");
    }
    input.female = input.is_female ? 1 : 0;
    delete input.is_female;
    console.log(input);

    client.predict(input, { deadline: Date.now() + TIMEOUT }, (err, res) => {
      if (err) reject("an error occurred with grpc");
      else resolve(res.survive ? res : { survive: false });
    });
  });

  return promise;
};

export default getPrediction;
