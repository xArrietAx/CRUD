import {hash, genSalt} from "bcrypt";
import { GenerateToken } from "./GenerateToken";

export async function GenerateKey() {
    const chars ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = ''
    for (let i = 0; i < 10; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
     let salt = await genSalt(12)
     let keybcrypt = await hash(key, salt)
     let Token = await GenerateToken(keybcrypt, "5m")
     return {key, Token}
  }