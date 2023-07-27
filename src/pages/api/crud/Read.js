import { CRUD } from "@/Database/Methods/CRUD";
import { Authentication } from "@/Database/Methods/Auth";
import { VerifyToken } from "@/utils/VerifyToken";

let crud = new CRUD();
let Auth = new Authentication();

export default async function handler(req, res) {
  if (req.method === "GET" && req.url === "/api/crud/Read") {
      let {Token} = req.cookies
    if (!Token) return 
      let id = await VerifyToken(Token)
      const user =await Auth.getUser(id)
      if (!user) return res.status(404).json({message:"User not found"})
      return crud.Read(res, user)
  } else {
    return res.status(405).json({ message: "Metodo no permitido" });
  }
}