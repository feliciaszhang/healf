import withSession from "../../lib/withSession";

export const handler = async (req: any, res: any) => {
  const { username } = await req.body;
  const url = `https://api.github.com/users/${username}`;
  const user = { isLoggedIn: true, name: "Felicia" };
  req.session.set("user", user);
  await req.session.save();
  res.json(user);
};

export default withSession(handler);
