import { Wheat } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-[var(--color-primary-light)] p-2">
            <Wheat className="h-5 w-5 text-[var(--color-primary)]" />
          </div>

          <span className="font-['Sora'] text-xl font-bold text-[var(--color-text)]">
            KisanKart
          </span>
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          <Link
            to="/listings"
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            Browse Listings
          </Link>

          <Link to="/login">
            <Button variant="outline">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button>
              Register
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}