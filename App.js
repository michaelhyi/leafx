import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import TabNavigator from "./src/components/tab-navigator.js";

import { readUserData } from "./src/functions/as.js";

import Context from "./src/utils/context.js";

export default function App() {
  const [image, setImage] = useState(undefined);
  const [totalScans, setTotalScans] = useState(0);
  const [healthyScans, setHealthyScans] = useState(0);
  const [infectiousScans, setInfectiousScans] = useState(0);
  const [itemData, setItemData] = useState(undefined);

  useEffect(() => {
    readUserData(setTotalScans, setHealthyScans, setInfectiousScans);
  }, []);

  return (
    <Context.Provider
      value={{
        image,
        setImage,
        totalScans,
        setTotalScans,
        healthyScans,
        setHealthyScans,
        infectiousScans,
        setInfectiousScans,
        itemData,
        setItemData,
      }}
    >
      <StatusBar style="dark" />
      <TabNavigator />
    </Context.Provider>
  );
}
