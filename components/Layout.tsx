import NavBar from "./NavBar";
import { Box } from "@chakra-ui/react";

export type Variant = "small" | "regular";

interface LayoutProps {
  variant?: Variant;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <>
      <NavBar />
      <Box
        mt={8}
        mx="auto"
        maxW={variant === "regular" ? "800px" : "400px"}
        w="100%"
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
