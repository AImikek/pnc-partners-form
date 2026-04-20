import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const fields: any = {
      "First Name": data.firstName,
      "Last Name": data.lastName,
      Email: data.email,
      Phone: data.phone,
      "Organization Name": data.organizationName,
      "Partner Type": data.partnerType,
    };

    if (data.partnerType === "Sponsor / Vendor") {
      fields["Business Type"] = Array.isArray(data.businessType)
        ? data.businessType
        : [];

      fields["Offerings"] = data.offerings || "";
      fields["Total Following"] = data.totalFollowing || "";
      fields["Primary Link"] = data.primaryLink || "";
      fields["Brand Emoji"] = data.brandEmoji || "";
      fields["Marketing Budget"] = data.marketingBudget || "";
      fields["Staff Count"] = data.staffCount || "";
      fields["Logo Assets"] = data.logoAssets || "";
      fields["Content Assets"] = data.contentAssets || "";
    }

    const res = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_SPONSOR_TABLE}`,
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
      return NextResponse.json(
        { error: json },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
