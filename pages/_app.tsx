import { AppProps } from "next/app";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <ColorModeProvider
        options={{
          initialColorMode: "light"
        }}
      ></ColorModeProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
