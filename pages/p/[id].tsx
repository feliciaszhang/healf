import React from "react";
import { GetServerSideProps } from "next";
import { ProgramProps } from "../../components/Program";
import prisma from "../../lib/prisma";
import { Heading, Box, Text } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const program = await prisma.program.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    select: {
      title: true,
      published: true
    },
  });
  return { props: program };
};

const Program: React.FC<ProgramProps> = (props) => {
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Box>
      <Heading>{title}</Heading>
    </Box>
  );
};

export default Program;
