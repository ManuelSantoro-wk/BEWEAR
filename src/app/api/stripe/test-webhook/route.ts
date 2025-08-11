import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    message: "Webhook endpoint is accessible",
    timestamp: new Date().toISOString(),
    status: "ok",
  });
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      message: "Test webhook received",
      receivedData: body,
      timestamp: new Date().toISOString(),
      status: "success",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error processing test webhook",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
      status: "error",
    }, { status: 500 });
  }
};
