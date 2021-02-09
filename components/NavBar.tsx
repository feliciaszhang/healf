import {
  Box,
  Link,
  Flex,
  Button,
  theme,
  Heading,
  HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      p={5}
      boxShadow="0 0 8px 8px #E0E0E0"
    >
      <Flex flex={1} m="auto" align="center" maxW={1000}>
        <NextLink href="/">
          <Link>
            <Heading fontSize="xl">HEALF</Heading>
          </Link>
        </NextLink>
        <Box ml="auto">
          <NextLink href="/signin">
            <Link mr={4}>Sign In</Link>
          </NextLink>
          <NextLink href="/signup">
            <Link>Sign Up</Link>
          </NextLink>
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
