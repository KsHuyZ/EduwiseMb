import { useMutation } from "@tanstack/react-query";
import { Toast } from "react-native-toast-notifications";
import { signUp } from "@/api";
import { validateError } from "@/utils";
import { TSignUpCredentials } from "@/types";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (values: TSignUpCredentials) => signUp(values),
    onSuccess() {
      Toast.show("Sign up success, Please verify account in gmail", {
        type: "success",
      });
    },
    onError(error) {
      Toast.show(validateError(error), {
        type: "danger",
      });
    },
  });
};
