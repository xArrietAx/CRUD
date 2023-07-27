import { Authentication } from "../../Database/Methods/Auth";

let Auth = new Authentication()

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/DeleteAccount") {
    let {Token} = req.cookies
    if (!Token) return res.status(404).json({ redirect:true, message: "Your session has expired" });
    return Auth.deleteAccount(req, res, Token)
  } else {
    return res.status(405).json({ message: "Metodo no permitido" });
  }
}