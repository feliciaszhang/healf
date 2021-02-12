import React, { useState } from "react";
import { useRouter } from "next/router";
import useAdmin from "../lib/useAdmin";
import Layout from "../components/Layout";
import { Text, Button } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import XLSX from "xlsx";

const Import = () => {
  const { mutateUser } = useAdmin({
    redirectTo: "/",
    redirectIfFound: false,
  });
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [program, setProgram] = useState([]);

  return (
    <Layout>
    <Text>{JSON.stringify(program)}</Text>
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
          };
          reader.readAsBinaryString(acceptedFiles[0]);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <Button
            colorScheme="blackAlpha"
            variant="outline"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Text>Import</Text>
          </Button>
        )}
      </Dropzone>
    </Layout>
  );
};

export default Import;
