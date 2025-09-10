import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import Crop from "@/model/cropModel";
import jwt from "jsonwebtoken";

export async function GET(request:NextRequest) {
    try {
        await connect();
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
        }
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        // Find the user by ID
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const crops = await Crop.find({distributorUsername: user._id});
        return NextResponse.json({ crops }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch crops", error }, { status: 500 });
    }
}
