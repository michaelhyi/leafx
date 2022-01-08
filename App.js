import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import PastScans from "./src/screens/past-scans.js";
import Home from "./src/screens/home.js";
import Settings from "./src/screens/settings.js";

import Context from "./src/utils/context.js";

const Tab = createBottomTabNavigator();

export default function App() {
  const [image, setImage] = useState(undefined);

  return (
    <Context.Provider value={{ image, setImage }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="Past Scans" component={PastScans} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
