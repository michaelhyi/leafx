import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Button from "../components/button.js";

import Context from "../utils/context.js";

export default function Home({ navigation }) {
  const { setImage } = useContext(Context);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
      navigation.navigate("Results");
    }
  };

  /*return (
    <View style={styles.container}>
      <Button text={"Pick an image"} onPress={pickImage} />
    </View>
  );*/
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.largeText}>HOME</Text>
      </View>
      <View style={styles.container1}>
        <TouchableOpacity style={styles.roundButton2} onPress={pickImage}>
          <MaterialIcons name="upload-file" size={100} style={styles.upload} />
          <Text style={styles.uploadText}>Select Image</Text>
        </TouchableOpacity>
      </View>
      <View
        styles={{ flexDirection: "column", justifyContent: "space-between" }}
      >
        <View>
          <View style={styles.rectangle}>
            <Text style={styles.icons}>20</Text>
            <View style={{ flexDirection: "column", flexShrink: 1 }}>
              <Text style={styles.largeText1}>Total Scans</Text>
              <Text style={styles.smallText1}>
                Your total contribution to the environment
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.rectangle1}>
            <Text style={styles.icons}>10</Text>
            <View style={{ flexDirection: "column", flexShrink: 1 }}>
              <Text style={styles.largeText1}>Infectious Plants</Text>
              <Text style={styles.smallText1}>Plants that need your help</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.rectangle1}>
            <Text style={styles.icons}>10</Text>
            <View style={{ flexDirection: "column", flexShrink: 1 }}>
              <Text style={styles.largeText1}>Healthy Plants</Text>
              <Text style={styles.smallText1}>
                Plants that take in carbondioxide and produce oxygen for you
              </Text>
            </View>
          </View>
        </View>
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
  container1: {
    justifyContent: "center",
    alignItems: "center",
  },
  largeText: {
    marginBottom: 10,
    fontSize: 26,
    fontFamily: "Avenir-Heavy",
    textAlign: "center",
  },

  roundButton2: {
    marginTop: 40,
    width: 230,
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100000,
    backgroundColor: "#7c9982",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  upload: {
    color: "#f9f8f6",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
  },
  uploadText: {
    fontSize: 26,
    fontFamily: "Avenir-Medium",
    marginTop: 10,
    color: "#f9f8f6",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
  },
  rectangle: {
    backgroundColor: "white",
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
    marginBottom: 10,
  },

  rectangle1: {
    backgroundColor: "white",
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
    marginBottom: 10,
  },

  icons: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    color: "#7c9982",
    fontSize: 45,
    fontFamily: "Avenir-Heavy",
  },

  largeText1: {
    marginTop: 15,
    fontFamily: "Avenir-Heavy",
    fontSize: 20,
    marginLeft: 20,
  },

  smallText1: {
    marginLeft: 20,
    fontFamily: "Avenir-Light",
    marginTop: 4,
    color: "#8D8D8D",
    fontSize: 15,
  },
});
