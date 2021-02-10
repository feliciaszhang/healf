import NavBar from "./NavBar";
import { Box } from "@chakra-ui/react";

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box mt={8} mx="auto" maxW="800px" w="100%">
        {children}
      </Box>
    </>
  );
};

export default Layout;
