import { jwtVerify } from "jose";
import { NextResponse } from 'next/server';

export default async function VerifyToken(req) {
  try {
    const Token = req.cookies.get('Token')?.value;
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET)
    await jwtVerify(Token, secretKey)
    return NextResponse.next()
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(`${process.env.MODE === "dev" ? "http://localhost:3000/Auth/Signin" : "" }`)
  }
}

export const config = {
  matcher: "/app/employee-management",
};