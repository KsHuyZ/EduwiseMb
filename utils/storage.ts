import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorage = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  try {
    return JSON.parse(value!);
  } catch (error) {
    return value;
  }
};
export const setStorage = (key: string, value: unknown) => {
  return AsyncStorage.setItem(key, JSON.stringify(value));
};
export const removeStorage = (key: string) => {
  return AsyncStorage.removeItem(key);
};

export const clearStorage = () => {
  return AsyncStorage.clear();
};
