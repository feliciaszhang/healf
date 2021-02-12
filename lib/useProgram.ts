import { useEffect } from "react";
import useSWR from "swr";

export const useProgram = () => {
  const { data: program, mutate: mutateProgram } = useSWR("/api/program");
  useEffect(() => {
    // console.log(program)
  }, [program]);
  return { program, mutateProgram };
};

export default useProgram;
