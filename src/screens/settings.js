import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import Constants from "expo-constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { clear } from "../functions/as.js";

export default function Settings() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.largeText}>SETTINGS</Text>
      </View>
      <View style={styles.background}>
        <FontAwesome5 name="memory" size={45} style={styles.memory} />
        <Text style={styles.categoryTitle}>MEMORY</Text>
      </View>
      <View style={styles.selectionContainerRow}>
        <Text style={styles.selectionContainerText}>Delete All Data</Text>
        <Button
          mode="contained"
          color="#DF4F97"
          style={styles.settingsButton}
          onPress={clear}
        >
          Delete All Data
        </Button>
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
  categoryTitle: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Avenir-Light",
    marginBottom: 5,
  },
  memory: {
    marginTop: 5,
    textAlign: "center",
    color: "#7c9982",
  },
  background: {
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: "white",
    marginLeft: 25,
    marginRight: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  selectionContainer: {
    backgroundColor: "#E5E5E5",
    marginLeft: 23,
    marginRight: 23,
    flexDirection: "column",
    marginTop: 10,
  },

  selectionContainerRow: {
    backgroundColor: "#E5E5E5",
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },

  selectionContainerText: {
    fontFamily: "Avenir-Light",
    fontSize: 18,
    marginLeft: 13,
    marginTop: 10,
    marginBottom: 10,
  },
  settingsButton: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "white",
  },
});
