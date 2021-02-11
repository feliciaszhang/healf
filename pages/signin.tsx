import React, { useState } from "react";
import { useRouter } from "next/router";
import useUser from "../lib/useUser";
import Layout from "../components/Layout";
import { InputField } from "../components/InputField";
import { Spacer, Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { Form, Formik } from "formik";

const SignIn = () => {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Layout>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const response = await mutateUser(
              fetch("/api/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              })
            );
            if (response.status === 500) {
              console.log(response)
            } else if (response.data?.login.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push("/");
              }
            }
          } catch (error) {
            console.log(error)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" placeholder="email" label="Email" />
            <Spacer mt={8} />
            <InputField
              name="password"
              placeholder="password"
              type="password"
              label="Password"
            />
            <Button mt={4} type="submit" isLoading={isSubmitting}>
              Sign In
            </Button>
            <NextLink href="/forgot-password">
              <Link>Forgot Password</Link>
            </NextLink>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default SignIn;