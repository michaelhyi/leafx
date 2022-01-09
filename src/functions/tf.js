import { useEffect } from "react-native";
import { Dimensions } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import { Base64Binary } from "../utils/b64.js";

const BITMAP_DIMENSION = 224;
const TENSORFLOW_CHANNEL = 3;
const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = Dimensions.get("window");
const results = [
  {
    diagnosis: "Your plant has apple scab.",
    link: "https://en.wikipedia.org/wiki/Apple_scab",
  },
  {
    diagnosis: "Your plant has cedar apple rust.",
    link: "https://en.wikipedia.org/wiki/Gymnosporangium_juniperi-virginianae",
  },
  { diagnosis: "Your plant is healthy.", link: "" },
  {
    diagnosis: "Your plant has common rust.",
    link: "https://en.wikipedia.org/wiki/Puccinia_sorghi",
  },
  { diagnosis: "Your plant is healthy.", link: "" },
  {
    diagnosis: "Your plant has early blight.",
    link: "https://en.wikipedia.org/wiki/Alternaria_solani",
  },
  { diagnosis: "Your plant is healthy.", link: "" },
  {
    diagnosis: "Your plant has early blight.",
    link: "https://en.wikipedia.org/wiki/Alternaria_solani",
  },
  { diagnosis: "Your plant is healthy.", link: "" },
  {
    diagnosis: "Your plant has tomato yellow leaf curl virus.",
    link: "https://en.wikipedia.org/wiki/Tomato_yellow_leaf_curl_virus",
  },
];

const crop = async (imageData, maskDimension) => {
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
};

const convertToTensor = async (base64) => {
  const uIntArray = Base64Binary.decode(base64);
  const decodedImage = decodeJpeg(uIntArray, 3);
  return decodedImage.reshape([
    1,
    BITMAP_DIMENSION,
    BITMAP_DIMENSION,
    TENSORFLOW_CHANNEL,
  ]);
};

const predict = async (model, tensor) => {
  const output = await model.predict(tensor);
  return output.dataSync();
};

export const process = async (image, setDiagnosis, setProcessing) => {
  const croppedData = await crop(image, 300);

  await tf.ready();
  const modelJSON = require("../model/model.json");
  const modelWeights = require("../model/weights.bin");
  const model = await tf.loadLayersModel(
    bundleResourceIO(modelJSON, modelWeights)
  );

  const tensor = await convertToTensor(croppedData.base64);

  const prediction = await predict(model, tensor);

  const highestPrediction = prediction.indexOf(
    Math.max.apply(null, prediction)
  );

  setDiagnosis(results[highestPrediction]);
  setProcessing(false);
};
