import React, { useState } from "react";
import useUser from "../lib/useUser";
import Layout from "../components/Layout";
import {
    Link,
  } from "@chakra-ui/react";

const Login = () => {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    event.preventDefault();

    const body = {
      username: e.currentTarget.username.value,
    };

    try {
      await mutateUser(
        fetch("/api/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }),
      );
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
  }

  return (
    <Layout>
      <Link onClick={handleSubmit}>Sign In</Link>
    </Layout>
  );
};

export default Login;