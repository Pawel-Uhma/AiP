import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

const rsvpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  attendance: z.enum(["yes", "no"]),
  guestCount: z.number().min(1).max(10),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = rsvpSchema.parse(body);
    
    // Add timestamp
    const rsvpData = {
      ...validatedData,
      submittedAt: new Date().toISOString(),
      id: Date.now().toString(),
    };

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), "data");
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Read existing RSVPs
    const rsvpFile = path.join(dataDir, "rsvps.json");
    let rsvps = [];
    
    try {
      const existingData = await fs.readFile(rsvpFile, "utf-8");
      rsvps = JSON.parse(existingData);
    } catch {
      // File doesn't exist yet, start with empty array
    }

    // Add new RSVP
    rsvps.push(rsvpData);

    // Write back to file
    await fs.writeFile(rsvpFile, JSON.stringify(rsvps, null, 2));

    // Optional: Send to webhook if WEBHOOK_URL is configured
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "rsvp",
            data: rsvpData,
          }),
        });
      } catch (error) {
        console.error("Webhook error:", error);
        // Don't fail the request if webhook fails
      }
    }

    return NextResponse.json(
      { success: true, message: "RSVP submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("RSVP submission error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid form data", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve RSVPs (for admin purposes)
export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), "data");
    const rsvpFile = path.join(dataDir, "rsvps.json");
    
    try {
      const data = await fs.readFile(rsvpFile, "utf-8");
      const rsvps = JSON.parse(data);
      
      return NextResponse.json({ success: true, rsvps }, { status: 200 });
    } catch {
      return NextResponse.json({ success: true, rsvps: [] }, { status: 200 });
    }
  } catch (error) {
    console.error("Error retrieving RSVPs:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
