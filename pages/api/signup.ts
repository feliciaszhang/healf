import withSession from "../../lib/withSession";
import prisma from "../../lib/prisma";
import argon2 from "argon2";

export const handler = async (req: any, res: any) => {
  const { email, password } = req.body;
  const user = await prisma.user.create({
    data: {
      email: email,
      password: await argon2.hash(password),
      role: "USER"
    },
  });
  req.session.set("user", user);
  await req.session.save();
  res.json(user);
};

export default withSession(handler);
