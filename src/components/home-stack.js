import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/home.js";
import Results from "../screens/results.js";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  );
}
