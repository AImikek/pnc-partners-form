"use client";

import { useState } from "react";

const partnerTypes = [
  "Sponsor / Vendor",
  "Venue",
  "Instructor / Fitness",
  "DJ",
  "Host",
  "Influencer / Promoter",
  "Community / Run Club",
  "Creative (Photo / Video)",
  "Agency",
  "Animal Shelter",
  "Other",
];

const businessTypeOptions = [
  "Coffee",
  "Cold Plunge",
  "DJ",
  "Food",
  "Gym",
  "IV / Health & Wellness",
  "Juice",
  "Massage",
  "Other",
  "Paint",
  "Pilates",
  "Stretch",
  "Talent",
  "Video/Photographer",
  "Yoga",
  "pet brand",
  "Supplements",
];

const marketingBudgetOptions = [
  "$0-$500",
  "$500-$5000",
  "$5000-$50000",
  "$50,000+",
];

export default function Page() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organizationName: "",
    partnerType: "",
    businessType: [] as string[],
    marketingBudget: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiToggle = (field: string, value: string) => {
    setFormData((prev: any) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((v: string) => v !== value)
          : [...prev[field], value],
      };
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Partner With Pups N Chill</h1>

      <input placeholder="First Name" onChange={(e) => handleChange("firstName", e.target.value)} />
      <input placeholder="Last Name" onChange={(e) => handleChange("lastName", e.target.value)} />
      <input placeholder="Email" onChange={(e) => handleChange("email", e.target.value)} />
      <input placeholder="Phone" onChange={(e) => handleChange("phone", e.target.value)} />
      <input placeholder="Organization Name" onChange={(e) => handleChange("organizationName", e.target.value)} />

      <br /><br />

      <select onChange={(e) => handleChange("partnerType", e.target.value)}>
        <option>Select Role</option>
        {partnerTypes.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      {formData.partnerType === "Sponsor / Vendor" && (
        <>
          <h3>Business Type</h3>
          {businessTypeOptions.map((opt) => (
            <label key={opt} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={formData.businessType.includes(opt)}
                onChange={() => handleMultiToggle("businessType", opt)}
              />
              {opt}
            </label>
          ))}

          <h3>Marketing Budget</h3>
          <select onChange={(e) => handleChange("marketingBudget", e.target.value)}>
            <option>Select Budget</option>
            {marketingBudgetOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
