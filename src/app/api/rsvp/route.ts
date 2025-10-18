import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";


const rsvpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  attendance: z.enum(["yes", "no"]),
  diet: z.string().optional(),
  allergies: z.string().optional(),
  message: z.string().optional(),
});

// Email configuration
const createTransporter = () => {
  console.log('NEXT_PUBLIC_EMAIL_USER:', process.env.NEXT_PUBLIC_EMAIL_USER ? 'Set' : 'Not set');
  console.log('NEXT_PUBLIC_EMAIL_PASS:', process.env.NEXT_PUBLIC_EMAIL_PASS ? 'Set' : 'Not set');
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },
  });
};

const sendRSVPEmail = async (rsvpData: {
  name: string;
  email: string;
  attendance: string;
  diet?: string;
  allergies?: string;
  message?: string;
  submittedAt: string;
}) => {
  const transporter = createTransporter();
  
  const attendanceText = rsvpData.attendance === 'yes' ? 'TAK' : 'NIE';
  const dietText = rsvpData.diet ? {
    'normal': 'Zwykła',
    'vegetarian': 'Wegetariańska', 
    'vegan': 'Wegańska'
  }[rsvpData.diet] || rsvpData.diet : 'Nie podano';
  
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL_USER || 'paweluhma136@gmail.com',
    to: 'paweluhma136@gmail.com',
    subject: `🎉 Nowa odpowiedź RSVP - ${rsvpData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #e91e63; text-align: center; margin-bottom: 30px;">🎉 Nowa odpowiedź RSVP</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Informacje o gościu:</h3>
            <p><strong>Imię i nazwisko:</strong> ${rsvpData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${rsvpData.email}" style="color: #e91e63;">${rsvpData.email}</a></p>
            <p><strong>Obecność:</strong> <span style="color: ${rsvpData.attendance === 'yes' ? '#28a745' : '#dc3545'}; font-weight: bold;">${attendanceText}</span></p>
            ${rsvpData.attendance === 'yes' ? `<p><strong>Preferencje żywieniowe:</strong> ${dietText}</p>` : ''}
          </div>
          
          ${rsvpData.allergies ? `
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #ffc107;">
            <h4 style="color: #856404; margin-top: 0;">⚠️ Alergie pokarmowe:</h4>
            <p style="color: #856404; margin-bottom: 0;">${rsvpData.allergies}</p>
          </div>
          ` : ''}
          
          ${rsvpData.message ? `
          <div style="background-color: #d1ecf1; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #17a2b8;">
            <h4 style="color: #0c5460; margin-top: 0;">💌 Wiadomość:</h4>
            <p style="color: #0c5460; margin-bottom: 0; font-style: italic;">"${rsvpData.message}"</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              Odpowiedź została wysłana: ${new Date(rsvpData.submittedAt).toLocaleString('pl-PL')}
            </p>
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export async function POST(request: NextRequest) {
  try {
    console.log("RSVP API called");
    const body = await request.json();
    console.log("Request body:", body);
    
    // Validate the request body
    const validatedData = rsvpSchema.parse(body);
    console.log("Validated data:", validatedData);
    
    // Add timestamp
    const rsvpData = {
      ...validatedData,
      submittedAt: new Date().toISOString(),
    };

    // Check if environment variables are available
    if (!process.env.NEXT_PUBLIC_EMAIL_USER || !process.env.NEXT_PUBLIC_EMAIL_PASS) {
      console.error("Missing environment variables");
      return NextResponse.json(
        { success: false, message: "Email configuration missing" },
        { status: 500 }
      );
    }

    // Send email notification
    try {
      await sendRSVPEmail(rsvpData);
      console.log("RSVP email sent successfully");
    } catch (error) {
      console.error("Email sending error:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      return NextResponse.json(
        { success: false, message: "Failed to send email", error: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }

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

// Test endpoint to check if API is working
export async function GET() {
  return NextResponse.json(
    { 
      success: true, 
      message: "RSVP API is working",
      envCheck: {
        emailUser: process.env.NEXT_PUBLIC_EMAIL_USER ? 'Set' : 'Not set',
        emailPass: process.env.NEXT_PUBLIC_EMAIL_PASS ? 'Set' : 'Not set'
      }
    },
    { status: 200 }
  );
}

