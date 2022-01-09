import React, { useContext, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import Constants from "expo-constants";
import Foundation from "react-native-vector-icons/Foundation";

import Context from "../utils/context.js";

export default function ViewScan() {
  const { itemData } = useContext(Context);

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <TouchableOpacity onPress={handlePress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Foundation name="results" size={80} style={styles.scissors} />
        <Text style={styles.largeText}>{itemData.date}</Text>
        <Text style={styles.smallText}>{itemData.diagnosis.diagnosis}</Text>
        <Image style={styles.image} source={{ uri: itemData.image.uri }} />
        <OpenURLButton url={itemData.diagnosis.link}>Learn more</OpenURLButton>
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
