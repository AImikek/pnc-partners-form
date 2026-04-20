import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const fields: Record<string, any> = {
      "First Name": data.firstName || "",
      "Last Name": data.lastName || "",
      Email: data.email || "",
      Phone: data.phone || "",
      "Company Name": data.organizationName || "",
      "Role Type": "Sponsor",
      Instagram: data.instagram || "",
      TikTok: data.tiktok || "",
      Website: data.website || "",
      "Referral Source": data.referralSource || "",
      "Uses Whatsapp": data.usesWhatsApp || "",
      "Business Type": Array.isArray(data.businessType) ? data.businessType : [],
      Offerings: data.offerings || "",
      "Total Following": data.totalFollowing || "",
      "Primary Link": data.primaryLink || "",
      "Brand Emoji": data.brandEmoji || "",
      "Marketing Budget": data.marketingBudget || "",
      "Staff Count": data.staffCount || "",
      "Logo Assets": data.logoAssets || "",
      "Content Assets": data.contentAssets || "",
    };

    const res = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(
        process.env.AIRTABLE_SPONSOR_TABLE as string
      )}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typecast: true,
          records: [{ fields }],
        }),
      }
    );

    const json = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: json }, { status: 500 });
    }

    return NextResponse.json({ success: true, airtable: json });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
