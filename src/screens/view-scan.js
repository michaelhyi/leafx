import React, { useContext } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Constants from "expo-constants";
import Foundation from "react-native-vector-icons/Foundation";

import Context from "../utils/context.js";

export default function ViewScan() {
  const { itemData } = useContext(Context);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Foundation name="results" size={80} style={styles.scissors} />
        <Text style={styles.largeText}>Results are In</Text>
        <Text style={styles.smallText}>{itemData.diagnosis}</Text>
        <Image style={styles.image} source={{ uri: itemData.image.uri }} />
      </View>
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
  backgroundContainer: {
    margin: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
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
  scissors: {
    color: "#7c9982",
    marginTop: 10,
  },

  image: {
    height: 256,
    width: 256,
    margin: 20,
    borderRadius: 15,
  },
});
