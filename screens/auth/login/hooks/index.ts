import { Toast } from "react-native-toast-notifications";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api";
import { validateError } from "@/utils";
import { TSignInCredentials } from "@/types";

export const useSignIn = () => {
  return useMutation({
    mutationFn: (values: TSignInCredentials) => signIn(values),
    onSuccess() {
      Toast.show("Sign in success", {
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
