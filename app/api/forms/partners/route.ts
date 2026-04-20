import { NextResponse } from "next/server";

type PartnerType =
  | "Sponsor / Vendor"
  | "Venue"
  | "Instructor / Fitness"
  | "DJ"
  | "Host"
  | "Influencer / Promoter"
  | "Community / Run Club"
  | "Creative (Photo / Video)"
  | "Agency"
  | "Animal Shelter"
  | "Other";

type Payload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  organizationName?: string;
  partnerType?: PartnerType;
  instagram?: string;
  tiktok?: string;
  website?: string;
  referralSource?: string;
  usesWhatsApp?: string;
  businessType?: string;
  offerings?: string;
  totalFollowing?: string;
  primaryLink?: string;
  brandEmoji?: string;
  marketingBudget?: string;
  staffCount?: string;
  logoAssets?: string;
  contentAssets?: string;
  city?: string;
  state?: string;
  capacity?: string;
  indoorOutdoor?: string;
  venueDetails?: string;
  classTypes?: string[];
  setTypes?: string;
  mixesLink?: string;
  hostType?: string;
  contentType?: string;
  promotionStyle?: string;
  communityType?: string;
  audienceSize?: string;
  eventFrequency?: string;
  creativeType?: string;
  portfolioLink?: string;
  agencyType?: string;
  represented?: string;
  partnershipType?: string;
  notes?: string;
};

function routePartnerType(partnerType?: PartnerType) {
  switch (partnerType) {
    case "Sponsor / Vendor":
  return (
    <>
      <MultiCheckbox
        label="Business Type"
        options={businessTypeOptions}
        field="businessType"
        formData={formData}
        onToggle={handleMultiToggle}
      />

      <TextArea
        label="What do you offer?"
        field="offerings"
        formData={formData}
        onChange={handleChange}
      />

      <TextInput
        label="Total Following"
        field="totalFollowing"
        formData={formData}
        onChange={handleChange}
      />

      <TextInput
        label="Primary Link"
        field="primaryLink"
        formData={formData}
        onChange={handleChange}
      />

      <TextInput
        label="Brand Emoji"
        field="brandEmoji"
        formData={formData}
        onChange={handleChange}
      />

      <SelectInput
        label="Marketing Budget"
        field="marketingBudget"
        options={marketingBudgetOptions}
        formData={formData}
        onChange={handleChange}
      />

      <TextInput
        label="Staff Count"
        field="staffCount"
        formData={formData}
        onChange={handleChange}
      />

      <TextInput
        label="Logo Assets"
        field="logoAssets"
        formData={formData}
        onChange={handleChange}
      />

      <TextInput
        label="Content Assets"
        field="contentAssets"
        formData={formData}
        onChange={handleChange}
      />
    </>
  );
    case "Venue":
    case "Agency":
    case "Animal Shelter":
    case "Other":
      return process.env.AIRTABLE_SPONSOR_TABLE!;
    case "Instructor / Fitness":
    case "DJ":
    case "Creative (Photo / Video)":
      return process.env.AIRTABLE_TALENT_TABLE!;
    case "Host":
    case "Influencer / Promoter":
    case "Community / Run Club":
      return process.env.AIRTABLE_PROMO_TABLE!;
    default:
      return process.env.AIRTABLE_SPONSOR_TABLE!;
  }
}

