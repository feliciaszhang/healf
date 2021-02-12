import withSession from "../../lib/withSession";

export const handler = async (req: any, res: any) => {
  const program = req.session.get("program");
  if (program) {
    res.json({
      ...program
    });
  } else {
    res.json({
      program: "alskfsjlk"
    });
  }
};

export default withSession(handler);
