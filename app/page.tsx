"use client";

import { useState } from "react";

const LOGO_URL = "/PNCLogo_final.png";

const ROLE_OPTIONS = [
  { value: "Sponsor / Vendor", emoji: "🤝", label: "Sponsor / Vendor" },
  { value: "Venue", emoji: "📍", label: "Venue" },
  { value: "Instructor / Fitness", emoji: "⚡", label: "Instructor / Fitness" },
  { value: "DJ", emoji: "🎧", label: "DJ" },
  { value: "Host", emoji: "🎤", label: "Host" },
  { value: "Influencer / Promoter", emoji: "📱", label: "Influencer / Promoter" },
  { value: "Community / Run Club", emoji: "🏃", label: "Community / Run Club" },
  { value: "Creative (Photo / Video)", emoji: "📸", label: "Creative (Photo / Video)" },
  { value: "Agency", emoji: "🏢", label: "Agency" },
  { value: "Animal Shelter", emoji: "🐾", label: "Animal Shelter" },
  { value: "Other", emoji: "➕", label: "Other" },
];

const BUSINESS_TYPES = [
  "Coffee", "Cold Plunge", "DJ", "Food", "Gym",
  "IV / Health & Wellness", "Juice", "Massage", "Paint",
  "Pilates", "Stretch", "Supplements", "Talent",
  "Video/Photographer", "Yoga", "Pet Brand", "Other",
];

const BUDGET_OPTIONS = ["$0–$500", "$500–$5,000", "$5,000–$50,000", "$50,000+"];

const SPONSOR_ROLES = new Set(["Sponsor / Vendor", "Agency"]);
const SOCIAL_ROLES = new Set([
  "Influencer / Promoter", "Instructor / Fitness", "DJ", "Host",
  "Community / Run Club", "Creative (Photo / Video)", "Sponsor / Vendor", "Agency",
]);

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organizationName: string;
  partnerType: string;
  instagram: string;
  tiktok: string;
  website: string;
  referralSource: string;
  usesWhatsApp: string;
  businessType: string[];
  offerings: string;
  totalFollowing: string;
  primaryLink: string;
  brandEmoji: string;
  marketingBudget: string;
  logoAssets: string;
  contentAssets: string;
};

const EMPTY: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  organizationName: "", partnerType: "", instagram: "", tiktok: "",
  website: "", referralSource: "", usesWhatsApp: "", businessType: [],
  offerings: "", totalFollowing: "", primaryLink: "", brandEmoji: "",
  marketingBudget: "", logoAssets: "", contentAssets: "",
};

const STEPS = ["Your Role", "Contact Info", "Online Presence", "Event Details"];

const inputCls =
  "w-full rounded-2xl border border-[#5BC8F5]/40 bg-white px-4 py-3 text-[#1a2744] " +
  "placeholder:text-[#1a2744]/30 focus:border-[#5BC8F5] focus:outline-none " +
  "focus:ring-2 focus:ring-[#5BC8F5]/20 transition text-sm font-semibold";

const labelCls = "block text-sm font-bold text-[#1a2744]/70 mb-1.5";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className={labelCls}>
        {label}
        {required && <span className="ml-1 text-[#0e7bb5]">*</span>}
      </div>
      {children}
    </label>
  );
}

function ChipSelect({
  options,
  value,
  onSelect,
}: {
  options: { value: string; emoji: string; label: string }[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onSelect(opt.value)}
          className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition
            ${
              value === opt.value
                ? "border-[#5BC8F5] bg-[#5BC8F5] text-white shadow-md"
                : "border-[#5BC8F5]/30 bg-white text-[#1a2744]/60 hover:border-[#5BC8F5] hover:text-[#0e7bb5]"
            }`}
        >
          <span>{opt.emoji}</span>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function MultiChip({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onToggle(opt)}
          className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-bold transition
            ${
              selected.includes(opt)
                ? "border-[#C8955A] bg-[#C8955A] text-white shadow-md"
                : "border-[#C8955A]/30 bg-white text-[#1a2744]/60 hover:border-[#C8955A] hover:text-[#a0622a]"
            }`}
        >
          {selected.includes(opt) && <span className="text-xs">✓</span>}
          {opt}
        </button>
      ))}
    </div>
  );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-7">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-black uppercase tracking-widest text-[#0e7bb5]">
          Step {current} of {total}
        </span>
        <span className="text-xs font-semibold text-[#1a2744]/40">{STEPS[current - 1]}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[#5BC8F5]/15">
        <div
          className="h-1.5 rounded-full transition-all duration-500"
          style={{
            width: `${(current / total) * 100}%`,
            background: "linear-gradient(90deg, #0e7bb5, #5BC8F5)",
          }}
        />
      </div>
    </div>
  );
}

