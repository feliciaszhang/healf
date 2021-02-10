import React from "react";
import { GetStaticProps } from "next";
import Program, { ProgramProps } from "../components/Program";
import prisma from "../lib/prisma";
import { Heading, Box } from "@chakra-ui/react";
import Layout from "../components/Layout";
import useEvents from "../lib/useEvents";
import useUser from "../lib/useUser";

export const getStaticProps: GetStaticProps = async () => {
  const programs = await prisma.program.findMany({
    where: { published: true },
    select: {
      title: true,
      id: true,
    },
  });
  return { props: { programs } };
};

type Props = {
  programs: ProgramProps[];
};

const Index: React.FC<Props> = ({ programs }) => {
  const { user } = useUser({ redirectTo: "/signin" });
  const { events, loadingEvents } = useEvents(user);
  return (
    <Layout>
      <Box m={4}>
        <Heading fontSize="xl">Programs</Heading>
        <Box>
        {JSON.stringify(user, undefined, 2)}
          {programs.map((program) => (
            <Program program={program} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Index;
