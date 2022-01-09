import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Context from "../utils/context";

export const clear = async () => {
  const { setImage, setTotalScans, setHealthyScans, setInfectiousScans } =
    useContext(Context);
  setImage(undefined);
  setTotalScans(0);
  setHealthyScans(0);
  setInfectiousScans(0);
  await AsyncStorage.clear();
};

export const saveScanCount = async (
  totalScans,
  healthyScans,
  infectiousScans
) => {
  await AsyncStorage.setItem(
    "@userData",
    JSON.stringify({
      totalScans: totalScans,
      healthyScans: healthyScans,
      infectiousScans: infectiousScans,
    })
  );
};

export const readUserData = async (
  setTotalScans,
  setHealthyScans,
  setInfectiousScans
) => {
  let data = await AsyncStorage.getItem("@userData");
  data = JSON.parse(data);

  if (data) {
    setTotalScans(data.totalScans);
    setHealthyScans(data.healthyScans);
    setInfectiousScans(data.infectiousScans);
  } else {
    await AsyncStorage.setItem(
      "@userData",
      JSON.stringify({
        totalScans: 0,
        healthyScans: 0,
        infectiousScans: 0,
      })
    );
  }
};

export const saveScan = async (image, diagnosis) => {
  let data = await AsyncStorage.getItem("@scans");
  data = JSON.parse(data);

  if (data) {
    await AsyncStorage.setItem(
      "@scans",
      JSON.stringify([
        ...data,
        {
          image: image,
          diagonsis: diagnosis,
          date: new Date(),
        },
      ])
    );
  } else {
    await AsyncStorage.setItem(
      "@scans",
      JSON.stringify([
        {
          image: image,
          diagonsis: diagnosis,
          date: new Date(),
        },
      ])
    );
  }
};

export const readScans = async (setData) => {
  let data = await AsyncStorage.getItem("@scans");

  if (data) {
    data = JSON.parse(data);
    data.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    setData(data);
  }
};
