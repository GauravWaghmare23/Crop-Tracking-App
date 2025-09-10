import { NextResponse, NextRequest } from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import Crop from "@/model/cropModel";
import User from "@/model/userModel";
import jwt from "jsonwebtoken";

export async function PUT(request: NextRequest) {
    try {
        await connect();
        const encodedToken = request.cookies.get("token")?.value || "";
        if (!encodedToken) {
            return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
        }
        const decodedToken : any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!);

        // find user
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const { cropId, retailerPrice, retailerDate, retailerLocation } = await request.json();

        const crop = await Crop.findOne({ cropId });
        if (!crop) {
            return NextResponse.json({ message: "Crop not found" }, { status: 404 });
        }

        crop.retailerUsername = user._id;
        crop.retailerPrice = retailerPrice;
        crop.retailerDate = retailerDate;
        crop.retailerLocation = retailerLocation;

        await crop.save();

        return NextResponse.json({ message: "Retailer added successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({message: "Internal Server Error", error}, {status: 500})
    }
}
