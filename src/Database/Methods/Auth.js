import "../MongoDB";
import { User } from "../Model/UserSchema";
import { Employee } from "../Model/EmployeeSchema";
import { deleteCookie } from "cookies-next";
import nodemailer from "nodemailer";
import { VerifyToken } from "@/utils/VerifyToken";
import { VerifyEmail } from "@/utils/VerifyEmail";
import { GenerateKey } from "@/utils/GenerateKey";

export class Authentication {
  
  async SignUp(res, value) {
    try {
      let newUser = new User(value);
      await newUser.save();
      return res.status(200).json({ message: "Account created successfully" });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ message: "The account already exists" });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async SignIn(req, res, value) {
    try {
      let user = await VerifyEmail(value.email);

      let passwordCompared = await user?.comparePassword(value.password);

      if (!passwordCompared)
        return res.status(404).json({ message: "The account doesn't exist" });

      await user.GenerateToken(req, res);

      return res.status(200).json({ message: "Welcome :)" });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUser(id) {
    let user = await User.findById(id);
    return user;
  }

  async LogOut(req, res) {
    try {
      deleteCookie("Token", {
        req,
        res,
        httpOnly: true,
        expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
        sameSite: "strict",
        secure: !(process.env.MODE === "dev"),
      });
      return res.status(200).json({ message: "Bye :)" });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteAccount(req, res, token) {
    try {
      let id = await VerifyToken(token);
      await User.findByIdAndDelete(id);
      await Employee.deleteMany({ User: id });
      return this.LogOut(req, res);
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async ResetPassword(res, email) {
    try {
      let user = await VerifyEmail(email);
      if (!user)
        return res
          .status(404)
          .json({ message: "Error sending mail or user not found" });
      let { key, Token } = await GenerateKey();
      user.tokenJWT = Token;
      await user.save();
      let transport = await nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: "andresarrieta2323@gmail.com",
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      await transport.sendMail(
        {
          from: "andresarrieta2323@gmail.com",
          to: email,
          subject: "¡Hello! I'm ArrietA",
          text: `Here is your key :) : ${key}
          If you did not request a password reset you can ignore this email.
          `,
        },
        (err) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Failed to send email", err });
          return res
            .status(200)
            .json({ email, message: "we send you a key in your email" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async changePassword(req, res, data) {
    try {
      let { Token, newPassword } = data;
      let userId = await VerifyToken(Token);
      let user = await this.getUser(userId);
      user.password = newPassword;
      user.tokenJWT = null;
      deleteCookie("Secret", {
        req,
        res,
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 60 * 1000),
        sameSite: "strict",
        secure: !(process.env.MODE === "dev"),
      });
      await user.save();
      return res
        .status(200)
        .json({ message: "Your password was successfully changed" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

}
