import React from "react";
import { format, parseISO } from "date-fns";
import { StyleSheet, View, Image, Text } from "react-native";

export default function Item({ uri, date, diagnosis }) {
  return (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: uri }} />
      <View style={styles.text}>
        <Text>{format(parseISO(date), "MM/dd/yyyy p")}</Text>
        <Text>Diagnosis: {diagnosis}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    backgroundColor: "#A6B07E",
    borderRadius: 20,
    marginHorizontal: 25,
    marginVertical: 7.5,
    padding: 15,
  },

  image: {
    height: 100,
    width: 100,
  },

  text: {
    flexDirection: "column",
    marginLeft: 5,
    marginTop: 5,
  },
});
