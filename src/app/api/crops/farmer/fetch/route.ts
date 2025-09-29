import { NextResponse,NextRequest } from "next/server";
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

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET || 'default_secret') as { id: string };

        // Find the user by ID
        const farmer = await User.findById(decodedToken.id);
        if (!farmer) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const crops = await Crop.find({ farmerNumber: farmer._id });
        return NextResponse.json({crops}, {status:200});
    } catch (error: unknown) {
        return NextResponse.json({message:"Failed to fetch crops", error: (error as Error).message}, {status:500});
    }
}
