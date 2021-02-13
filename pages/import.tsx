import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import useAdmin from "../lib/useAdmin";
import Layout from "../components/Layout";
import { Text, Container, Button } from "@chakra-ui/react";
import Table from "../components/Table";
import { useDropzone } from "react-dropzone";
import XLSX from "xlsx";

const Import = () => {
  const { mutateUser } = useAdmin({
    redirectTo: "/",
    redirectIfFound: false,
  });
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [program, setProgram] = useState([]);

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  } as const;

  const activeStyle = {
    borderColor: "#2196f3",
  } as const;

  const acceptStyle = {
    borderColor: "#00e676",
  } as const;

  const rejectStyle = {
    borderColor: "#ff1744",
  } as const;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    accept:
      "application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    onDrop: (acceptedFiles) => {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = async (e) => {
        var workbook = XLSX.read(e.target.result, {
          type: rABS ? "binary" : "array",
        });
        var jsonFromExcel = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]],
          {
            raw: false,
            dateNF: "MM-DD-YYYY",
            header: 1,
            defval: "",
          }
        );
        setProgram(jsonFromExcel);
      };
      reader.readAsBinaryString(acceptedFiles[0]);
    },
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <Layout>
      {program.length ? (
        <>
          <Container centerContent={true}>
            <Table data={program} />
          </Container>
          <Button
            zIndex={1}
            position="sticky"
            background="white"
            bottom={0}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={async () => {
              await mutateUser(fetch("/api/save", { method: "POST" }));
              router.push("/");
            }}
          >
            Save
          </Button>
        </>
      ) : (
        <Container {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <Text>Drag and drop a file here, or click to select a file</Text>
          <Text>(Only *.xlsx files will be accepted)</Text>
        </Container>
      )}
    </Layout>
  );
};

export default Import;
