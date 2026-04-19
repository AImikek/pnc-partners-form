"use client";

import { useMemo, useState } from "react";

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

const partnerOptions: PartnerType[] = [
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

const classTypes = [
  "Yoga",
  "Pilates",
  "HIIT",
  "Boxing",
  "Strength Training",
  "Breathwork",
  "Mobility / Stretching",
  "Meditation",
  "Sound Bath",
  "Other",
];

const creativeTypes = ["Photographer", "Videographer", "Both"];
const indoorOutdoorOptions = ["Indoor", "Outdoor", "Both"];
const communityTypes = [
  "Run Club",
  "Fitness Group",
  "Wellness Community",
  "Nightlife / Events",
  "Other",
];

type FormDataState = Record<string, string | string[]>;

const initialFormData: FormDataState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organizationName: "",
  instagram: "",
  tiktok: "",
  website: "",
  referralSource: "",
  usesWhatsApp: "",
  businessType: "",
  offerings: "",
  totalFollowing: "",
  primaryLink: "",
  brandEmoji: "",
  marketingBudget: "",
  staffCount: "",
  logoAssets: "",
  contentAssets: "",
  city: "",
  state: "",
  capacity: "",
  indoorOutdoor: "",
  venueDetails: "",
  classTypes: [],
  setTypes: "",
  mixesLink: "",
  hostType: "",
  contentType: "",
  promotionStyle: "",
  communityType: "",
  audienceSize: "",
  eventFrequency: "",
  creativeType: "",
  portfolioLink: "",
  agencyType: "",
  represented: "",
  partnershipType: "",
  notes: "",
};

