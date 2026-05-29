export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-[var(--color-border)] shadow-sm p-5 ${className}`}>
      {children}
    </div>
  )
}