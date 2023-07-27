import joi from "joi";
import { Authentication } from "@/Database/Methods/Auth";

let Auth = new Authentication()

const schema = joi.string().email().required().min(5).max(40).pattern(
  /^(?=.{1,256})(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
);

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/Resetpassword") {
    let { email } = req.body;
    const { error, value } = schema.validate(email);
    if (error) return res.status(400).json({message: error.details[0].message});
    if (value) return Auth.ResetPassword(res, value)
  } else {
    return res.status(405).json({ message: "Metodo no permitido" });
  }
}
