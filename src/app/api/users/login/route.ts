import { NextResponse,NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    try {
        await connect();
        const {email, password} = await request.json();

        // check user exists
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message: 'User not found'}, {status: 404});
        }

        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({message: 'Invalid credentials'}, {status: 401});
        }

         // create token
        const tokenData = {
            id: user._id,
            username: user.username,
            email:user.email
        }

        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"});

        const response = NextResponse.json({ message: "Login successful", success:true, user: {
                id: user._id,
                email: user.email
            } }, { status: 200 });

        response.cookies.set("token",token,{ httpOnly: true});
        console.log(response)
        return response;
    } catch (error: any) {
        console.error('Login API Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
