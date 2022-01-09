import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

export const process = async (image) => {
  await tf.ready();
  const modelJSON = require("../model/model.json");
  const modelWeights = require("../model/weights.bin");
  const model = await tf.loadLayersModel(
    bundleResourceIO(modelJSON, modelWeights)
  );

  console.log("loaded");
};
