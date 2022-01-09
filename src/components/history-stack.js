import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PastScans from "../screens/past-scans.js";
import ViewScan from "../screens/view-scan.js";

const Stack = createStackNavigator();

export default function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Past Scans Screen" component={PastScans} />
      <Stack.Screen name="View Scan" component={ViewScan} />
    </Stack.Navigator>
  );
}
