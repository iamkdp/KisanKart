import { Wheat } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-[var(--color-border)] bg-white px-6 py-12">

            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">

                {/* LEFT */}
                <div>

                    <div className="mb-3 flex items-center gap-2">

                        <div className="rounded-lg bg-[var(--color-primary-light)] p-2">
                            <Wheat className="h-5 w-5 text-[var(--color-primary)]" />
                        </div>

                        <span className="font-['Sora'] text-xl font-bold text-[var(--color-text)]">
                            KisanKart
                        </span>
                    </div>

                    <p className="max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">
                        Connecting farmers directly with vendors for transparent pricing,
                        better profits, and fair trade.
                    </p>
                </div>

                {/* RIGHT */}
                <div className="flex gap-6 text-sm text-[var(--color-text-muted)]">

                    <Link to="/" className="hover:text-[var(--color-text)]">
                        Home
                    </Link>

                    <Link to="/listings" className="hover:text-[var(--color-text)]">
                        Listings
                    </Link>

                    <Link to="/login" className="hover:text-[var(--color-text)]">
                        Login
                    </Link>

                </div>
            </div>

            <div className="mx-auto mt-10 max-w-7xl border-t border-[var(--color-border)] pt-6 text-center text-sm text-[var(--color-text-muted)]">
                © 2026 KisanKart. Built by Durga Prasad K.
            </div>
        </footer>
    );
}