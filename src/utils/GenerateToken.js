import { SignJWT } from "jose";

export async function GenerateToken(sub, ExpTime){
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET)
    let Token = await new SignJWT({ sub }).setProtectedHeader({alg: process.env.JWT_ALG_TOKEN}).setExpirationTime(ExpTime).sign(secretKey)
    return Token  
}