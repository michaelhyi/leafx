import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Image } from "react-native";
import Constants from "expo-constants";

import { saveScan } from "../functions/as.js";
import { process } from "../functions/tf.js";

import Context from "../utils/context.js";

export default function Results() {
  const { image } = useContext(Context);
  const [processing, setProcessing] = useState(true);
  const [diagnosis, setDiagnosis] = useState(undefined);

  useEffect(() => {
    const diagnosis = process(image);
    setDiagnosis(diagnosis);
    setProcessing(false);
    saveScan(image, diagnosis);
  }, []);

  if (processing) {
    return (
      <View style={styles.container}>
        <Text>Your image is processing</Text>
        <ActivityIndicator />
      </View>
    );
  }

  if (diagnosis == "Healthy") {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: image.uri }} />
        <Text>Your plant is healthy.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image.uri }} />
      <Text>Your plant has {diagnosis}.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingTop: Constants.statusBarHeight,
  },

  image: {
    height: 300,
    width: 300,
  },
});
