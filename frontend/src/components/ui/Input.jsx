export default function Input({
    label,
    error,
    className = "",
    ...props
}) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-[var(--color-text)]">
                    {label}
                </label>
            )}

            <input
                className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition-all
        focus:border-[var(--color-primary)]
        focus:ring-2 focus:ring-[var(--color-primary-light)]
        ${error
                        ? "border-red-400 bg-red-50"
                        : "border-[var(--color-border)]"
                    }
        ${className}`}
                {...props}
            />

            {error && (
                <span className="text-xs text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
}