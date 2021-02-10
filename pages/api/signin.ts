import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const { username } = await req.body;
  const url = `https://api.github.com/users/${username}`;

    const user = { isLoggedIn: true, name: "Felicia" };
    req.session.set("user", user);
    await req.session.save();
    res.json(user);
});