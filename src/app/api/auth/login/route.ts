import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserSchema from "@/app/model/UserSchema";
import { connectDB } from "@/app/lib/db";
import { generateToken } from "@/app/lib/jwtHelperFnc";

connectDB();
export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const isUserExist = await UserSchema.findOne({ email });

    if (!isUserExist) {
      return NextResponse.json(
        { error: "User Doesn't Exist, Please Register" },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist?.password
    );

    const userWithoutPassword = isUserExist.toObject();
    delete userWithoutPassword.password;

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "" }, { status: 401 });
    }
    const token = generateToken(isUserExist._id.toString());
    return NextResponse.json(
      { message: "Login Successful", user: userWithoutPassword, token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
