export default function EmptyState({
    icon,
    title,
    description,
    action,
}) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-5xl">
                {icon}
            </div>

            <h3 className="mb-2 text-xl font-semibold text-[var(--color-text)]">
                {title}
            </h3>

            <p className="mb-6 max-w-sm text-sm text-[var(--color-text-muted)]">
                {description}
            </p>

            {action}
        </div>
    );
}