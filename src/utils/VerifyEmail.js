import { User } from "@/Database/Model/UserSchema";

export async function VerifyEmail(email) {
    let user = await User.findOne({ email });
    if (!user) return null;
    return user;
}