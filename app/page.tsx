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
    instagram: "",
    tiktok: "",
    website: "",
    referralSource: "",
    usesWhatsApp: "",
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiToggle = (field: string, value: string) => {
    setFormData((prev: any) => {
      const current = prev[field] as string[];
      const exists = current.includes(value);
      return {
        ...prev,
        [field]: exists
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/forms/partners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`Error: ${JSON.stringify(data.error || data)}`);
      } else {
        setMessage("Success! Submission received.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-4xl font-semibold mb-2">Partner With Pups N Chill</h1>
        <p className="text-white/70 mb-8">
          Sponsors, venues, instructors, DJs, creators, communities, shelters, and more.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="First Name">
              <input
                className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </Field>

            <Field label="Last Name">
              <input
                className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </Field>

            <Field label="Email">
              <input
                className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Field>

            <Field label="Phone">
              <input
                className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </Field>

            <div className="md:col-span-2">
              <Field label="Company, Brand, or Organization Name">
                <input
                  className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                  value={formData.organizationName}
                  onChange={(e) => handleChange("organizationName", e.target.value)}
                />
              </Field>
            </div>

            <Field label="What best describes you?">
              <select
                className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                value={formData.partnerType}
                onChange={(e) => handleChange("partnerType", e.target.value)}
              >
                <option value="">Select Role</option>
                {partnerTypes.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Instagram">
              <input
                className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                value={formData.instagram}
                onChange={(e) => handleChange("instagram", e.target.value)}
              />
            </Field>

            <Field label="TikTok">
              <input
                className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                value={formData.tiktok}
                onChange={(e) => handleChange("tiktok", e.target.value)}
              />
            </Field>

            <Field label="Website">
              <input
                className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            </Field>

            <Field label="Referral Source">
              <input
                className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                value={formData.referralSource}
                onChange={(e) => handleChange("referralSource", e.target.value)}
              />
            </Field>

            <Field label="Uses WhatsApp">
              <select
                className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                value={formData.usesWhatsApp}
                onChange={(e) => handleChange("usesWhatsApp", e.target.value)}
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </Field>
          </section>

          {formData.partnerType === "Sponsor / Vendor" && (
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">Partnership Details</h2>

              <Field label="Business Type">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl border border-white/15 bg-neutral-950 p-4">
                  {businessTypeOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.businessType.includes(opt)}
                        onChange={() => handleMultiToggle("businessType", opt)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="What do you offer?">
                <textarea
                  className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 min-h-[120px]"
                  value={formData.offerings}
                  onChange={(e) => handleChange("offerings", e.target.value)}
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Total Following">
                  <input
                    className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                    value={formData.totalFollowing}
                    onChange={(e) => handleChange("totalFollowing", e.target.value)}
                  />
                </Field>

                <Field label="Primary Link">
                  <input
                    className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                    value={formData.primaryLink}
                    onChange={(e) => handleChange("primaryLink", e.target.value)}
                  />
                </Field>

                <Field label="Brand Emoji">
                  <input
                    className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                    value={formData.brandEmoji}
                    onChange={(e) => handleChange("brandEmoji", e.target.value)}
                  />
                </Field>

                <Field label="Marketing Budget">
                  <select
                    className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                    value={formData.marketingBudget}
                    onChange={(e) => handleChange("marketingBudget", e.target.value)}
                  >
                    <option value="">Select Budget</option>
                    {marketingBudgetOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Staff Count">
                  <input
                    className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                    value={formData.staffCount}
                    onChange={(e) => handleChange("staffCount", e.target.value)}
                  />
                </Field>

                <Field label="Logo Assets (URL)">
                  <input
                    className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                    value={formData.logoAssets}
                    onChange={(e) => handleChange("logoAssets", e.target.value)}
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field label="Content Assets (URL)">
                    <input
                      className="w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3"
                      value={formData.contentAssets}
                      onChange={(e) => handleChange("contentAssets", e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            </section>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-cyan-400 px-5 py-4 text-base font-semibold text-black transition hover:bg-cyan-300 disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            {message ? <p className="text-sm text-white/80">{message}</p> : null}
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <div className="text-sm text-white/80">{label}</div>
      {children}
    </label>
  );
}
