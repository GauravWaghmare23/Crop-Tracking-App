import { NextResponse, NextRequest } from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import jwt from "jsonwebtoken";
import Crop from "@/model/cropModel";

export async function PUT(request: NextRequest) {
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

        const {cropId,distributorPrice,distributorDate,distributorLocation,distributorDeliveryName,distributorPhone,distributorDeliveryNumber} = await request.json();

        const crop = await Crop.findOne({cropId});
        if(!crop){
            return NextResponse.json({message: 'Crop not found'}, {status: 404});
        }

        crop.distributorUsername = user._id;
        crop.distributorPrice = distributorPrice;
        crop.distributorDate = distributorDate;
        crop.distributorLocation = distributorLocation;
        crop.distributorDeliveryName = distributorDeliveryName;
        crop.distributorPhone = distributorPhone;
        crop.distributorDeliveryNumber = distributorDeliveryNumber;

        await crop.save();
        return NextResponse.json({message:"Distributor added successfully"}, {status:200});

    } catch (error) {
       return NextResponse.json({message:"Failed to add distributor",error}, {status:500});
    }
}
