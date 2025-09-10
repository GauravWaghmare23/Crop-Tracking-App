import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Crop from "@/model/cropModel";
import User from "@/model/userModel";
import jwt from "jsonwebtoken";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
    try {
        // Get the token from the cookies
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
        }

        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        // Find the user by ID
        const farmer = await User.findById(decodedToken.id);
        if (!farmer) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        
        // Get the data from the request body, now including cropId
        const { cropId, cropName, quantity, price, location, harvestDate, expiryDate } = await request.json();

        // Log the incoming data for debugging
        console.log(cropId, cropName, quantity, price, location, harvestDate, expiryDate);

        // Validate the incoming data, including cropId
        if (!cropId || !cropName || !quantity || !price || !location || !harvestDate || !expiryDate) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Check if a crop with this ID already exists
        const existingCrop = await Crop.findOne({ cropId });
        if (existingCrop) {
            return NextResponse.json({ message: 'Crop with this ID already exists' }, { status: 409 });
        }

        // Remove cropId assignment to farmer document as it is not needed
        // farmer.cropId = cropId; // Assign the cropId to the farmer's document
        // await farmer.save(); // Save the updated farmer document

        // console.log('Crop ID assigned to farmer successfully');

        // Create a new crop document and associate it with the farmer's ID
        const newCrop = new Crop({
            cropId,
            cropName,
            farmerNumber: farmer._id, // Assign the farmer's ObjectId
            farmerUsername: farmer._id, // Assign the farmer's ObjectId
            quantity,
            price,
            location,
            harvestDate,
            expiryDate
        });

        // Save the crop to the database
        await newCrop.save();

        return NextResponse.json(
            { message: "Crop added successfully", success: true, crop: newCrop },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error adding crop:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
