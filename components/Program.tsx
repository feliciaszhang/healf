import React from "react";
import Router from "next/router";
import { Heading, Link, Box } from "@chakra-ui/react";

export type ProgramProps = {
  id: number;
  title: string;
  content: string;
  published: boolean;
};

const Program: React.FC<{ program: ProgramProps }> = ({ program }) => {
  return (
    <Box>
      <Heading onClick={() => {
        Router.push("/p/[id]", `/p/${program.id}`)
        }} as={Link}>{program.title}</Heading>
    </Box>
  );
};

export default Program;
