import { describe, expect, it } from "vitest";
import {
  BUSINESS_TYPES,
  COUNTRY_DIAL_CODES,
  EMPTY_REGISTRATION_FORM,
  RESERVED_SUBDOMAINS,
  checkSubdomainAvailability,
  formatWorkspaceUrl,
  normalizeSubdomain,
  passwordScore,
  validateBusinessName,
  validateBusinessType,
  validateCity,
  validateEmail,
  validateOwnerName,
  validatePassword,
  validatePasswordConfirm,
  validatePhoneNational,
  validateStep,
  validateSubdomainFormat,
} from "./registration";

describe("business information validators", () => {
  it("validates the business name", () => {
    expect(validateBusinessName("")).toMatch(/required/i);
    expect(validateBusinessName("AB")).toMatch(/at least 3/i);
    expect(validateBusinessName("x".repeat(81))).toMatch(/80/i);
    expect(validateBusinessName("Falcon Motors")).toBeNull();
  });

  it("validates the business type", () => {
    expect(validateBusinessType("")).toMatch(/select a business type/i);
    expect(validateBusinessType("Not a type")).toMatch(/select a business type/i);
    expect(validateBusinessType(BUSINESS_TYPES[0])).toBeNull();
  });

  it("validates the city", () => {
    expect(validateCity("")).toMatch(/required/i);
    expect(validateCity("L")).toMatch(/at least 2/i);
    expect(validateCity("Lahore")).toBeNull();
  });

  it("validates the national phone number across formats", () => {
    expect(validatePhoneNational("")).toMatch(/required/i);
    expect(validatePhoneNational("12345")).toMatch(/at least 7 digits/i);
    expect(validatePhoneNational("1".repeat(16))).toMatch(/15 digits/i);
    expect(validatePhoneNational("0300 123-4567")).toBeNull();
    expect(validatePhoneNational("03001234567")).toBeNull();
  });
});

describe("owner account validators", () => {
  it("validates the owner name", () => {
    expect(validateOwnerName("")).toMatch(/required/i);
    expect(validateOwnerName("Al")).toMatch(/at least 3/i);
    expect(validateOwnerName("Ali Raza")).toBeNull();
  });

  it("validates the email address", () => {
    expect(validateEmail("")).toMatch(/required/i);
    expect(validateEmail("not-an-email")).toMatch(/valid email/i);
    expect(validateEmail("owner@workshop.pk")).toBeNull();
  });

  it("scores password strength", () => {
    expect(passwordScore("aaaaaaaa")).toBe(2);
    expect(passwordScore("Abcdefg1!")).toBe(5);
  });

  it("validates the password", () => {
    expect(validatePassword("")).toMatch(/required/i);
    expect(validatePassword("Ab1!")).toMatch(/at least 8/i);
    expect(validatePassword("aaaaaaaa")).toMatch(/mix/i);
    expect(validatePassword("Str0ng!Pass")).toBeNull();
  });

  it("validates the password confirmation", () => {
    expect(validatePasswordConfirm("", "x")).toMatch(/confirm/i);
    expect(validatePasswordConfirm("different", "Str0ng!Pass")).toMatch(/do not match/i);
    expect(validatePasswordConfirm("Str0ng!Pass", "Str0ng!Pass")).toBeNull();
  });
});

describe("subdomain helpers", () => {
  it("normalizes and validates the format", () => {
    expect(normalizeSubdomain("  Falcon-Motors ")).toBe("falcon-motors");
    expect(validateSubdomainFormat("")).toMatch(/required/i);
    expect(validateSubdomainFormat("ab")).toMatch(/at least 3/i);
    expect(validateSubdomainFormat("a".repeat(31))).toMatch(/30 characters/i);
    expect(validateSubdomainFormat("has space")).toMatch(/lowercase letters/i);
    expect(validateSubdomainFormat("-abc")).toMatch(/lowercase letters/i);
    expect(validateSubdomainFormat("abc-")).toMatch(/lowercase letters/i);
    expect(validateSubdomainFormat("ab--c")).toMatch(/lowercase letters/i);
    expect(validateSubdomainFormat("ab_c")).toMatch(/lowercase letters/i);
    expect(validateSubdomainFormat("falcon-motors")).toBeNull();
  });

  it("blocks reserved subdomains and accepts normal ones", () => {
    expect(RESERVED_SUBDOMAINS.has("admin")).toBe(true);
    expect(RESERVED_SUBDOMAINS.has("www")).toBe(true);
    const reserved = checkSubdomainAvailability("admin");
    expect(reserved.status).toBe("reserved");
    if (reserved.status === "reserved") expect(reserved.message).toMatch(/reserved/i);
    expect(checkSubdomainAvailability("falcon-motors").status).toBe("available");
  });

  it("formats the workspace URL with a fallback", () => {
    expect(formatWorkspaceUrl(" Falcon-Motors ")).toBe("https://falcon-motors.mywora.com");
    expect(formatWorkspaceUrl("")).toBe("https://your-subdomain.mywora.com");
  });

  it("ships default dial codes led by Pakistan", () => {
    expect(COUNTRY_DIAL_CODES[0]).toMatchObject({ code: "PK", dial: "+92" });
  });
});

describe("validateStep", () => {
  it("reports every empty step 1 field at once", () => {
    const errors = validateStep(1, EMPTY_REGISTRATION_FORM, "idle");
    expect(errors.businessName).toMatch(/required/i);
    expect(errors.businessType).toMatch(/select/i);
    expect(errors.phone).toMatch(/required/i);
    expect(errors.city).toMatch(/required/i);
    expect(errors.subdomain).toMatch(/required/i);
  });

  it("gates step 1 on a completed subdomain check", () => {
    const form = {
      ...EMPTY_REGISTRATION_FORM,
      businessName: "Falcon Motors",
      businessType: BUSINESS_TYPES[0],
      phone: "03001234567",
      city: "Lahore",
      subdomain: "falcon-motors",
    };
    expect(validateStep(1, form, "idle").subdomain).toMatch(/check the availability/i);
    expect(validateStep(1, form, "checking").subdomain).toMatch(/checking/i);
    expect(validateStep(1, form, "available").subdomain).toBeUndefined();
    // "falcon-motors" is not reserved, so the reserved branch adds no error.
    expect(validateStep(1, form, "reserved").subdomain).toBeUndefined();
  });

  it("requires terms acceptance on step 2 and confirmation on step 3", () => {
    const step2 = validateStep(2, EMPTY_REGISTRATION_FORM, "available");
    expect(step2.ownerName).toMatch(/required/i);
    expect(step2.ownerEmail).toMatch(/required/i);
    expect(step2.ownerPassword).toMatch(/required/i);
    expect(step2.agreeTerms).toMatch(/terms/i);

    const step3 = validateStep(3, EMPTY_REGISTRATION_FORM, "available");
    expect(step3.confirmAccurate).toMatch(/confirm/i);
  });
});