function buildFields(data: Payload) {
  const commonFields: Record<string, unknown> = {
    "First Name": data.firstName || "",
    "Last Name": data.lastName || "",
    Email: data.email || "",
    "Phone Number": data.phone || "",
    "Company Name": data.organizationName || "",
    "Role Type": data.partnerType || "",
    Instagram: data.instagram || "",
    TikTok: data.tiktok || "",
    Website: data.website || "",
    "Referral Source": data.referralSource || "",
    "Uses Whatsapp": data.usesWhatsApp || "",
  };

  switch (data.partnerType) {
    case "Sponsor / Vendor":
      return {
        ...commonFields,
        "Business Type": data.businessType || "",
        Offerings: data.offerings || "",
        "Total Following": data.totalFollowing || "",
        "Primary Link": data.primaryLink || "",
        "Brand Emoji": data.brandEmoji || "",
        "Marketing Budget": data.marketingBudget || "",
        "Staff Count": data.staffCount || "",
        "Logo Assets": data.logoAssets || "",
        "Content Assets": data.contentAssets || "",
      };

    case "Venue":
      return {
        ...commonFields,
        City: data.city || "",
        State: data.state || "",
        Capacity: data.capacity || "",
        "Primary Link": data.primaryLink || "",
        "Total Following": data.totalFollowing || "",
        Notes: [
          data.indoorOutdoor ? `Indoor/Outdoor: ${data.indoorOutdoor}` : "",
          data.venueDetails ? `Venue Details: ${data.venueDetails}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      };

    case "Instructor / Fitness":
      return {
        ...commonFields,
        City: data.city || "",
        State: data.state || "",
        "Total Following": data.totalFollowing || "",
        "What are you?": data.classTypes || [],
        "Internal Notes": data.notes || "",
      };

    case "DJ":
      return {
        ...commonFields,
        City: data.city || "",
        State: data.state || "",
        "Total Following": data.totalFollowing || "",
        "Anything additional that you want us to know?":
          [
            data.setTypes ? `Set Types: ${data.setTypes}` : "",
            data.mixesLink ? `Mixes: ${data.mixesLink}` : "",
            data.notes || "",
          ]
            .filter(Boolean)
            .join("\n"),
      };

    case "Creative (Photo / Video)":
      return {
        ...commonFields,
        City: data.city || "",
        State: data.state || "",
        "What are you?": data.creativeType ? [data.creativeType] : [],
        "Anything additional that you want us to know?":
          [data.portfolioLink ? `Portfolio: ${data.portfolioLink}` : "", data.notes || ""]
            .filter(Boolean)
            .join("\n"),
      };

    case "Host":
    case "Influencer / Promoter":
    case "Community / Run Club":
      return {
        ...commonFields,
        City: data.city || "",
        State: data.state || "",
        "Total Following": data.totalFollowing || "",
        "Primary Link": data.primaryLink || "",
        Notes: [
          data.hostType ? `Host Type: ${data.hostType}` : "",
          data.contentType ? `Content Type: ${data.contentType}` : "",
          data.promotionStyle ? `Promotion Style: ${data.promotionStyle}` : "",
          data.communityType ? `Community Type: ${data.communityType}` : "",
          data.audienceSize ? `Audience Size: ${data.audienceSize}` : "",
          data.eventFrequency ? `Event Frequency: ${data.eventFrequency}` : "",
          data.notes || "",
        ]
          .filter(Boolean)
          .join("\n"),
      };

    case "Agency":
      return {
        ...commonFields,
        City: data.city || "",
        State: data.state || "",
        "Primary Link": data.primaryLink || "",
        Notes: [
          data.agencyType ? `Agency Type: ${data.agencyType}` : "",
          data.represented ? `Represented: ${data.represented}` : "",
          data.notes || "",
        ]
          .filter(Boolean)
          .join("\n"),
      };

    case "Animal Shelter":
      return {
        ...commonFields,
        City: data.city || "",
        State: data.state || "",
        "Primary Link": data.primaryLink || "",
        Notes: [
          data.partnershipType ? `Partnership Type: ${data.partnershipType}` : "",
          data.notes || "",
        ]
          .filter(Boolean)
          .join("\n"),
      };

    case "Other":
    default:
      return {
        ...commonFields,
        Notes: data.notes || "",
      };
  }
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Payload;

    if (!data.firstName || !data.lastName || !data.email || !data.partnerType) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const tableName = routePartnerType(data.partnerType);
    const fields = buildFields(data);

    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(
        tableName
      )}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [{ fields }],
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Airtable error", details: result },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected server error", details: String(error) },
      { status: 500 }
    );
  }
}
