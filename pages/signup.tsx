import React, { useState } from "react";
import { useRouter } from "next/router";
import useUser from "../lib/useUser";
import Layout from "../components/Layout";
import { InputField } from "../components/InputField";
import { Spacer, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";

const SignUp = () => {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const response = await mutateUser(
              fetch("/api/signup", {
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
            <Button
                colorScheme="blackAlpha"
                variant="outline"
                mt={8}
                type="submit"
                isLoading={isSubmitting}
              >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default SignUp;
