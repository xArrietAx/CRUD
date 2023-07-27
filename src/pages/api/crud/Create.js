import { CRUD } from "@/Database/Methods/CRUD"
import { VerifyToken } from "@/utils/VerifyToken";
import joi from "joi";

let crud = new CRUD();

let schema = joi.object({
  name: joi.string().required().min(3).max(30).pattern(
    /^[A-Za-zÁ-ÿ]+([ ][A-Za-zÁ-ÿ]+)*$/
  ),
  surname: joi.string().required().min(3).max(30).pattern(
    /^[A-Za-zÁ-ÿ]+([ ][A-Za-zÁ-ÿ]+)*$/
  ),
  department: joi.string().required().min(3).max(30).pattern(
    /^[A-Za-zÁ-ÿ]+([ ][A-Za-zÁ-ÿ]+)*$/
  ),
  salary: joi.string().required().pattern(
    /^[\d+-]+$/
  ),
  phone: joi.string().required().max(20).pattern(
    /^[\d+-]+$/
  )
});

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/crud/Create") {
    let { Token } = req.cookies;
    if (!Token) return res.status(400).json({redirect: true, message:"Your session has expired."});
    let { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    if (value) {
      let id = await VerifyToken(Token);
      value.User = id;
      return crud.create(res, value);
    }
  } else {
    return res.status(405).json({ message: "Metodo no permitido" });
  }
}