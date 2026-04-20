"use client";

import { useState } from "react";

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

// Which roles get the extended sponsor/vendor section
const SPONSOR_ROLES = new Set(["Sponsor / Vendor", "Agency"]);
// Which roles get the social/following section
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
  staffCount: string;
  logoAssets: string;
  contentAssets: string;
};

const EMPTY: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  organizationName: "", partnerType: "", instagram: "", tiktok: "",
  website: "", referralSource: "", usesWhatsApp: "", businessType: [],
  offerings: "", totalFollowing: "", primaryLink: "", brandEmoji: "",
  marketingBudget: "", staffCount: "", logoAssets: "", contentAssets: "",
};

// ─── tiny styled primitives ─────────────────────────────────────────────────

const inputCls =
  "w-full rounded-2xl border border-[#5BC8F5]/30 bg-white/5 px-4 py-3 text-white " +
  "placeholder:text-white/30 focus:border-[#5BC8F5]/80 focus:outline-none focus:ring-2 " +
  "focus:ring-[#5BC8F5]/20 transition";

const labelCls = "block text-sm font-semibold text-white/70 mb-1.5";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <div className={labelCls}>
        {label}
        {required && <span className="ml-1 text-[#5BC8F5]">*</span>}
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
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition
            ${
              value === opt.value
                ? "border-[#5BC8F5] bg-[#5BC8F5] text-[#0a1628]"
                : "border-white/15 bg-white/5 text-white/70 hover:border-[#5BC8F5]/60 hover:text-white"
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
          className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition
            ${
              selected.includes(opt)
                ? "border-[#C8955A] bg-[#C8955A]/80 text-white"
                : "border-white/15 bg-white/5 text-white/60 hover:border-[#C8955A]/60 hover:text-white"
            }`}
        >
          {selected.includes(opt) && <span className="text-xs">✓</span>}
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── step definitions ────────────────────────────────────────────────────────

const STEPS = ["Your Role", "Contact Info", "Online Presence", "Event Details"];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#5BC8F5]">
          Step {current} of {total}
        </span>
        <span className="text-xs text-white/40">{STEPS[current - 1]}</span>
      </div>
      <div className="h-1 w-full rounded-full bg-white/10">
        <div
          className="h-1 rounded-full transition-all duration-500"
          style={{
            width: `${(current / total) * 100}%`,
            background: "linear-gradient(90deg, #0e7bb5, #5BC8F5)",
          }}
        />
      </div>
    </div>
  );
}

// ─── main component ──────────────────────────────────────────────────────────

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
    setForm((p: any) => {
      const cur = p[field] as string[];
      return {
        ...p,
        [field]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value],
      };
    });

  const err = (field: string, msg: string) =>
    setErrors((p) => ({ ...p, [field]: msg }));
  const clearErr = (field: string) =>
    setErrors((p) => { const n = { ...p }; delete n[field]; return n; });

  function validateStep(s: number): boolean {
    let ok = true;
    const newErrors: Record<string, string> = {};

    if (s === 1) {
      if (!form.partnerType) { newErrors.partnerType = "Please select your role."; ok = false; }
    }
    if (s === 2) {
      if (!form.firstName.trim()) { newErrors.firstName = "Required"; ok = false; }
      if (!form.lastName.trim()) { newErrors.lastName = "Required"; ok = false; }
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = "Valid email required"; ok = false;
      }
      if (!form.phone.trim()) { newErrors.phone = "Required"; ok = false; }
      if (!form.organizationName.trim()) { newErrors.organizationName = "Required"; ok = false; }
      if (!form.usesWhatsApp) { newErrors.usesWhatsApp = "Required"; ok = false; }
      if (!form.referralSource.trim()) { newErrors.referralSource = "Required"; ok = false; }
    }
    if (s === 3) {
      if (!form.instagram.trim()) { newErrors.instagram = "Required"; ok = false; }
      if (!form.website.trim()) { newErrors.website = "Required"; ok = false; }
    }

    setErrors(newErrors);
    return ok;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length));
  }
  function back() { setStep((s) => Math.max(s - 1, 1)); }

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
          typeof data.error === "string"
            ? data.error
            : JSON.stringify(data.error)
        );
      } else {
        setSubmitted(true);
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const isSponsor = SPONSOR_ROLES.has(form.partnerType);
  const hasSocial = SOCIAL_ROLES.has(form.partnerType);
  const totalSteps = STEPS.length;

  // ── Success screen ──
  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #0e3a5e 0%, #060d1a 60%)" }}>
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl"
            style={{ background: "linear-gradient(135deg, #0e7bb5, #5BC8F5)" }}>
            🫶
          </div>
          <h1 className="mb-3 font-['Nunito',sans-serif] text-3xl font-black text-white">
            Application Received!
          </h1>
          <p className="text-white/60 leading-relaxed">
            Thanks for applying to partner with Pups N Chill. We review every application
            within 48 hours — keep an eye on your inbox. 🐶
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen text-white"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #0e3a5e 0%, #060d1a 60%)" }}
    >
      {/* Hero */}
      <div className="px-6 pt-12 pb-8 text-center">
        <p className="mb-1 text-xs font-black uppercase tracking-[0.25em] text-[#5BC8F5]">
          Pups N Chill
        </p>
        <h1 className="font-['Nunito',sans-serif] text-3xl font-black text-white sm:text-4xl">
          Partner Application
        </h1>
        <p className="mt-2 text-sm text-white/50">
          Sponsors · Venues · Talent · Creatives · Shelters & more
        </p>
      </div>

      {/* Card */}
      <div className="mx-auto max-w-2xl px-4 pb-16">
        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(91,200,245,0.15)",
            backdropFilter: "blur(12px)",
          }}
        >
          <StepIndicator current={step} total={totalSteps} />

          {/* ── Step 1: Role ── */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-1 font-['Nunito',sans-serif] text-xl font-black text-white">
                  What best describes you?
                </h2>
                <p className="text-sm text-white/40">Select the role that fits your involvement at our events.</p>
              </div>
              <ChipSelect
                options={ROLE_OPTIONS}
                value={form.partnerType}
                onSelect={(v) => { set("partnerType", v); clearErr("partnerType"); }}
              />
              {errors.partnerType && (
                <p className="text-sm text-red-400">{errors.partnerType}</p>
              )}
            </div>
          )}

          {/* ── Step 2: Contact ── */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="mb-1 font-['Nunito',sans-serif] text-xl font-black text-white">Contact Info</h2>
                <p className="text-sm text-white/40">How we'll reach you to confirm your spot.</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Field label="First Name" required>
                    <input className={inputCls} value={form.firstName}
                      onChange={(e) => { set("firstName", e.target.value); clearErr("firstName"); }} />
                  </Field>
                  {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>}
                </div>
                <div>
                  <Field label="Last Name" required>
                    <input className={inputCls} value={form.lastName}
                      onChange={(e) => { set("lastName", e.target.value); clearErr("lastName"); }} />
                  </Field>
                  {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>}
                </div>
                <div>
                  <Field label="Email" required>
                    <input type="email" className={inputCls} value={form.email}
                      onChange={(e) => { set("email", e.target.value); clearErr("email"); }} />
                  </Field>
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <Field label="Phone" required>
                    <input type="tel" className={inputCls} value={form.phone}
                      onChange={(e) => { set("phone", e.target.value); clearErr("phone"); }} />
                  </Field>
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Field label="Company / Brand / Organization" required>
                    <input className={inputCls} value={form.organizationName}
                      onChange={(e) => { set("organizationName", e.target.value); clearErr("organizationName"); }} />
                  </Field>
                  {errors.organizationName && <p className="mt-1 text-xs text-red-400">{errors.organizationName}</p>}
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
                  {errors.usesWhatsApp && <p className="mt-1 text-xs text-red-400">{errors.usesWhatsApp}</p>}
                </div>
                <div>
                  <Field label="Who referred you?" required>
                    <input className={inputCls} placeholder="Name or promo code" value={form.referralSource}
                      onChange={(e) => { set("referralSource", e.target.value); clearErr("referralSource"); }} />
                  </Field>
                  {errors.referralSource && <p className="mt-1 text-xs text-red-400">{errors.referralSource}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3: Social / Online ── */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="mb-1 font-['Nunito',sans-serif] text-xl font-black text-white">Your Brand Online</h2>
                <p className="text-sm text-white/40">Help us feature you across our channels the right way.</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Field label="Instagram Handle" required>
                    <input className={inputCls} placeholder="@yourbrand" value={form.instagram}
                      onChange={(e) => { set("instagram", e.target.value); clearErr("instagram"); }} />
                  </Field>
                  {errors.instagram && <p className="mt-1 text-xs text-red-400">{errors.instagram}</p>}
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
                  {errors.website && <p className="mt-1 text-xs text-red-400">{errors.website}</p>}
                </div>
                {hasSocial && (
                  <>
                    <Field label="Total Combined Following">
                      <input className={inputCls} placeholder="e.g. 12,500" value={form.totalFollowing}
                        onChange={(e) => set("totalFollowing", e.target.value)} />
                    </Field>
                    <Field label="Primary Link to Feature">
                      <input type="url" className={inputCls} placeholder="IG, website, linktree…" value={form.primaryLink}
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

          {/* ── Step 4: Event Details ── */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="mb-1 font-['Nunito',sans-serif] text-xl font-black text-white">Event Details</h2>
                <p className="text-sm text-white/40">Almost done — a few final details so we can plan around you.</p>
              </div>

              {isSponsor && (
                <>
                  <Field label="What category best describes your business?">
                    <div className="mt-2">
                      <MultiChip
                        options={BUSINESS_TYPES}
                        selected={form.businessType}
                        onToggle={(v) => toggle("businessType", v)}
                      />
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

              <Field label="What products / services are you offering at the event?">
                <textarea className={inputCls} rows={3}
                  placeholder="Describe what you'll bring or provide…"
                  value={form.offerings}
                  onChange={(e) => set("offerings", e.target.value)} />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="How many staff are you bringing?">
                  <input type="number" min={1} className={inputCls} placeholder="e.g. 2" value={form.staffCount}
                    onChange={(e) => set("staffCount", e.target.value)} />
                </Field>
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

          {/* ── Nav buttons ── */}
          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={back}
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white/60 transition hover:border-white/30 hover:text-white"
              >
                ← Back
              </button>
            )}
            {step < totalSteps ? (
              <button
                type="button"
                onClick={next}
                className="flex-1 rounded-2xl py-3 text-base font-black text-[#060d1a] transition hover:opacity-90 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #0e7bb5, #5BC8F5)" }}
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="flex-1 rounded-2xl py-3 text-base font-black text-white transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #a0622a, #C8955A)" }}
              >
                {submitting ? "Submitting…" : "Submit Application 🫶"}
              </button>
            )}
          </div>

          {serverError && (
            <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {serverError}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
