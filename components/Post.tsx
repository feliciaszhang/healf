import React from "react";
import Router from "next/router";
import { Heading, Text, Link, Box } from "@chakra-ui/react";

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Box>
      <Heading onClick={() => Router.push("/p/[id]", `/p/${post.id}`)} as={Link}>{post.title}</Heading>
      <Text>By {authorName}</Text>
    </Box>
  );
};

export default Post;
