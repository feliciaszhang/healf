import { withIronSession, Handler } from "next-iron-session";

export const withSession = (handler: Handler) => {
 return withIronSession(handler, {
  password: process.env.SIGNIN_PRIVATE_KEY,
  cookieName: "healf-session",
  cookieOptions: {
   secure: process.env.NODE_ENV === "production",
  },
 });
}

export default withSession