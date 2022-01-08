import * as tf from "@tensorflow/tfjs";

const convertToTensor = async (rawData) => {
  const { width, height, data } = jpeg.decode(rawData, true);
  const buffer = new Uint8Array(width * height * 3);
  let offset = 0;
  for (let i = 0; i < buffer.length; i += 3) {
    buffer[i] = data[offset];
    buffer[i + 1] = data[offset + 1];
    buffer[i + 2] = data[offset + 2];
    offset += 4;
  }

  return tf.tensor3d(buffer, [height, width, 3]);
};

const predict = async (model, tensor) => {
  const output = await model.predict(tensor);
  return output.dataSync();
};

const results = [
  "Your plant has apple scab.",
  "Your plant has apple cedar rust.",
  "Your plant is healthy.",
  "Your plant has common rust.",
  "Your plant is healthy.",
  "Your plant has early blight.",
  "Your plant is healthy.",
  "Your plant has early blight.",
  "Your plant is healthy.",
  "Your plant has yellow leaf curl virus.",
];

export const process = async (image, setDiagnosis) => {
  await tf.ready();
  const model = await tf.loadLayersModel("../model/model.json");
  console.log("model loaded.");
  // const model = await tf.loadLayersModel(
  //   "https://teachablemachine.withgoogle.com/models/DE1r2gaAH/"
  // );

  const response = await fetch(image.uri, {}, { isBinary: true });
  const imageData = await response.arrayBuffer();
  const tensor = await convertToTensor(imageData);

  const prediction = await predict(model, tensor);

  const highestPrediction = prediction.indexOf(
    Math.max.apply(null, prediction)
  );

  setDiagnosis(results[highestPrediction]);
  setProcessing(false);
};
