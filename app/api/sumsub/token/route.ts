// app/api/sumsub/token/route.ts
import { NextResponse } from 'next/server';
import { sdk } from 'sumsub-node-sdk'; // Using the official SDK

console.log("p1", process.env.SUMSUB_APP_TOKEN);
console.log("p2", process.env.SUMSUB_SECRET_KEY);
console.log("p3", process.env.NEXT_PUBLIC_SUMSUB_LEVEL_NAME);
const sumsubClient = sdk({
    baseURL: 'https://api.sumsub.com', // Use 'https://api.sumsub.com' for production
    appToken: process.env.SUMSUB_APP_TOKEN!,
    secretKey: process.env.SUMSUB_SECRET_KEY!,
});

export async function GET(request: Request) {
    // 1. Identify the user.
    // In a real app, you should get the User ID from your auth session (e.g., NextAuth/Clerk).
    // For this demo, we'll generate a random one or read from search params.
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || `user_${Date.now()}`;
    const levelName = process.env.NEXT_PUBLIC_SUMSUB_LEVEL_NAME!;

    try {
        console.log("PPPPPPPPPPPPPPPPPPPPPPPP")
        // 2. Generate the access token using the SDK
        const accessToken = await sumsubClient.generateAccessToken(
            userId,
            levelName,
            1200 // Token TTL in seconds (20 mins)
        );
        console.log("ssssssssssssssssss", accessToken);
        return NextResponse.json({
            token: accessToken.data.token,
            userId: userId
        });

    } catch (error) {
        console.error('Sumsub Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate token' },
            { status: 500 }
        );
    }
}