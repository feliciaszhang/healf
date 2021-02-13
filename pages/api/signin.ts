import withSession from "../../lib/withSession";
import prisma from "../../lib/prisma";
import argon2 from "argon2";

export const handler = async (req: any, res: any) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      email: true,
      role: true,
      programs: true,
      password: true,
    },
  });
  if (!user) {
    res.status(400).json({ error: "Email / password do not match" });
  }
  const valid = await argon2.verify(user.password, password);
  if (valid) {
    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  } else {
    res.status(400).json({ error: "Email / password do not match" });
  }
};

export default withSession(handler);