export default function Page() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const set = (field: keyof FormData, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const toggle = (field: keyof FormData, value: string) =>
    setForm((p) => {
      const cur = p[field] as string[];
      return {
        ...p,
        [field]: cur.includes(value)
          ? cur.filter((v) => v !== value)
          : [...cur, value],
      };
    });

  const clearErr = (field: string) =>
    setErrors((p) => {
      const n = { ...p };
      delete n[field];
      return n;
    });

  function scrollTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function validateStep(s: number): boolean {
    const e: Record<string, string> = {};
    if (s === 1 && !form.partnerType) e.partnerType = "Please select your role.";
    if (s === 2) {
      if (!form.firstName.trim()) e.firstName = "Required";
      if (!form.lastName.trim()) e.lastName = "Required";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
        e.email = "Valid email required";
      if (!form.phone.trim()) e.phone = "Required";
      if (!form.organizationName.trim()) e.organizationName = "Required";
      if (!form.usesWhatsApp) e.usesWhatsApp = "Required";
      if (!form.referralSource.trim()) e.referralSource = "Required";
    }
    if (s === 3) {
      if (!form.instagram.trim()) e.instagram = "Required";
      if (!form.website.trim()) e.website = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, STEPS.length));
      setTimeout(scrollTop, 50);
    }
  }

  function back() {
    setStep((s) => Math.max(s - 1, 1));
    setTimeout(scrollTop, 50);
  }

  async function submit() {
    if (!validateStep(step)) return;
    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/forms/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(
          typeof data.error === "string" ? data.error : JSON.stringify(data.error)
        );
      } else {
        setSubmitted(true);
        setTimeout(scrollTop, 50);
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const isSponsor = SPONSOR_ROLES.has(form.partnerType);
  const hasSocial = SOCIAL_ROLES.has(form.partnerType);

  if (submitted) {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center"
        style={{ background: "linear-gradient(160deg, #e8f7fd 0%, #f5ede0 100%)" }}
      >
        <img
          src={LOGO_URL}
          alt="Pups N Chill"
          className="mx-auto object-contain mb-4"
          style={{ height: "120px", width: "auto" }}
        />
        <div
          className="rounded-3xl px-8 py-10 max-w-md w-full"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(91,200,245,0.25)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 40px rgba(14,123,181,0.10)",
          }}
        >
          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
            style={{ background: "linear-gradient(135deg, #0e7bb5, #5BC8F5)" }}
          >
            🫶
          </div>
          <h1
            className="mb-3 text-2xl font-black text-[#1a2744]"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Application Received!
          </h1>
          <p className="text-[#1a2744]/60 leading-relaxed text-sm font-semibold">
            Thanks for applying to partner with Pups N Chill. We review every
            application within 48 hours — keep an eye on your inbox. 🐶
          </p>
          <div
            className="mt-6 rounded-2xl px-4 py-3 text-xs font-bold text-[#0e7bb5]"
            style={{ background: "rgba(91,200,245,0.1)" }}
          >
            pupsnchill.com · @pupsnchillmiami
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #e8f7fd 0%, #f5ede0 100%)" }}
    >
      <div className="px-6 pt-10 pb-6 text-center">
        <img
          src={LOGO_URL}
          alt="Pups N Chill"
          className="mx-auto object-contain mb-4"
          style={{ height: "120px", width: "auto" }}
        />
        <h1
          className="text-3xl font-black text-[#1a2744] sm:text-4xl"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Partner Application
        </h1>
        <p className="mt-2 text-sm text-[#1a2744]/50 font-semibold">
          Sponsors · Venues · Talent · Creatives · Shelters & more
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-4 pb-16">
        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{
            background: "rgba(255,255,255,0.72)",
            border: "1px solid rgba(91,200,245,0.25)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 40px rgba(14,123,181,0.10)",
          }}
        >
          <StepIndicator current={step} total={STEPS.length} />

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="mb-1 text-xl font-black text-[#1a2744]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  What best describes you?
                </h2>
                <p className="text-sm text-[#1a2744]/40 font-semibold">
                  Select the role that fits your involvement at our events.
                </p>
              </div>
              <ChipSelect
                options={ROLE_OPTIONS}
                value={form.partnerType}
                onSelect={(v) => { set("partnerType", v); clearErr("partnerType"); }}
              />
              {errors.partnerType && (
                <p className="text-sm text-red-500 font-semibold">{errors.partnerType}</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="mb-1 text-xl font-black text-[#1a2744]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Contact Info
                </h2>
                <p className="text-sm text-[#1a2744]/40 font-semibold">How we'll reach you to confirm your spot.</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Field label="First Name" required>
                    <input className={inputCls} value={form.firstName}
                      onChange={(e) => { set("firstName", e.target.value); clearErr("firstName"); }} />
                  </Field>
                  {errors.firstName && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.firstName}</p>}
                </div>
                <div>
                  <Field label="Last Name" required>
                    <input className={inputCls} value={form.lastName}
                      onChange={(e) => { set("lastName", e.target.value); clearErr("lastName"); }} />
                  </Field>
                  {errors.lastName && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.lastName}</p>}
                </div>
                <div>
                  <Field label="Email" required>
                    <input type="email" className={inputCls} value={form.email}
                      onChange={(e) => { set("email", e.target.value); clearErr("email"); }} />
                  </Field>
                  {errors.email && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.email}</p>}
                </div>
                <div>
                  <Field label="Phone Number" required>
                    <input type="tel" className={inputCls} value={form.phone}
                      onChange={(e) => { set("phone", e.target.value); clearErr("phone"); }} />
                  </Field>
                  {errors.phone && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Field label="Company / Brand / Organization" required>
                    <input className={inputCls} value={form.organizationName}
                      onChange={(e) => { set("organizationName", e.target.value); clearErr("organizationName"); }} />
                  </Field>
                  {errors.organizationName && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.organizationName}</p>}
                </div>
                <div>
                  <Field label="Do you use WhatsApp regularly?" required>
                    <select className={inputCls} value={form.usesWhatsApp}
                      onChange={(e) => { set("usesWhatsApp", e.target.value); clearErr("usesWhatsApp"); }}>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </Field>
                  {errors.usesWhatsApp && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.usesWhatsApp}</p>}
                </div>
                <div>
                  <Field label="Who referred you?" required>
                    <input className={inputCls} placeholder="Name or promo code" value={form.referralSource}
                      onChange={(e) => { set("referralSource", e.target.value); clearErr("referralSource"); }} />
                  </Field>
                  {errors.referralSource && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.referralSource}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="mb-1 text-xl font-black text-[#1a2744]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Your Brand Online
                </h2>
                <p className="text-sm text-[#1a2744]/40 font-semibold">Help us feature you across our channels the right way.</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Field label="Instagram Handle" required>
                    <input className={inputCls} placeholder="@yourbrand" value={form.instagram}
                      onChange={(e) => { set("instagram", e.target.value); clearErr("instagram"); }} />
                  </Field>
                  {errors.instagram && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.instagram}</p>}
                </div>
                <Field label="TikTok Handle">
                  <input className={inputCls} placeholder="@yourtiktok" value={form.tiktok}
                    onChange={(e) => set("tiktok", e.target.value)} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Website" required>
                    <input type="url" className={inputCls} placeholder="https://yourbrand.com" value={form.website}
                      onChange={(e) => { set("website", e.target.value); clearErr("website"); }} />
                  </Field>
                  {errors.website && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.website}</p>}
                </div>
                {hasSocial && (
                  <>
                    <Field label="Total Combined Following">
                      <input className={inputCls} placeholder="e.g. 12,500" value={form.totalFollowing}
                        onChange={(e) => set("totalFollowing", e.target.value)} />
                    </Field>
                    <Field label="Primary Link to Feature">
                      <input type="url" className={inputCls} placeholder="IG, website, Linktree…" value={form.primaryLink}
                        onChange={(e) => set("primaryLink", e.target.value)} />
                    </Field>
                  </>
                )}
                <Field label="Best Emoji for Your Brand">
                  <input className={inputCls} placeholder="🔥" style={{ fontSize: 22 }} value={form.brandEmoji}
                    onChange={(e) => set("brandEmoji", e.target.value)} />
                </Field>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="mb-1 text-xl font-black text-[#1a2744]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Event Details
                </h2>
                <p className="text-sm text-[#1a2744]/40 font-semibold">Almost done — a few final details so we can plan around you.</p>
              </div>
              {isSponsor && (
                <>
                  <Field label="What category best describes your business?">
                    <div className="mt-2">
                      <MultiChip options={BUSINESS_TYPES} selected={form.businessType}
                        onToggle={(v) => toggle("businessType", v)} />
                    </div>
                  </Field>
                  <Field label="Monthly Marketing Budget">
                    <select className={inputCls} value={form.marketingBudget}
                      onChange={(e) => set("marketingBudget", e.target.value)}>
                      <option value="">Select a range</option>
                      {BUDGET_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                </>
              )}
              <Field label="Products / services you're offering at the event">
                <textarea className={inputCls} rows={3}
                  placeholder="Describe what you'll bring or provide…"
                  value={form.offerings}
                  onChange={(e) => set("offerings", e.target.value)} />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Logo Assets (link)">
                  <input type="url" className={inputCls} placeholder="Drive / Dropbox link" value={form.logoAssets}
                    onChange={(e) => set("logoAssets", e.target.value)} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Content We Can Use (link)">
                    <input type="url" className={inputCls} placeholder="Photos, videos, etc." value={form.contentAssets}
                      onChange={(e) => set("contentAssets", e.target.value)} />
                  </Field>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <button type="button" onClick={back}
                className="rounded-2xl border border-[#5BC8F5]/30 bg-white px-5 py-3 text-sm font-bold text-[#1a2744]/60 transition hover:border-[#5BC8F5] hover:text-[#0e7bb5]">
                ← Back
              </button>
            )}
            {step < STEPS.length ? (
              <button type="button" onClick={next}
                className="flex-1 rounded-2xl py-3 text-base font-black text-white transition hover:opacity-90 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #0e7bb5, #5BC8F5)" }}>
                Continue →
              </button>
            ) : (
              <button type="button" onClick={submit} disabled={submitting}
                className="flex-1 rounded-2xl py-3 text-base font-black text-white transition hover:opacity-90 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #a0622a, #C8955A)" }}>
                {submitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  "Submit Application 🫶"
                )}
              </button>
            )}
          </div>

          {serverError && (
            <p className="mt-4 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600 font-semibold">
              {serverError}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
