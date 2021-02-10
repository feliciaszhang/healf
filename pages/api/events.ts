import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const user = req.session.get("user");

  if (!user?.isLoggedIn) {
    res.status(401).end();
    return;
  }

  const url = `https://api.github.com/users/${user.login}/events`;

  try {
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
        res.json(data)
    } else {
        throw new Error(response.statusText)
    }
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});