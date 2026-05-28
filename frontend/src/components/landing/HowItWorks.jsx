import { ShoppingBasket, Tractor, BadgeIndianRupee } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";

const steps = [
  {
    icon: Tractor,
    title: "Farmers Post Produce",
    description:
      "Farmers create listings with crop details, quantity, pricing, and location.",
  },
  {
    icon: ShoppingBasket,
    title: "Vendors Browse Listings",
    description:
      "Vendors explore available produce and connect directly with farmers.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Fair & Transparent Trade",
    description:
      "Orders happen directly without middlemen, improving profits and pricing transparency.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-24">
      
      <div className="mx-auto max-w-7xl">
        
        <SectionTitle
          title="How KisanKart Works"
          subtitle="A simple and transparent marketplace connecting farmers and vendors directly."
        />

        <div className="grid gap-6 md:grid-cols-3">
          
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Card
                key={index}
                className="transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary-light)]">
                  <Icon className="h-7 w-7 text-[var(--color-primary)]" />
                </div>

                <h3 className="mb-3 font-['Sora'] text-xl font-semibold text-[var(--color-text)]">
                  {step.title}
                </h3>

                <p className="leading-relaxed text-[var(--color-text-muted)]">
                  {step.description}
                </p>
              </Card>
            );
          })}
          
        </div>
      </div>
    </section>
  );
}