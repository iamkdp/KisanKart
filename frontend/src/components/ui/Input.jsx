export default function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[var(--color-text)]">{label}</label>}
      <input
        className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all
          focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent
          ${error ? 'border-red-400 bg-red-50' : 'border-[var(--color-border)] bg-white'}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}