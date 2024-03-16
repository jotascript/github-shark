import { cn } from '@/lib/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PageGenericProps<T = any> = {
  children: React.ReactNode
  className?: string
} & T

export function Page({ children, className }: PageGenericProps) {
  return <section className={cn('', className)}>{children}</section>
}

export function PageMain({ children, className }: PageGenericProps) {
  return <main className={cn('p-6', className)}>{children}</main>
}
