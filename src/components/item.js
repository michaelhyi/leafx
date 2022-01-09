import React from "react";
import { format, parseISO } from "date-fns";
import { StyleSheet, View, Image, Text } from "react-native";

export default function Item({ uri, date, diagnosis }) {
  return (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: uri }} />
      <View style={styles.text}>
        <Text style={styles.largeText}>{format(parseISO(date), "MM/dd/yyyy p")}</Text>
        <Text style={styles.smallText}>Diagnosis: {diagnosis}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 25,
    marginVertical: 0,
    padding: 15,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 5,
  },

  text: {
    flexDirection: "column",
  },
  largeText: {
    marginLeft: 10,
    fontFamily: "Avenir-Heavy",
    fontSize: 20,
    color: "#7c9982",
  },
  smallText: {
    marginLeft: 10,
    fontFamily: "Avenir-Light",
    fontSize: 15,
    color: "#8D8D8D",
  },
});
