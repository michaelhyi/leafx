import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Foundation from "react-native-vector-icons/Foundation";
import Constants from "expo-constants";

import { saveScan, saveScanCount } from "../functions/as.js";
import { process } from "../functions/tf.js";

import Context from "../utils/context.js";

export default function Results({ navigation }) {
  const {
    image,
    totalScans,
    setTotalScans,
    healthyScans,
    setHealthyScans,
    infectiousScans,
    setInfectiousScans,
    data,
    setData,
  } = useContext(Context);
  const [processing, setProcessing] = useState(true);
  const [diagnosis, setDiagnosis] = useState(undefined);

  useEffect(() => {
    process(image, setDiagnosis, setProcessing);
  }, []);

  useEffect(() => {
    if (diagnosis) {
      if (diagnosis.diagnosis == "Your plant is healthy.") {
        setTotalScans(totalScans + 1);
        setHealthyScans(healthyScans + 1);
        saveScanCount(totalScans + 1, healthyScans + 1, infectiousScans);
        saveScan(image, diagnosis, "Healthy", setData);
      } else {
        setTotalScans(totalScans + 1);
        setInfectiousScans(infectiousScans + 1);
        saveScanCount(totalScans + 1, healthyScans, infectiousScans + 1);
        saveScan(image, diagnosis, "Infected", setData);
      }
    }
  }, [diagnosis]);

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
        <Text style={styles.largeText}>Results are In</Text>
        <Text style={styles.smallText}>{diagnosis.diagnosis}</Text>
        <Image style={styles.image} source={{ uri: image.uri }} />
        {diagnosis.link.length > 0 && (
          <OpenURLButton url={diagnosis.link}>Learn more</OpenURLButton>
        )}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={50} style={styles.exitButton} />
        </TouchableOpacity>
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

  image: {
    height: 256,
    width: 256,
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
  exitButton: {
    color: "#7c9982",
    marginBottom: 10,
  },
});
