import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveScan = async (image, diagnosis) => {
  const pastScans = await AsyncStorage.getItem("@scans");
  const parsedPastScans = JSON.parse(pastScans);

  if (parsedPastScans) {
    await AsyncStorage.setItem(
      "@scans",
      JSON.stringify([
        ...parsedPastScans,
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
  const pastScans = await AsyncStorage.getItem("@scans");
  if (scans) setData(JSON.parse(pastScans));
};
