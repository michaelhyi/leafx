import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";

import { readScans } from "../functions/as.js";

export default function PastScans() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    readScans(setData);
  });

  return (
    <View style={styles.container}>
      <Text>Past Scans Screen</Text>
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
});
