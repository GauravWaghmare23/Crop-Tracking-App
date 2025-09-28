import { NextResponse, NextRequest } from "next/server";
import User from "@/model/userModel";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import Crop from "@/model/cropModel";


export async function GET(request: NextRequest) {
    try {
        await connect();
        const token = request.cookies.get("token")?.value || "";
        if(!token){
            return NextResponse.json({message: "Unauthorized: No token provided"}, {status: 401});
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET || 'default_secret') as any;

        // Find the user by ID

        const user = await User.findById(decodedToken.id);
        if(!user){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        const crops = await Crop.find({retailerUsername: user._id});
        return NextResponse.json({crops}, {status: 200});

    } catch (error: unknown) {
        return NextResponse.json({message: "Internal Server Error", error: (error as Error).message}, {status: 500})
    }
}
