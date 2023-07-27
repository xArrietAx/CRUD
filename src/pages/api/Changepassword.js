import joi from "joi";
import { Authentication } from "@/Database/Methods/Auth";

let schema = joi.object({
 password: joi.string().required().min(8).max(25).pattern(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+~`|}{[}\]:;?/.,<>=-]).{8,}$/
  ),
  confirmpassword: joi.string().required().min(8).max(25).pattern(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+~`|}{[}\]:;?/.,<>=-]).{8,}$/
  )
})

let Auth = new Authentication()

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/Changepassword") {
    let {Secret} = req.cookies
    if (!Secret) return res.status(404).json({ redirect:true, message: "You don't have a secret, bye!" });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({message: error.details[0].message});
    if (value) {
      if (req.body.password === req.body.confirmpassword) {
           let data = {
             Token: Secret,
             newPassword: req.body.password
           }
           return Auth.changePassword(req, res, data)
     } else {
      return res.status(400).json({ message: "Passwords are not the same" });
     }
    }
  } else {
    return res.status(405).json({ message: "Metodo no permitido" });
  }
}
