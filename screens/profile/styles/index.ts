import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: { flex: 1, paddingTop: 80 },
  container: {
    position: "relative",
  },
  avatar: { width: 90, height: 90, borderRadius: 100 },
  changeAvtBtn: {
    position: "absolute",
    bottom: 5,
    right: 0,
    width: 30,
    height: 30,
    backgroundColor: "#f5f5f5",
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  firstName: {
    textAlign: "center",
    fontSize: 25,
    paddingTop: 10,
    fontWeight: "600",
  },
  iconLogout: {
    borderWidth: 2,
    borderColor: "#dde2ec",
    padding: 15,
    borderRadius: 100,
    width: 55,
    height: 55,
  },
  logOut: { fontSize: 16, fontFamily: "Nunito_700Bold" },
});
export default styles;
