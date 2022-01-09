import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import Constants from "expo-constants";

import Item from "../components/item.js";

import { readScans } from "../functions/as.js";

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
            style={styles.flatlist}
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
      width: 1,
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
  flatlist: {
    marginTop: 5,
  },
});
