import NavBar from "./NavBar";
import { Wrapper } from "./Wrapper";

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
    <NavBar />
    <Wrapper>
      {children}
    </Wrapper>
    </>
  );
};

export default Layout;
