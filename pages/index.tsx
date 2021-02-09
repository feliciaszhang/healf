import React from "react";
import { GetStaticProps } from "next";
import Program, { ProgramProps } from "../components/Program";
import prisma from "../lib/prisma";
import { Heading, Box } from "@chakra-ui/react";
import Layout from "../components/Layout";

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
  return (
    <Layout>
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
