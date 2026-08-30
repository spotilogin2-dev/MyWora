import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CircleHelp } from "lucide-react";
import Logo from "@/components/Logo";
import BrandPanel from "./components/BrandPanel";
import Stepper from "./components/Stepper";
import StepBusinessInfo from "./components/StepBusinessInfo";
import StepOwnerAccount from "./components/StepOwnerAccount";
import StepReview from "./components/StepReview";
import SuccessScreen from "./components/SuccessScreen";
import WhatsNextCard from "./components/WhatsNextCard";
import WorkspacePreviewCard from "./components/WorkspacePreviewCard";
import { useRegistration } from "@/hooks/useRegistration";
import { REGISTRATION_STEPS } from "@/lib/registration";

/**
 * Phase 4 — Business Registration (frontend only). Three-step wizard matching
 * the approved reference design. Nothing is persisted: account creation goes
 * live in Phase 5, workspace provisioning in Phase 6.
 */
export default function RegistrationPage() {
  const reg = useRegistration();
  const wizardRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    document.title = "MyWora — Create Your Workshop";
    return () => {
      document.title = "MyWora — Run Your Workshop Smarter";
    };
  }, []);

  // Move focus + scroll the wizard into view on step change (not on first paint).
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    wizardRef.current?.focus({ preventScroll: true });
    wizardRef.current?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  }, [reg.step, reg.completed]);

  useEffect(() => {
    if (reg.completed) window.scrollTo?.({ top: 0, behavior: "smooth" });
  }, [reg.completed]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a href="#register-main" className="skip-link">
        Skip to registration form
      </a>

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-navy/[0.06] bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Logo />
          <div title="Help center is coming soon" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-mist text-navy/60">
              <CircleHelp size={18} aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-navy">Need Help?</span>
              <span className="text-xs text-navy/50">We're here for you</span>
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[320px_minmax(0,1fr)_360px]">
        <BrandPanel />

        {/* Wizard */}
        <main id="register-main" className="px-4 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="mx-auto w-full max-w-[680px]">
            {reg.completed ? (
              <SuccessScreen form={reg.form} onReset={reg.reset} />
            ) : (
              <>
                <p className="text-2xl font-bold tracking-tight text-navy sm:text-[1.75rem]">
                  Let's set up your workshop
                </p>
                <p className="mt-1.5 text-sm text-navy/55">
                  Follow these simple steps to get started with MyWora.
                </p>
                <p className="sr-only" aria-live="polite">
                  Step {reg.step} of {REGISTRATION_STEPS.length}: {REGISTRATION_STEPS[reg.step - 1].title}
                </p>

                <div className="mt-8">
                  <Stepper current={reg.step} furthest={reg.furthestStep} onSelect={reg.goToStep} />
                </div>

                <div ref={wizardRef} tabIndex={-1} className="mt-8 scroll-mt-24 focus:outline-none">
                  {reg.step === 1 && (
                    <StepBusinessInfo
                      form={reg.form}
                      errors={reg.errors}
                      subdomainStatus={reg.subdomainStatus}
                      subdomainMessage={reg.subdomainMessage}
                      onFieldChange={reg.setField}
                      onCheckSubdomain={reg.checkSubdomainNow}
                      onContinue={() => reg.continueToNextStep()}
                    />
                  )}
                  {reg.step === 2 && (
                    <StepOwnerAccount
                      form={reg.form}
                      errors={reg.errors}
                      onFieldChange={reg.setField}
                      onContinue={() => reg.continueToNextStep()}
                    />
                  )}
                  {reg.step === 3 && (
                    <StepReview
                      form={reg.form}
                      errors={reg.errors}
                      onFieldChange={reg.setField}
                      onEditStep={reg.goToStep}
                      onFinish={() => reg.finish()}
                    />
                  )}
                </div>

                <p className="mt-6 text-center text-sm text-navy/60">
                  Already have an account?{" "}
                  <Link to="/login" className="font-bold text-brand underline-offset-2 hover:underline">
                    Login here
                  </Link>
                </p>
              </>
            )}
          </div>
        </main>

        {/* Right rail */}
        <aside className="px-4 pb-12 pt-2 sm:px-8 lg:px-6 lg:pr-10 lg:pt-10">
          <div className="mx-auto w-full max-w-[680px] space-y-6 lg:sticky lg:top-24 lg:max-w-none">
            <WorkspacePreviewCard subdomain={reg.form.subdomain} />
            <WhatsNextCard />
          </div>
        </aside>
      </div>
    </div>
  );
}
