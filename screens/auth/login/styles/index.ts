import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  welcomeText: {
    textAlign: "center",
    fontSize: 24,
  },
  learningText: {
    textAlign: "center",
    color: "#575757",
    fontSize: 15,
    marginTop: 5,
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 30,
    rowGap: 30,
  },
  forgotSection: {
    textAlign: "right",
    fontSize: 16,
    marginTop: 10,
  },
  signupRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  relative: {
    position: "relative",
    marginVertical: 10,
  },
  lineAbsolute: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    bottom: 7,
  },
  line: {
    borderWidth: 0.5,
    borderTopColor: "gray",
    width: "100%",
    opacity: 0.3,
  },
  relativeText: {
    position: "relative",
    lineHeight: 24,
    fontSize: 14,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    paddingHorizontal: 4,
  },
  loginWithGoogle: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: wp("6%"),
    height: hp("3%"),
    marginRight: 10,
  },
});

export default styles;
