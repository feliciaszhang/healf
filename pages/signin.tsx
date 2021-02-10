import React, { useState } from "react";
import useUser from "../lib/useUser";
import Layout from "../components/Layout";
import { Link } from "@chakra-ui/react";

const SignIn = () => {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Layout>
      <Link
        onClick={async () => {
          try {
            await mutateUser(
              fetch("/api/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
              })
            );
          } catch (error) {
            console.error("An unexpected error happened:", error);
            setErrorMsg(error.data.message);
          }
        }}
      >
        Sign In
      </Link>
    </Layout>
  );
};

export default SignIn;
