import { NextResponse } from "next/server";

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_SPONSOR_TABLE = process.env.AIRTABLE_SPONSOR_TABLE;

export async function POST(req: Request) {
  if (!AIRTABLE_BASE_ID || !AIRTABLE_TOKEN || !AIRTABLE_SPONSOR_TABLE) {
    console.error("Missing Airtable env vars:", {
      AIRTABLE_BASE_ID: !!AIRTABLE_BASE_ID,
      AIRTABLE_TOKEN: !!AIRTABLE_TOKEN,
      AIRTABLE_SPONSOR_TABLE: !!AIRTABLE_SPONSOR_TABLE,
    });
    return NextResponse.json(
      { error: "Server misconfiguration: missing Airtable credentials" },
      { status: 500 }
    );
  }

  try {
    const data = await req.json();

    // Log exactly what we're hitting so you can verify in Vercel function logs
    console.log("Airtable target:", {
      baseId: AIRTABLE_BASE_ID,
      table: AIRTABLE_SPONSOR_TABLE,
    });

    const fields: Record<string, any> = {
      "First Name": data.firstName || "",
      "Last Name": data.lastName || "",
      Email: data.email || "",
      Phone: data.phone || "",
      "Company Name": data.organizationName || "",
      "Role Type": data.partnerType || "",
      Instagram: data.instagram || "",
      TikTok: data.tiktok || "",
      Website: data.website || "",
      "Referral Source": data.referralSource || "",
      "Uses Whatsapp": data.usesWhatsApp || "",
      "Submitted At": new Date().toISOString(),
    };

    if (data.businessType?.length) {
      fields["Business Type"] = Array.isArray(data.businessType)
        ? data.businessType
        : [data.businessType];
    }
    if (data.offerings) fields["Offerings"] = data.offerings;
    if (data.totalFollowing) fields["Total Following"] = data.totalFollowing;
    if (data.primaryLink) fields["Primary Link"] = data.primaryLink;
    if (data.brandEmoji) fields["Brand Emoji"] = data.brandEmoji;
    if (data.marketingBudget) fields["Marketing Budget"] = data.marketingBudget;
    if (data.logoAssets) fields["Logo Assets"] = data.logoAssets;
    if (data.contentAssets) fields["Content Assets"] = data.contentAssets;

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_SPONSOR_TABLE)}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typecast: true,
        records: [{ fields }],
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      console.error("Airtable error response:", JSON.stringify(json));
      return NextResponse.json({ error: json }, { status: 500 });
    }

    return NextResponse.json({ success: true, airtable: json });
  } catch (error) {
    console.error("Partner form route error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
