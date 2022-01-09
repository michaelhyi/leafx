import AsyncStorage from "@react-native-async-storage/async-storage";

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
