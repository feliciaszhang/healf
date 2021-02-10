import { withIronSession } from "next-iron-session";

export const withSession = (handler) => {
 return withIronSession(handler, {
  password: process.env.SIGNIN_PRIVATE_KEY,
  cookieName: "healf-session",
  cookieOptions: {
   secure: process.env.NODE_ENV === "production",
  },
 });
}

export default withSession