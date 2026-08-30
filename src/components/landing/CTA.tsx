import Button from "../ui/Button";
import Reveal from "../Reveal";

export default function CTA() {
  return (
    <section className="bg-white pb-20 lg:pb-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-14 text-center shadow-float sm:px-12 lg:px-16 lg:py-20 lg:text-left">
            {/* Decorative dot patterns */}
            <div
              aria-hidden="true"
              className="dot-grid-light absolute left-10 top-10 hidden h-28 w-40 lg:block"
            />
            <div
              aria-hidden="true"
              className="dot-grid-light absolute bottom-8 right-10 hidden h-28 w-40 lg:block"
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.25fr_auto]">
              <div>
                <h2 className="text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.02em] text-white">
                  Ready to Transform
                  <br />
                  Your Workshop?
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70 max-lg:mx-auto">
                  Start managing your workshop operations in one powerful workspace.
                </p>
              </div>

              <div className="flex flex-col items-center justify-end gap-3 sm:flex-row lg:justify-self-end">
                <Button variant="white" size="lg" to="/register">
                  Start Free Today
                </Button>
                <Button variant="ghostLight" size="lg" href="#contact">
                  Book a Demo
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
