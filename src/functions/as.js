import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

export const clear = async (
  setImage,
  setTotalScans,
  setHealthyScans,
  setInfectiousScans,
  setData
) => {
  Alert.alert(
    "Delete all Data",
    "Are you sure that you want to delete ALL data within this app? This action CANNOT be undone.",
    [
      {
        text: "Yes",
        onPress: () => {
          AsyncStorage.clear().then(() => {
            setImage(undefined);
            setTotalScans(0);
            setHealthyScans(0);
            setInfectiousScans(0);
            setData(undefined);
            Alert.alert(
              "Success",
              "Successfully deleted all data within this app!"
            );
          });
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]
  );
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

export const saveScan = async (image, diagnosis, status, setData) => {
  let scans = await AsyncStorage.getItem("@scans");

  if (scans) {
    scans = JSON.parse(scans);
    await AsyncStorage.setItem(
      "@scans",
      JSON.stringify([
        {
          image: image,
          diagnosis: diagnosis,
          date: format(new Date(), "MM/dd/yyyy p"),
          status: status,
        },
        ...scans,
      ])
    );
    setData([
      {
        image: image,
        diagnosis: diagnosis,
        date: format(new Date(), "MM/dd/yyyy p"),
        status: status,
      },
      ...scans,
    ]);
  } else {
    await AsyncStorage.setItem(
      "@scans",
      JSON.stringify([
        {
          image: image,
          diagnosis: diagnosis,
          date: format(new Date(), "MM/dd/yyyy p"),
          status: status,
        },
      ])
    );
    setData([
      {
        image: image,
        diagnosis: diagnosis,
        date: format(new Date(), "MM/dd/yyyy p"),
        status: status,
      },
    ]);
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
