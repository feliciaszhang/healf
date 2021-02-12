import { HStack, Link, Flex, Button, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import Dropzone from "react-dropzone";
import XLSX from "xlsx";
import { useState } from "react";
import useProgram from "../lib/useProgram";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const { user, mutateUser } = useUser({});
  const { mutateProgram } = useProgram();
  const router = useRouter();
  const [program, setProgram] = useState([]);

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
                as={Link}
                onClick={async () => {
                  await mutateUser(fetch("/api/signout", { method: "POST" }));
                  router.push("/");
                }}
              >
                Sign Out
              </Link>
              {user?.role === "ADMIN" && (
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    const reader = new FileReader();
                    const rABS = !!reader.readAsBinaryString;
                    reader.onload = async (e) => {
                      var bstr = e.target.result;
                      var workbook = XLSX.read(bstr, {
                        type: rABS ? "binary" : "array",
                      });
                      var sheet_name_list = workbook.SheetNames[0];
                      var jsonFromExcel = XLSX.utils.sheet_to_json(
                        workbook.Sheets[sheet_name_list],
                        {
                          raw: false,
                          dateNF: "MM-DD-YYYY",
                          header: 1,
                          defval: "",
                        }
                      );
                      setProgram(jsonFromExcel);
                      console.log(JSON.stringify({ 123: "h", 456: "j" }))
                      console.log(JSON.stringify(jsonFromExcel))
                      try {
                        await mutateProgram(
                          fetch("/api/import", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ 123: "h", 456: "j" }),
                          })
                        );
                      } catch (error) {
                        console.log(error);
                      }
                    };
                    reader.readAsBinaryString(acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Button
                      colorScheme="blackAlpha"
                      variant="outline"
                      mt={8}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <Text>Import</Text>
                    </Button>
                  )}
                </Dropzone>
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
