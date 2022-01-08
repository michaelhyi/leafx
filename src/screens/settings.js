import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";

export default function Settings() {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.largeText}>SETTINGS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  largeText: {
    marginBottom: 10,
    fontSize: 26,
    fontFamily: "Avenir-Heavy",
    textAlign: "center",
  },
});
