import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[var(--color-primary-dark)]">

            <div className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">

                {/* LEFT */}
                <div>

                    <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-sm text-green-100">
                        Direct Farmer ↔ Vendor Marketplace
                    </span>

                    <h1 className="mb-6 font-['Sora'] text-5xl font-bold leading-tight text-white md:text-6xl">
                        Direct from Farm.
                        <br />
                        Fair for Everyone.
                    </h1>

                    <p className="mb-8 max-w-xl text-lg leading-relaxed text-green-100">
                        KisanKart connects farmers directly with vendors for transparent pricing,
                        better profits, and faster produce trade without middlemen.
                    </p>

                    <div className="flex flex-wrap gap-4">

                        <Link to="/register">
                            <Button className="bg-[var(--color-accent)] text-black hover:bg-amber-400">
                                Register as Farmer
                            </Button>
                        </Link>

                        <Link to="/listings">
                            <Button
                                variant="outline"
                                className="border-white bg-transparent text-white hover:bg-white hover:text-black"
                            >
                                Browse Listings
                            </Button>
                        </Link>

                    </div>
                </div>

                {/* RIGHT */}
                <div className="relative">

                    <img
                        src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854"
                        alt="Farmer"
                        className="h-[500px] w-full rounded-3xl object-cover shadow-2xl"
                    />

                    <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-xl">
                        <p className="text-sm text-[var(--color-text-muted)]">
                            Farmers onboarded
                        </p>

                        <h3 className="font-['Sora'] text-3xl font-bold text-[var(--color-primary)]">
                            500+
                        </h3>
                    </div>

                </div>
            </div>
        </section>
    );
}