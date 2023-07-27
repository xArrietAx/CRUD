import { setCookie } from "cookies-next";
import { VerifyEmail } from "@/utils/VerifyEmail";
import { GenerateToken } from "./GenerateToken";
import { VerifyToken } from "./VerifyToken";
import {compare} from "bcrypt";

export async function VerifyKey(req, res, data) {
    try {
      let {email, key} = data
      let user = await VerifyEmail(email)
      if (!user) return res.status(404).json({ message: "Error finding your email" });
      let keybcrypt = await VerifyToken(user.tokenJWT)
      let keyCompared = await compare(key, keybcrypt);
      if(!keyCompared) return res.status(404).json({ message:"Provide a valid key" });
      let Token = await GenerateToken(user._id, "5m")
      setCookie('Secret', Token, { 
        req, 
        res, 
        httpOnly: true,
        expires: new Date(Date.now() + (5 * 60 * 1000)),
        sameSite: "strict",
        secure: !(process.env.MODE === "dev")
      });
      return res.status(200).json({ok:true})
    } catch (err) {
     if (err.code === "ERR_JWT_EXPIRED") {
      return res.status(500).json({message:"Key expired, try again!"})
     }
      return res.status(500).json({message:"Internal Server Error"})
    }
   }
