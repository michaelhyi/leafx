import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
import Constants from "expo-constants";
import { format, parseISO } from "date-fns";

import { readScans } from "../functions/as.js";

const Item = ({ uri, date, diagnosis }) => (
  <View style={styles.item}>
    <Image style={styles.image} source={{ uri: uri }} />
    <View style={styles.text}>
      <Text>{format(parseISO(date), "MM/dd/yyyy p")}</Text>
      <Text>Diagnosis: {diagnosis}</Text>
    </View>
  </View>
);

export default function PastScans() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    readScans(setData);
  });

  const renderItem = ({ item }) => (
    <Item uri={item.image.uri} date={item.date} diagnosis={item.diagnosis} />
  );

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.largeText}>PAST SCANS</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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

  item: {
    flexDirection: "row",
  },

  image: {
    height: 100,
    width: 100,
  },

  text: {
    flexDirection: "column",
  },
});
