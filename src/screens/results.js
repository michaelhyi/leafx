import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Constants from "expo-constants";

import { saveScan } from "../functions/as.js";
import { process } from "../functions/tf.js";

import Context from "../utils/context.js";

export default function Results() {
  const { image } = useContext(Context);
  const [processing, setProcessing] = useState(true);
  const [diagnosis, setDiagnosis] = useState(undefined);

  useEffect(() => {
    process(image, setDiagnosis, setProcessing);
    // saveScan(image, diagnosis);
  }, []);

  if (processing) {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <Feather name="scissors" size={80} style={styles.scissors} />
          <Text style={styles.largeText}>Image is Processing...</Text>
          <Text style={styles.smallText}>
            Our AI is automatically analyzing your image and matching it to
            10,000 other plants.
          </Text>
          <Image style={styles.image} source={{ uri: image.uri }} />
          <ActivityIndicator style={{ marginBottom: 15 }} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image.uri }} />
      <Text>{diagnosis}</Text>
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
    margin: 20,
    borderRadius: 15,
  },
  backgroundContainer: {
    margin: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  scissors: {
    color: "#7c9982",
    marginTop: 10,
  },
  largeText: {
    marginTop: 10,
    fontFamily: "Avenir-Heavy",
    fontSize: 25,
  },
  smallText: {
    marginTop: 10,
    fontFamily: "Avenir-Heavy",
    fontSize: 15,
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
    color: "#8D8D8D",
  },
});
