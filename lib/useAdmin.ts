import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export const useAdmin = ({ redirectTo = null, redirectIfFound = false }) => {
  const { data: user, mutate: mutateUser } = useSWR("/api/user");
  useEffect(() => {
    console.log(user);
    if (!redirectTo || !user) return;
    const validUser = user?.isLoggedIn && user?.role === "ADMIN";
    if (
      (redirectTo && !redirectIfFound && !validUser) ||
      (redirectIfFound && validUser)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);
  return { user, mutateUser };
};

export default useAdmin;
