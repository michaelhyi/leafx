import React, { useContext } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import Constants from "expo-constants";

import Item from "../components/item.js";

import Context from "../utils/context.js";

export default function PastScans({ navigation }) {
  const { data, setItemData } = useContext(Context);

  const renderItem = ({ item }) => (
    <Item
      onPress={() => {
        setItemData(item);
        navigation.navigate("View Scan");
      }}
      uri={item.image.uri}
      date={item.date}
      status={item.status}
    />
  );

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.largeText}>PAST SCANS</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return item.id;
        }}
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
