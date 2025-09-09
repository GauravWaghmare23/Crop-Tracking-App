// app/api/users/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        });

        // Clear the token cookie
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0) // Set expiry to past date to delete cookie
        });

        return response;

    } catch (error:any) {
        return NextResponse.json({
            message: "Error during logout",
            error: error.message
        }, { status: 500 });
    }
}