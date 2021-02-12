import React from "react";
import { GetServerSideProps } from "next";
import Program, { ProgramProps } from "../components/Program";
import prisma from "../lib/prisma";
import { Heading, Box, Text } from "@chakra-ui/react";
import Layout from "../components/Layout";
import useProgram from "../lib/useProgram";
import useUser from "../lib/useUser";

export const getServerSideProps: GetServerSideProps = async () => {
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
  const { program } = useProgram();
  return (
    <Layout>
      <Text>{JSON.stringify(program)}</Text>
      <Box m={4}>
        <Heading fontSize="xl">Programs</Heading>
        <Box>
          {programs.map((program) => (
            <Program program={program} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Index;
