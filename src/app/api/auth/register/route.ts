import { connectDB } from "@/app/lib/db";
import UserSchema from "@/app/model/UserSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateToken } from "@/app/lib/jwtHelperFnc";

connectDB();
export async function POST(request: Request) {
  const { email, password, name } = await request.json();
  const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");
  try {
    const isUserExist = await UserSchema.findOne({ email });

    if (isUserExist) {
      return NextResponse.json(
        { error: "User Already Exist, Please Login" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserSchema({ email, hashedPassword, name });
    const token = generateToken(newUser?._id);
    return NextResponse.json(
      { message: "User Registered Successfully", user: newUser, token },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
