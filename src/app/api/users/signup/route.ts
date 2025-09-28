import {connect} from "@/dbConfig/dbConfig"
import User from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        await connect();
        const {username, email, password, role, number, address} = await request.json();

        // ✅ Add server-side validation for all required fields
        if (!username || !email || !password || !role || !number || !address) {
            return NextResponse.json(
                { message: 'Missing one or more required fields.' },
                { status: 400 }
            );
        }

        console.log(username, email, password, role, number, address);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 409 });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username, email, password:hashedPassword, role, number, address});
        await newUser.save();

        console.log('User created successfully');
        return NextResponse.json(
            { message: 'User created successfully' },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error('Registration API Error:', error); // ✅ Use console.error and provide more context

        // Check for Mongoose validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            return NextResponse.json({ message: 'Validation failed', errors }, { status: 400 });
        }
        
        // Return a generic error for all other cases
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}