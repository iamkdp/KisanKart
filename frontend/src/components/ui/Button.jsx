export default function Button({ children, variant = 'primary', loading, onClick, className = '' }) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 px-5 py-2.5 text-sm'
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-95',
    secondary: 'bg-[var(--color-primary-light)] text-[var(--color-primary)] hover:bg-green-100',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100',
    ghost: 'text-[var(--color-text-muted)] hover:bg-gray-100'
  }

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`} disabled={loading}>
      {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" /> : null}
      {children}
    </button>
  )
}