import joi from "joi";
import { Authentication } from "../../Database/Methods/Auth";

const schema = joi.object({
  name: joi.string().required().min(3).max(20).pattern(
    /^[A-Za-zÁ-ÿ]+([ ][A-Za-zÁ-ÿ]+)*$/
  ),
  email: joi.string().email().required().min(5).max(40).pattern(
    /^(?=.{1,256})(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
  ),
  password: joi
    .string()
    .required()
    .min(8)
    .max(25)
    .pattern(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+~`|}{[}\]:;?/.,<>=-]).{8,}$/
    ),
});

let Auth = new Authentication()

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/Signup") {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({message: error.details[0].message});
    if (value) return Auth.SignUp(res, value)
  } else {
    return res.status(405).json({ message: "Método no permitido" });
  }
}
