import { useCallback, useEffect, useState } from "react";
import {
  EMPTY_REGISTRATION_FORM,
  SUBDOMAIN_CHECKING_ERROR,
  SUBDOMAIN_UNCHECKED_ERROR,
  checkSubdomainAvailability,
  normalizeSubdomain,
  validateStep,
  validateSubdomainFormat,
} from "@/lib/registration";
import type {
  RegistrationErrors,
  RegistrationForm,
  RegistrationStep,
  SubdomainAvailability,
  SubdomainStatus,
} from "@/lib/registration";

/** How long (ms) the subdomain checker waits after the last keystroke. */
const SUBDOMAIN_CHECK_DEBOUNCE_MS = 450;

export interface UseRegistrationResult {
  step: RegistrationStep;
  /** Highest step whose validation has passed — gates stepper navigation. */
  furthestStep: RegistrationStep;
  form: RegistrationForm;
  errors: RegistrationErrors;
  completed: boolean;
  subdomainStatus: SubdomainStatus;
  subdomainMessage: string | null;
  setField: <K extends keyof RegistrationForm>(field: K, value: RegistrationForm[K]) => void;
  goToStep: (step: RegistrationStep) => void;
  continueToNextStep: () => boolean;
  finish: () => boolean;
  checkSubdomainNow: () => void;
  reset: () => void;
}

/**
 * Phase 4 wizard state machine — three steps, in-memory only.
 * Nothing is persisted: submission becomes real with the database (Phase 6).
 */
export function useRegistration(): UseRegistrationResult {
  const [step, setStep] = useState<RegistrationStep>(1);
  const [furthestStep, setFurthestStep] = useState<RegistrationStep>(1);
  const [form, setForm] = useState<RegistrationForm>(EMPTY_REGISTRATION_FORM);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [completed, setCompleted] = useState(false);
  const [availability, setAvailability] = useState<SubdomainAvailability | null>(null);
  const [checking, setChecking] = useState(false);

  const setField = useCallback(<K extends keyof RegistrationForm>(field: K, value: RegistrationForm[K]) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value } as RegistrationForm;
      if (field === "subdomain") {
        next.subdomain = normalizeSubdomain(next.subdomain);
      }
      return next;
    });
    // Clear this field's error as soon as the user edits it.
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  // Debounced, frontend-only subdomain availability check.
  const subdomain = form.subdomain;
  useEffect(() => {
    const value = normalizeSubdomain(subdomain);
    if (!value || validateSubdomainFormat(value) !== null) {
      setAvailability(null);
      setChecking(false);
      return;
    }
    setChecking(true);
    const timer = window.setTimeout(() => {
      setAvailability(checkSubdomainAvailability(value));
      setChecking(false);
      // A real result supersedes the transient "checking / unchecked" errors.
      setErrors((prev) => {
        if (prev.subdomain !== SUBDOMAIN_CHECKING_ERROR && prev.subdomain !== SUBDOMAIN_UNCHECKED_ERROR) {
          return prev;
        }
        const next = { ...prev };
        delete next.subdomain;
        return next;
      });
    }, SUBDOMAIN_CHECK_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [subdomain]);

  const subdomainStatus: SubdomainStatus = checking
    ? "checking"
    : availability
      ? availability.status
      : "idle";

  const subdomainMessage = availability && availability.status === "reserved" ? availability.message : null;

  const goToStep = useCallback(
    (target: RegistrationStep) => {
      if (!completed && target <= furthestStep && target !== step) {
        setStep(target);
      }
    },
    [completed, furthestStep, step],
  );

  const continueToNextStep = useCallback((): boolean => {
    const stepErrors = validateStep(step, form, subdomainStatus);
    setErrors(stepErrors);
    if (Object.values(stepErrors).some(Boolean)) return false;
    if (step < 3) {
      const next = (step + 1) as RegistrationStep;
      setStep(next);
      setFurthestStep((prev) => Math.max(prev, next) as RegistrationStep);
    }
    return true;
  }, [step, form, subdomainStatus]);

  const finish = useCallback((): boolean => {
    const stepErrors = validateStep(3, form, subdomainStatus);
    setErrors(stepErrors);
    if (Object.values(stepErrors).some(Boolean)) return false;
    setCompleted(true);
    return true;
  }, [form, subdomainStatus]);

  const checkSubdomainNow = useCallback(() => {
    const value = normalizeSubdomain(form.subdomain);
    if (!value || validateSubdomainFormat(value) !== null) return;
    setAvailability(checkSubdomainAvailability(value));
  }, [form.subdomain]);

  const reset = useCallback(() => {
    setForm(EMPTY_REGISTRATION_FORM);
    setErrors({});
    setStep(1);
    setFurthestStep(1);
    setCompleted(false);
    setAvailability(null);
    setChecking(false);
  }, []);

  return {
    step,
    furthestStep,
    form,
    errors,
    completed,
    subdomainStatus,
    subdomainMessage,
    setField,
    goToStep,
    continueToNextStep,
    finish,
    checkSubdomainNow,
    reset,
  };
}
