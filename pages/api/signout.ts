import withSession from "../../lib/withSession";

export const handler = async (req: any, res: any) => {
  req.session.destroy();
  res.json({ isLoggedIn: false });
}

export default withSession(handler);