import { jwtVerify } from "jose";

export async function VerifyToken(Token) {
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
      let {
        payload: { sub },
      } = await jwtVerify(Token, secretKey);
      return sub;
}