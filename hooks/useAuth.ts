import { TUser } from "@/types";
import { clearStorage, getStorage } from "@/utils";
import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<TUser>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const res = (await getStorage("user")) as TUser;
      setUser(res);
      setLoading(false);
    };
    getUser();
  }, []);

  const signOut = useCallback(async () => {
    await clearStorage();
    setUser(undefined);
  }, []);

  return { user, setUser, loading, signOut };
};
