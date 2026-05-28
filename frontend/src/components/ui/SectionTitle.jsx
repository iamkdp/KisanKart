export default function SectionTitle({
    title,
    subtitle,
}) {
    return (
        <div className="mb-12 text-center">
            <h2 className="mb-3 font-['Sora'] text-3xl font-bold text-[var(--color-text)]">
                {title}
            </h2>

            <p className="mx-auto max-w-2xl text-[var(--color-text-muted)]">
                {subtitle}
            </p>
        </div>
    );
}