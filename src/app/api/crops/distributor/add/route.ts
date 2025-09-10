import { NextResponse, NextRequest } from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import jwt from "jsonwebtoken";
import Crop from "@/model/cropModel";

export async function PUT(request: NextRequest) {
    let cropId = "", distributorPrice = "", distributorDate = "", distributorLocation = "", distributorDeliveryName = "", distributorPhone = "", distributorDeliveryNumber = "";
    let user: any = null;

    try {
        await connect();
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
        }
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        // Find the user by ID
        user = await User.findById(decodedToken.id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const requestData = await request.json();
        ({
            cropId,
            distributorPrice,
            distributorDate,
            distributorLocation,
            distributorDeliveryName,
            distributorPhone,
            distributorDeliveryNumber
        } = requestData);

        if (
            !cropId ||
            !distributorPrice ||
            !distributorDate ||
            !distributorLocation ||
            !distributorDeliveryName ||
            !distributorPhone ||
            !distributorDeliveryNumber
        ) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        console.log("Searching for crop with cropId:", cropId);
        const crop = await Crop.findOne({ cropId });
        if (!crop) {
            console.log("Crop not found for cropId:", cropId);
            return NextResponse.json({ message: "Crop not found" }, { status: 404 });
        }
        console.log("Crop found:", crop._id);

        crop.distributorUsername = user._id;
        crop.distributorPrice = parseFloat(distributorPrice);
        crop.distributorDate = new Date(distributorDate);
        crop.distributorLocation = distributorLocation;
        crop.distributorDeliveryName = distributorDeliveryName;
        crop.distributorPhone = distributorPhone;
        crop.distributorDeliveryNumber = parseInt(distributorDeliveryNumber);

        console.log("Saving crop with data:", {
            distributorUsername: crop.distributorUsername,
            distributorPrice: crop.distributorPrice,
            distributorDate: crop.distributorDate,
            distributorLocation: crop.distributorLocation,
            distributorDeliveryName: crop.distributorDeliveryName,
            distributorPhone: crop.distributorPhone,
            distributorDeliveryNumber: crop.distributorDeliveryNumber
        });

        await crop.save();
        console.log("Crop saved successfully");
        return NextResponse.json({ message: "Distributor added successfully" }, { status: 200 });

    } catch (error: any) {
        console.error("Error in distributor add route:", error);
        console.error("Request data:", {
            cropId,
            distributorPrice,
            distributorDate,
            distributorLocation,
            distributorDeliveryName,
            distributorPhone,
            distributorDeliveryNumber
        });
        console.error("User ID:", user._id);
        return NextResponse.json({ message: "Failed to add distributor", error: error.message || error.toString() }, { status: 500 });
    }
}
