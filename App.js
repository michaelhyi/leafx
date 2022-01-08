import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import PastScans from "./src/screens/past-scans.js";
import Home from "./src/screens/home.js";
import Settings from "./src/screens/settings.js";

import Context from "./src/utils/context.js";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

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
          <Tab.Screen name="Past Scans" component={PastScans} options={{
            tabBarLabel: "Past Scans",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="history" color={color} size={25} />
            ),
          }}/>
          <Tab.Screen name="Home" component={Home} options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Feather name="home" color={color} size={25} />
            ),
          }}/>
          <Tab.Screen name="Settings" component={Settings} options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => (
              <Feather name="settings" color={color} size={25} />
            ),
          }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
