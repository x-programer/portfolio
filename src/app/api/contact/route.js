import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const data = await request.json();

        // Log the data for MVP (would connect to email service in production)
        console.log('----------------------------------------');
        console.log('🚀 Contact Form Submission Received:');
        console.log(data);
        console.log('----------------------------------------');

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({
            success: true,
            message: 'Message received successfully on the bridge.'
        });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { success: false, message: 'Transmission failed.' },
            { status: 500 }
        );
    }
}
