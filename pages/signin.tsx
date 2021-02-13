import React, { useState } from "react";
import { useRouter } from "next/router";
import useUser from "../lib/useUser";
import Layout from "../components/Layout";
import { InputField } from "../components/InputField";
import { Spacer, Button, Link, Flex, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { Form, Formik } from "formik";

const SignIn = () => {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });
  const router = useRouter();

  return (
    <Layout variant="small">
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
            if (response.status === 400) {
              setErrors({
                email: "Email / password pair does not exist",
                password: "Email / password pair does not exist",
              });
            } else if (response.data?.login.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push("/");
              }
            }
          } catch (error) {
            setErrors(error);
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
            <Flex flex={1} m="auto">
              <Button
                colorScheme="blackAlpha"
                variant="outline"
                mt={8}
                type="submit"
                isLoading={isSubmitting}
              >
                Sign In
              </Button>
              <Box ml="auto">
                <NextLink href="/forgot-password">
                  <Link>Forgot Password</Link>
                </NextLink>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default SignIn;
