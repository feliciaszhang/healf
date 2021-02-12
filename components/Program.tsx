import React from "react";
import Router from "next/router";
import { Text, Link, Box } from "@chakra-ui/react";

export type ProgramProps = {
  id: number;
  title: string;
  content: string;
  published: boolean;
};

const Program: React.FC<{ program: ProgramProps }> = ({ program }) => {
  return (
    <Box>
      <Text onClick={() => {
        Router.push("/p/[id]", `/p/${program.id}`)
        }} as={Link}>{program.title}</Text>
    </Box>
  );
};

export default Program;
