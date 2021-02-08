import React from "react";
import { GetStaticProps } from "next";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import { Heading, Box } from "@chakra-ui/react";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Box>
      <Heading fontSize="xl">Feed</Heading>
      <Box>
        {props.feed.map((post) => (
          <Post post={post} />
        ))}
      </Box>
    </Box>
  );
};

export default Blog;
