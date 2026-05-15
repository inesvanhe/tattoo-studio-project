import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonBaseProps = {
  children: ReactNode
  variant?: ButtonVariant
}

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>
type ButtonLinkProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement>

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-[var(--color-neon-honey)] bg-[var(--color-neon-honey)] text-[var(--color-paper)] shadow-[0_0_0_rgba(255,207,74,0)] hover:-translate-y-0.5 hover:bg-[var(--color-honey-soft)] hover:shadow-[0_12px_32px_rgba(255,207,74,0.18)]',
  secondary:
    'border-[var(--color-line-strong)] bg-transparent text-[var(--color-paper)] hover:-translate-y-0.5 hover:border-[var(--color-neon-honey)] hover:bg-[rgba(255,207,74,0.08)] hover:text-[var(--color-neon-honey)]',
}

function buttonClasses(variant: ButtonVariant = 'primary') {
  return [
    'inline-flex min-h-11 items-center justify-center rounded-[0.375rem] border px-5 py-3 text-sm font-black uppercase tracking-[0.12em] transition duration-200 ease-out',
    variantClasses[variant],
  ].join(' ')
}

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button className={[buttonClasses(variant), className].filter(Boolean).join(' ')} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={[buttonClasses(variant), className].filter(Boolean).join(' ')} {...props}>
      {children}
    </a>
  )
}
