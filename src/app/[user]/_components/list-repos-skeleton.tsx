import { Skeleton } from '@/components/ui/skeleton'

export function ListReposSkeleton() {
  return (
    <div className="flex items-center justify-between gap-2 border-t py-5">
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-[80px] md:w-[150px]" />
        <Skeleton className="h-4 w-[24px]" />
      </div>
      <Skeleton className="h-4 w-[50px]" />
    </div>
  )
}
