/**
 * Phase 4 — Business Registration (frontend only).
 *
 * Pure, testable validation helpers and shared constants for the registration
 * wizard. No network calls and no persistence: account creation goes live with
 * Authentication (Phase 5) and workspace provisioning with the Database (Phase 6).
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type RegistrationStep = 1 | 2 | 3;

export interface RegistrationForm {
  // Step 1 — Business Information
  businessName: string;
  businessType: string;
  /** Dial code, e.g. "+92". */
  countryCode: string;
  /** National number as typed (digits validated separately). */
  phone: string;
  city: string;
  /** Raw subdomain input — normalized (trimmed + lowercased) on change. */
  subdomain: string;
  // Step 2 — Owner Account
  ownerName: string;
  ownerEmail: string;
  ownerPassword: string;
  ownerPasswordConfirm: string;
  agreeTerms: boolean;
  // Step 3 — Review & Confirm
  confirmAccurate: boolean;
}

export const EMPTY_REGISTRATION_FORM: RegistrationForm = {
  businessName: "",
  businessType: "",
  countryCode: "+92",
  phone: "",
  city: "",
  subdomain: "",
  ownerName: "",
  ownerEmail: "",
  ownerPassword: "",
  ownerPasswordConfirm: "",
  agreeTerms: false,
  confirmAccurate: false,
};

export type RegistrationErrors = Partial<Record<keyof RegistrationForm, string>>;

/** Frontend-only lifecycle of the subdomain availability check. */
export type SubdomainStatus = "idle" | "checking" | "available" | "reserved";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export interface CountryDialCode {
  code: string;
  dial: string;
  name: string;
}

export const COUNTRY_DIAL_CODES: CountryDialCode[] = [
  { code: "PK", dial: "+92", name: "Pakistan" },
  { code: "IN", dial: "+91", name: "India" },
  { code: "AE", dial: "+971", name: "United Arab Emirates" },
  { code: "SA", dial: "+966", name: "Saudi Arabia" },
  { code: "US", dial: "+1", name: "United States" },
  { code: "GB", dial: "+44", name: "United Kingdom" },
];

export const BUSINESS_TYPES = [
  "Auto Repair & Service",
  "Body & Paint Shop",
  "Tyre & Alignment Shop",
  "Detailing Studio",
  "Quick Service / Lube Center",
  "Multi-Brand Workshop",
  "Dealership Service Center",
  "Other",
] as const;

export const SUBDOMAIN_MIN = 3;
export const SUBDOMAIN_MAX = 30;
export const SUBDOMAIN_DOMAIN = "mywora.com";

export const SUBDOMAIN_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Transient errors the debounced checker is allowed to clear by itself. */
export const SUBDOMAIN_CHECKING_ERROR = "Checking subdomain availability…";
export const SUBDOMAIN_UNCHECKED_ERROR = "Please check the availability of your subdomain.";

/**
 * Names MyWora keeps for itself. Without the database (Phase 6) this reserved
 * list is the only uniqueness we can verify — real availability is confirmed
 * when the workspace is provisioned.
 */
export const RESERVED_SUBDOMAINS: ReadonlySet<string> = new Set([
  "www",
  "api",
  "app",
  "admin",
  "mywora",
  "mail",
  "ftp",
  "support",
  "help",
  "blog",
  "status",
  "dashboard",
  "login",
  "signup",
  "register",
  "static",
  "cdn",
  "assets",
  "docs",
  "billing",
  "payments",
]);

export interface RegistrationStepMeta {
  step: RegistrationStep;
  title: string;
  description: string;
}

export const REGISTRATION_STEPS: RegistrationStepMeta[] = [
  { step: 1, title: "Business Information", description: "Enter your workshop details" },
  { step: 2, title: "Owner Account", description: "Create your account" },
  { step: 3, title: "Review & Confirm", description: "Confirm and finish setup" },
];

// ---------------------------------------------------------------------------
// Validators — each returns an error message, or null when valid
// ---------------------------------------------------------------------------

export function normalizeSubdomain(value: string): string {
  return value.trim().toLowerCase();
}

export function validateBusinessName(value: string): string | null {
  const v = value.trim();
  if (!v) return "Business name is required.";
  if (v.length < 3) return "Business name must be at least 3 characters.";
  if (v.length > 80) return "Business name must be 80 characters or fewer.";
  return null;
}

export function validateBusinessType(value: string): string | null {
  if (!value || !(BUSINESS_TYPES as readonly string[]).includes(value)) {
    return "Please select a business type.";
  }
  return null;
}

export function validateCity(value: string): string | null {
  const v = value.trim();
  if (!v) return "City is required.";
  if (v.length < 2) return "City must be at least 2 characters.";
  if (v.length > 60) return "City must be 60 characters or fewer.";
  return null;
}

