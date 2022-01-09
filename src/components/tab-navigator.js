import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import PastScans from "../screens/past-scans.js";
import HomeStack from "./home-stack.js";
import Settings from "../screens/settings.js";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
        tabBarOptions={{
          activeTintColor: "#7c9982",
        }}
      >
        <Tab.Screen
          name="Past Scans"
          component={PastScans}
          options={{
            tabBarLabel: "Past Scans",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="history" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Feather name="home" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => (
              <Feather name="settings" color={color} size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
