// pages/api/crops/data/get.ts (or app/api/crops/data/get/route.ts)
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Crop from "@/model/cropModel";

export async function GET(request: NextRequest) {
    try {
        await connect();

        // Get the cropId directly from the URL query parameters
        const { searchParams } = new URL(request.url);
        const cropId = searchParams.get('cropId');

        if (!cropId) {
            return NextResponse.json({ message: "Bad Request: No cropId provided" }, { status: 400 });
        }

        // Find the crops with the provided cropId
        const crops = await Crop.find({ cropId });
        
        if (crops.length === 0) {
            return NextResponse.json({ message: "No crops found for this ID" }, { status: 404 });
        }

        return NextResponse.json({ crops }, { status: 200 });
    } catch (error: unknown) {
        console.error("API GET Error:", error);
        return NextResponse.json({ message: "Internal Server Error", error: (error as Error).message }, { status: 500 });
    }
}
