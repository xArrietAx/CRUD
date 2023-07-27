import { CRUD } from "@/Database/Methods/CRUD";

let crud = new CRUD();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    let {Token} = req.cookies
    if (!Token || !req.query.id) return res.status(400).json({redirect: true, message:"Your session has expired."});
    let data = {
      id: req.query.id,
      data: req.body,
      Token
    }
    return crud.Update(res, data)
  } else {
    return res.status(405).json({ message: "Metodo no permitido" });
  }
}
