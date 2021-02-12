import { HStack, Link, Flex, Button, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const { user, mutateUser } = useUser({});
  const router = useRouter();

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
        <HStack ml="auto" spacing={6}>
          {user?.isLoggedIn ? (
            <>
              <Link
                onClick={async () => {
                  await mutateUser(fetch("/api/signout", { method: "POST" }));
                  router.push("/");
                }}
              >
                Sign Out
              </Link>
              {user?.role === "ADMIN" && (
                <NextLink href="/import">
                  <Button colorScheme="blackAlpha" variant="outline">
                    Import
                  </Button>
                </NextLink>
              )}
            </>
          ) : (
            <>
              <NextLink href="/signin">
                <Link>Sign In</Link>
              </NextLink>
              <NextLink href="/signup">
                <Link>Sign Up</Link>
              </NextLink>
            </>
          )}
        </HStack>
      </Flex>
    </Flex>
  );
};

export default NavBar;
