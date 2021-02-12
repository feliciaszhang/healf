import withSession from "../../lib/withSession";

export const handler = async (req: any, res: any) => {
  const program = req.body;
  req.session.set("program", program);
  await req.session.save();
  res.json(program);
};

export default withSession(handler);
