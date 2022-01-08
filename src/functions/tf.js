import React from "react";
import { Dimensions } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as ImageManipulator from "expo-image-manipulator";

import { Base64Binary } from "../utils/b64.js";

const BITMAP_DIMENSION = 224;
const TENSORFLOW_CHANNEL = 3;
const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = Dimensions.get("window");

// const modelJson = require("../model/model.json");
// const modelWeights = require("../model/weights.bin");

export const cropPicture = async (imageData, maskDimension) => {
  try {
    const { uri, width, height } = imageData;
    const cropWidth = maskDimension * (width / DEVICE_WIDTH);
    const cropHeight = maskDimension * (height / DEVICE_HEIGHT);
    const actions = [
      {
        crop: {
          originX: width / 2 - cropWidth / 2,
          originY: height / 2 - cropHeight / 2,
          width: cropWidth,
          height: cropHeight,
        },
      },
      {
        resize: {
          width: BITMAP_DIMENSION,
          height: BITMAP_DIMENSION,
        },
      },
    ];
    const saveOptions = {
      compress: 1,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true,
    };
    return await ImageManipulator.manipulateAsync(uri, actions, saveOptions);
  } catch (error) {
    console.log("Could not crop & resize photo", error);
  }
};

export const getModel = async () => {
  try {
    await tf.ready();
    return await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
  } catch (error) {
    console.log("Could not load model", error);
  }
};

export const convertBase64ToTensor = async (base64) => {
  try {
    const uIntArray = Base64Binary.decode(base64);
    const decodedImage = decodeJpeg(uIntArray, 3);
    return decodedImage.reshape([
      1,
      BITMAP_DIMENSION,
      BITMAP_DIMENSION,
      TENSORFLOW_CHANNEL,
    ]);
  } catch (error) {
    console.log("Could not convert base64 string to tesor", error);
  }
};

export const startPrediction = async (model, tensor) => {
  try {
    const output = await model.predict(tensor);
    return output.dataSync();
  } catch (error) {
    console.log("Error predicting from tesor image", error);
  }
};

export const process = async (image) => {
  const croppedData = await cropPicture(image, 300);
  const model = await getModel();
  const tensor = await convertBase64ToTensor(croppedData.base64);

  const prediction = await startPrediction(model, tensor);

  const highestPrediction = prediction.indexOf(
    Math.max.apply(null, prediction)
  );

  setPresentedShape(RESULT_MAPPING[highestPrediction]);
};