/** National part of the phone number — 7 to 15 digits (E.164 style). */
export function validatePhoneNational(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "Phone number is required.";
  if (digits.length < 7) return "Phone number must be at least 7 digits.";
  if (digits.length > 15) return "Phone number must be 15 digits or fewer.";
  return null;
}

export function validateEmail(value: string): string | null {
  const v = value.trim();
  if (!v) return "Email address is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email address.";
  return null;
}

export function validateOwnerName(value: string): string | null {
  const v = value.trim();
  if (!v) return "Full name is required.";
  if (v.length < 3) return "Full name must be at least 3 characters.";
  if (v.length > 80) return "Full name must be 80 characters or fewer.";
  return null;
}

/** 0–5 points: length ≥ 8, lowercase, uppercase, digit, symbol. */
export function passwordScore(value: string): number {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[a-z]/.test(value)) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return score;
}

export function validatePassword(value: string): string | null {
  if (!value) return "Password is required.";
  if (value.length < 8) return "Password must be at least 8 characters.";
  if (value.length > 72) return "Password must be 72 characters or fewer.";
  if (passwordScore(value) < 3) return "Use a mix of letters, numbers and symbols.";
  return null;
}

export function validatePasswordConfirm(value: string, password: string): string | null {
  if (!value) return "Please confirm your password.";
  if (value !== password) return "Passwords do not match.";
  return null;
}

export function validateSubdomainFormat(value: string): string | null {
  const v = normalizeSubdomain(value);
  if (!v) return "Subdomain is required.";
  if (v.length < SUBDOMAIN_MIN) return `Subdomain must be at least ${SUBDOMAIN_MIN} characters.`;
  if (v.length > SUBDOMAIN_MAX) return `Subdomain must be ${SUBDOMAIN_MAX} characters or fewer.`;
  if (!SUBDOMAIN_REGEX.test(v)) return "Use lowercase letters, numbers and single hyphens only.";
  return null;
}

export type SubdomainAvailability = { status: "available" } | { status: "reserved"; message: string };

export function checkSubdomainAvailability(value: string): SubdomainAvailability {
  const v = normalizeSubdomain(value);
  if (RESERVED_SUBDOMAINS.has(v)) {
    return {
      status: "reserved",
      message: `"${v}" is reserved by MyWora and cannot be used. Try another one.`,
    };
  }
  return { status: "available" };
}

export function formatWorkspaceUrl(subdomain: string): string {
  const v = normalizeSubdomain(subdomain);
  return `https://${v || "your-subdomain"}.${SUBDOMAIN_DOMAIN}`;
}

// ---------------------------------------------------------------------------
// Step-level validation
// ---------------------------------------------------------------------------

export function validateStep(
  step: RegistrationStep,
  form: RegistrationForm,
  subdomainStatus: SubdomainStatus,
): RegistrationErrors {
  if (step === 1) {
    const errors: RegistrationErrors = {};
    const businessName = validateBusinessName(form.businessName);
    if (businessName) errors.businessName = businessName;
    const businessType = validateBusinessType(form.businessType);
    if (businessType) errors.businessType = businessType;
    const phone = validatePhoneNational(form.phone);
    if (phone) errors.phone = phone;
    const city = validateCity(form.city);
    if (city) errors.city = city;
    const subdomain = validateSubdomainFormat(form.subdomain);
    if (subdomain) {
      errors.subdomain = subdomain;
    } else if (subdomainStatus === "checking") {
      errors.subdomain = SUBDOMAIN_CHECKING_ERROR;
    } else if (subdomainStatus === "idle") {
      errors.subdomain = SUBDOMAIN_UNCHECKED_ERROR;
    } else if (subdomainStatus === "reserved") {
      const check = checkSubdomainAvailability(form.subdomain);
      if (check.status === "reserved") errors.subdomain = check.message;
    }
    return errors;
  }

  if (step === 2) {
    const errors: RegistrationErrors = {};
    const ownerName = validateOwnerName(form.ownerName);
    if (ownerName) errors.ownerName = ownerName;
    const ownerEmail = validateEmail(form.ownerEmail);
    if (ownerEmail) errors.ownerEmail = ownerEmail;
    const ownerPassword = validatePassword(form.ownerPassword);
    if (ownerPassword) errors.ownerPassword = ownerPassword;
    const ownerPasswordConfirm = validatePasswordConfirm(form.ownerPasswordConfirm, form.ownerPassword);
    if (ownerPasswordConfirm) errors.ownerPasswordConfirm = ownerPasswordConfirm;
    if (!form.agreeTerms) errors.agreeTerms = "Please accept the Terms of Service to continue.";
    return errors;
  }

  const errors: RegistrationErrors = {};
  if (!form.confirmAccurate) {
    errors.confirmAccurate = "Please confirm the information above is accurate.";
  }
  return errors;
}
