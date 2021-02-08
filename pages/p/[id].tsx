import React from "react";
import { GetServerSideProps } from "next";
import { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
import { Heading, Box, Text } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: post,
  };
};

const Post: React.FC<PostProps> = (props) => {
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Box>
      <Heading>{title}</Heading>
      <Text>By {props?.author?.name || "Unknown author"}</Text>
    </Box>
  );
};

export default Post;
