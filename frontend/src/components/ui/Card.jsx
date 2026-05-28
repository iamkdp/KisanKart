export default function Card({ children, className = "" }) {
    return (
        <div
            className={`rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm ${className}`}
        >
            {children}
        </div>
    );
}