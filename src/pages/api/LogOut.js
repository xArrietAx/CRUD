import { Authentication } from "../../Database/Methods/Auth";

let Auth = new Authentication()

export default function handler(req, res) {
    if (req.method === "POST" && req.url === "/api/LogOut") {
        try {
            return Auth.LogOut(req, res)
        } catch (err) {
            return res.status(500).json({message:"Internal Server Error"})
        }
    } else {
        return res.status(405).json({ message: "Metodo no permitido" });
    }
  }
  