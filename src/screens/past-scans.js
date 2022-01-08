import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
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
    <View style={styles.container}>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingTop: Constants.statusBarHeight,
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
