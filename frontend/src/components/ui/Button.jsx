export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]",

    secondary:
      "bg-[var(--color-primary-light)] text-[var(--color-primary)] hover:bg-green-100",

    outline:
      "border border-[var(--color-border)] bg-white hover:bg-gray-50",

    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      disabled={loading}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
      )}
      {children}
    </button>
  );
}