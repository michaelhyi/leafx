import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

import TabNavigator from "./src/components/tab-navigator.js";

import Context from "./src/utils/context.js";

export default function App() {
  const [image, setImage] = useState(undefined);

  return (
    <Context.Provider value={{ image, setImage }}>
      <StatusBar style="dark" />
      <TabNavigator />
    </Context.Provider>
  );
}