export default function Home() {
  const [partnerType, setPartnerType] = useState<PartnerType | "">("");
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (key: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleMultiToggle = (key: string, value: string) => {
    const current = Array.isArray(formData[key]) ? (formData[key] as string[]) : [];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    handleChange(key, next);
  };

  const conditionalFields = useMemo(() => {
    switch (partnerType) {
      case "Sponsor / Vendor":
        return (
          <>
            <TextInput label="Business Type" field="businessType" formData={formData} onChange={handleChange} />
            <TextArea label="What do you offer?" field="offerings" formData={formData} onChange={handleChange} />
            <TextInput label="Total Following" field="totalFollowing" formData={formData} onChange={handleChange} />
            <TextInput label="Primary Link" field="primaryLink" formData={formData} onChange={handleChange} />
            <TextInput label="Brand Emoji" field="brandEmoji" formData={formData} onChange={handleChange} />
            <TextInput label="Marketing Budget" field="marketingBudget" formData={formData} onChange={handleChange} />
            <TextInput label="Staff Count" field="staffCount" formData={formData} onChange={handleChange} />
            <TextInput label="Logo Assets" field="logoAssets" formData={formData} onChange={handleChange} />
            <TextInput label="Content Assets" field="contentAssets" formData={formData} onChange={handleChange} />
          </>
        );
      case "Venue":
        return (
          <>
            <TextInput label="City" field="city" formData={formData} onChange={handleChange} />
            <TextInput label="State" field="state" formData={formData} onChange={handleChange} />
            <TextInput label="Capacity" field="capacity" formData={formData} onChange={handleChange} />
            <SelectInput
              label="Indoor / Outdoor / Both"
              field="indoorOutdoor"
              options={indoorOutdoorOptions}
              formData={formData}
              onChange={handleChange}
            />
            <TextInput label="Primary Link" field="primaryLink" formData={formData} onChange={handleChange} />
            <TextInput label="Total Following" field="totalFollowing" formData={formData} onChange={handleChange} />
            <TextArea
              label="Best Details About Your Venue"
              helper="Tell us about amenities like pool, jacuzzi, cold plunge, sauna, food, drinks, etc."
              field="venueDetails"
              formData={formData}
              onChange={handleChange}
            />
          </>
        );
      case "Instructor / Fitness":
        return (
          <>
            <MultiCheckbox
              label="Class Types"
              options={classTypes}
              field="classTypes"
              formData={formData}
              onToggle={handleMultiToggle}
            />
            <TextInput label="Total Following" field="totalFollowing" formData={formData} onChange={handleChange} />
            <TextInput label="City" field="city" formData={formData} onChange={handleChange} />
            <TextInput label="State" field="state" formData={formData} onChange={handleChange} />
            <TextArea label="Anything else you want us to know" field="notes" formData={formData} onChange={handleChange} />
          </>
        );
      case "DJ":
        return (
          <>
            <TextInput label="What kind of sets do you play?" field="setTypes" formData={formData} onChange={handleChange} />
            <TextInput label="Total Following" field="totalFollowing" formData={formData} onChange={handleChange} />
            <TextInput label="City" field="city" formData={formData} onChange={handleChange} />
            <TextInput label="State" field="state" formData={formData} onChange={handleChange} />
            <TextInput label="Link to mixes / performances" field="mixesLink" formData={formData} onChange={handleChange} />
            <TextArea label="Anything else you want us to know" field="notes" formData={formData} onChange={handleChange} />
          </>
        );
      case "Host":
        return (
          <>
            <TextInput label="What type of events or experiences do you host?" field="hostType" formData={formData} onChange={handleChange} />
            <TextInput label="Total Following" field="totalFollowing" formData={formData} onChange={handleChange} />
            <TextInput label="City" field="city" formData={formData} onChange={handleChange} />
            <TextInput label="State" field="state" formData={formData} onChange={handleChange} />
            <TextArea label="Anything else you want us to know" field="notes" formData={formData} onChange={handleChange} />
          </>
        );
      case "Influencer / Promoter":
        return (
          <>
            <TextInput label="What type of content or promotion do you do?" field="contentType" formData={formData} onChange={handleChange} />
            <TextInput label="Total Following" field="totalFollowing" formData={formData} onChange={handleChange} />
            <TextInput label="City" field="city" formData={formData} onChange={handleChange} />
            <TextInput label="State" field="state" formData={formData} onChange={handleChange} />
            <TextArea label="How do you usually promote events?" field="promotionStyle" formData={formData} onChange={handleChange} />
            <TextArea label="Anything else you want us to know" field="notes" formData={formData} onChange={handleChange} />
          </>
        );
      case "Community / Run Club":
        return (
          <>
            <SelectInput
              label="What type of community do you run?"
              field="communityType"
              options={communityTypes}
              formData={formData}
              onChange={handleChange}
            />
            <TextInput label="Total Following" field="totalFollowing" formData={formData} onChange={handleChange} />
            <TextInput label="Approx audience size" field="audienceSize" formData={formData} onChange={handleChange} />
            <TextInput label="City" field="city" formData={formData} onChange={handleChange} />
            <TextInput label="State" field="state" formData={formData} onChange={handleChange} />
            <TextInput label="How often do you host events or meetups?" field="eventFrequency" formData={formData} onChange={handleChange} />
            <TextArea label="Anything else you want us to know" field="notes" formData={formData} onChange={handleChange} />
          </>
        );
      case "Creative (Photo / Video)":
        return (
          <>
            <SelectInput
              label="Creative Type"
              field="creativeType"
              options={creativeTypes}
              formData={formData}
              onChange={handleChange}
            />
            <TextInput label="Portfolio Link" field="portfolioLink" formData={formData} onChange={handleChange} />
            <TextInput label="City" field="city" formData={formData} onChange={handleChange} />
            <TextInput label="State" field="state" formData={formData} onChange={handleChange} />
            <TextArea label="Anything else you want us to know" field="notes" formData={formData} onChange={handleChange} />
          </>
        );
      case "Agency":
        return (
          <>
            <TextInput label="Agency Type" field="agencyType" formData={formData} onChange={handleChange} />
            <TextArea label="Who do you represent?" field="represented" formData={formData} onChange={handleChange} />
            <TextInput label="City" field="city" formData={formData} onChange={handleChange} />
            <TextInput label="State" field="state" formData={formData} onChange={handleChange} />
            <TextInput label="Primary Link" field="primaryLink" formData={formData} onChange={handleChange} />
            <TextArea label="Anything else you want us to know" field="notes" formData={formData} onChange={handleChange} />
          </>
        );
      case "Animal Shelter":
        return (
          <>
            <TextInput label="City" field="city" formData={formData} onChange={handleChange} />
            <TextInput label="State" field="state" formData={formData} onChange={handleChange} />
            <TextInput label="Primary Link" field="primaryLink" formData={formData} onChange={handleChange} />
            <TextArea label="What type of partnership are you looking for?" field="partnershipType" formData={formData} onChange={handleChange} />
            <TextArea label="Anything else you want us to know" field="notes" formData={formData} onChange={handleChange} />
          </>
        );
      case "Other":
        return <TextArea label="Tell us more" field="notes" formData={formData} onChange={handleChange} />;
      default:
        return null;
    }
  }, [partnerType, formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const payload = {
        ...formData,
        partnerType,
      };

      const response = await fetch("/api/forms/partners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Submission failed");
      }

      setSubmitMessage("Thanks — your submission was received.");
      setFormData(initialFormData);
      setPartnerType("");
    } catch {
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-14">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-300">
            Pups N Chill
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Partner With Pups N Chill
          </h1>
          <p className="mt-4 max-w-2xl text-base text-neutral-300 sm:text-lg">
            Sponsors, venues, instructors, DJs, creators, communities, shelters,
            and more — tell us how you’d like to collaborate.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur"
        >
          <section className="space-y-5">
            <h2 className="text-xl font-semibold">Basic Information</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput label="First Name" field="firstName" formData={formData} onChange={handleChange} />
              <TextInput label="Last Name" field="lastName" formData={formData} onChange={handleChange} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput label="Email" field="email" formData={formData} onChange={handleChange} />
              <TextInput label="Phone Number" field="phone" formData={formData} onChange={handleChange} />
            </div>

            <TextInput
              label="Company, Brand, or Organization Name"
              field="organizationName"
              formData={formData}
              onChange={handleChange}
            />

            <SelectInput
              label="What best describes you?"
              field="partnerType"
              options={partnerOptions}
              formData={{ ...formData, partnerType }}
              onChange={(_, value) => setPartnerType(value as PartnerType)}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput label="Instagram" field="instagram" formData={formData} onChange={handleChange} />
              <TextInput label="TikTok" field="tiktok" formData={formData} onChange={handleChange} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput label="Website" field="website" formData={formData} onChange={handleChange} />
              <TextInput label="Referral Source" field="referralSource" formData={formData} onChange={handleChange} />
            </div>

            <SelectInput
              label="Uses WhatsApp"
              field="usesWhatsApp"
              options={["Yes", "No"]}
              formData={formData}
              onChange={handleChange}
            />
          </section>

          {partnerType && (
            <section className="space-y-5">
              <h2 className="text-xl font-semibold">Partnership Details</h2>
              {conditionalFields}
            </section>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-cyan-400 px-5 py-4 text-base font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            {submitMessage ? (
              <p className="text-sm text-neutral-300">{submitMessage}</p>
            ) : null}
          </div>
        </form>
      </div>
    </main>
  );
}

function TextInput({
  label,
  field,
  formData,
  onChange,
}: {
  label: string;
  field: string;
  formData: Record<string, string | string[]>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-200">{label}</span>
      <input
        value={typeof formData[field] === "string" ? (formData[field] as string) : ""}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none ring-0 placeholder:text-neutral-500 focus:border-cyan-400"
      />
    </label>
  );
}

function TextArea({
  label,
  field,
  formData,
  onChange,
  helper,
}: {
  label: string;
  field: string;
  formData: Record<string, string | string[]>;
  onChange: (key: string, value: string) => void;
  helper?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-200">{label}</span>
      {helper ? <p className="mb-2 text-xs text-neutral-400">{helper}</p> : null}
      <textarea
        rows={4}
        value={typeof formData[field] === "string" ? (formData[field] as string) : ""}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none placeholder:text-neutral-500 focus:border-cyan-400"
      />
    </label>
  );
}

function SelectInput({
  label,
  field,
  options,
  formData,
  onChange,
}: {
  label: string;
  field: string;
  options: string[];
  formData: Record<string, string | string[]>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-200">{label}</span>
      <select
        value={typeof formData[field] === "string" ? (formData[field] as string) : ""}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function MultiCheckbox({
  label,
  options,
  field,
  formData,
  onToggle,
}: {
  label: string;
  options: string[];
  field: string;
  formData: Record<string, string | string[]>;
  onToggle: (field: string, value: string) => void;
}) {
  const selected = Array.isArray(formData[field]) ? (formData[field] as string[]) : [];

  return (
    <div>
      <span className="mb-3 block text-sm font-medium text-neutral-200">{label}</span>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-neutral-900 px-4 py-3"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(field, option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
