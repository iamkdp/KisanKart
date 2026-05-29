export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-semibold text-lg text-[var(--color-text)] mb-1">{title}</h3>
      <p className="text-[var(--color-text-muted)] text-sm mb-6 max-w-xs">{description}</p>
      {action}
    </div>
  )
}