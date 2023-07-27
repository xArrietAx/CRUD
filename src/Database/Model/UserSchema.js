import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import {SignJWT} from "jose";
import { setCookie } from 'cookies-next';

let UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tokenJWT:{
    type: String,
  }
})

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next()
  try {
    let salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
  } catch (error) {
    console.log(error);
    throw new Error("Falló el hasheo de contraseña")
  }
})

UserSchema.methods.GenerateToken = async function (req, res) {
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET)
  let Token = await new SignJWT({ sub: this._id }).setProtectedHeader({alg: process.env.JWT_ALG_TOKEN}).setExpirationTime("20m").sign(secretKey)
  setCookie('Token', Token, { 
    req, 
    res, 
    httpOnly: true,
    expires: new Date(Date.now() + (20 * 60 * 1000)),
    sameSite: "strict",
    secure: !(process.env.MODE === "dev")
  });
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

export let User = models.user || model("user", UserSchema)