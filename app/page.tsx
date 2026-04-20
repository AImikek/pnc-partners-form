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
    offerings: "",
    totalFollowing: "",
    primaryLink: "",
    brandEmoji: "",
    marketingBudget: "",
    staffCount: "",
    logoAssets: "",
    contentAssets: "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiToggle = (field: string, value: string) => {
    setFormData((prev) => {
      const current = prev[field as keyof typeof prev] as string[];
      if (current.includes(value)) {
        return {
          ...prev,
          [field]: current.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [field]: [...current, value],
        };
      }
    });
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/forms/partners", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Error: " + data.error);
    } else {
      alert("Success!");
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 600 }}>
      <h1>Partner With Pups N Chill</h1>

      <input
        placeholder="First Name"
        onChange={(e) => handleChange("firstName", e.target.value)}
      />

      <input
        placeholder="Last Name"
        onChange={(e) => handleChange("lastName", e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <input
        placeholder="Phone"
        onChange={(e) => handleChange("phone", e.target.value)}
      />

      <input
        placeholder="Organization Name"
        onChange={(e) =>
          handleChange("organizationName", e.target.value)
        }
      />

      <select
        onChange={(e) =>
          handleChange("partnerType", e.target.value)
        }
      >
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
                onChange={() =>
                  handleMultiToggle("businessType", opt)
                }
              />
              {opt}
            </label>
          ))}

          <textarea
            placeholder="What do you offer?"
            onChange={(e) =>
              handleChange("offerings", e.target.value)
            }
          />

          <input
            placeholder="Total Following"
            onChange={(e) =>
              handleChange("totalFollowing", e.target.value)
            }
          />

          <input
            placeholder="Primary Link"
            onChange={(e) =>
              handleChange("primaryLink", e.target.value)
            }
          />

          <input
            placeholder="Brand Emoji"
            onChange={(e) =>
              handleChange("brandEmoji", e.target.value)
            }
          />

          <select
            onChange={(e) =>
              handleChange("marketingBudget", e.target.value)
            }
          >
            <option>Select Marketing Budget</option>
            {marketingBudgetOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          <input
            placeholder="Staff Count"
            onChange={(e) =>
              handleChange("staffCount", e.target.value)
            }
          />

          <input
            placeholder="Logo Assets (URL)"
            onChange={(e) =>
              handleChange("logoAssets", e.target.value)
            }
          />

          <input
            placeholder="Content Assets (URL)"
            onChange={(e) =>
              handleChange("contentAssets", e.target.value)
            }
          />
        </>
      )}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
