import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
    try {
        await connect();
        const encodedToken = request.cookies.get("token")?.value || "";

        if (!encodedToken) {
            return NextResponse.json({ message: "Authorization failed" }, { status: 401 });
        }

        const decodedToken = jwt.verify(encodedToken, process.env.token_secret!);
        
        // Ensure the decoded token has an 'id' and is a valid object
        if (typeof decodedToken === "object" && decodedToken !== null && "id" in decodedToken) {
            // Find the single user by the ID from the decoded token
            const user = await User.findById(decodedToken.id).select("-password");

            if (!user) {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }
            
            return NextResponse.json({ user }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Invalid token structure" }, { status: 400 });
        }
    } catch (error: any) {
        console.error("Error fetching single user:", error);
        // Handle token verification errors or other internal errors
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
