import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Image } from "react-native";
import Constants from "expo-constants";

import Context from "../utils/context.js";

export default function Results() {
  const { image } = useContext(Context);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    console.log(image);
  }, []);

  if (processing) {
    return (
      <View style={styles.container}>
        <Text>Your image is processing</Text>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image.uri }} />
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
